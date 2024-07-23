import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

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
      cb(
        null,
        `files/${req.user.id}-${Date.now().toString()}-${file.originalname}`
      );
    },
  }),
});

export { s3Client, uploadAvatar, uploadFile, getSignedUrl, PutObjectCommand };
