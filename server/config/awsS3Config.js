import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import urlencode from "urlencode";
import db from "./dbConfig.js";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadAvatar = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `avatars/${req.user.id}-${Date.now().toString()}-${file.originalname}`
      );
    },
  }),
});

const uploadFile = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fileName: file.fieldname });
    },
    key: function (req, file, cb) {
      const encodedFileName = urlencode(file.originalname);
      cb(
        null,
        `files/${req.user.id}-${Date.now().toString()}-${encodedFileName}`
      );
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: function (req, file, cb) {
      // Inline disposition to open in the browser if possible
      cb(null, "inline");
    },
  }),
});

const deleteUserFile = async (req, res) => {
  const fileId = req.body.fileId;

  try {
    // Get file url from DB
    const [file] = await db.query(
      "SELECT file_url FROM user_files WHERE user_id = ? AND id = ?",
      [req.user.id, fileId]
    );

    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    // Extract S3 key from file URL
    const fileKey = file[0].file_url.split("/files/")[1];

    // Delete file from S3
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `files/${fileKey}`,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3Client.send(deleteCommand);

    // Delete file record from DB
    await db.query("DELETE FROM user_files WHERE user_id = ? AND id = ?", [
      req.user.id,
      fileId,
    ]);

    res.status(200).json({ msg: "File deleted successfully" });
  } catch (err) {
    console.error("An error occurred while deleting user file:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export {
  s3Client,
  uploadAvatar,
  uploadFile,
  deleteUserFile,
  getSignedUrl,
  PutObjectCommand,
};
