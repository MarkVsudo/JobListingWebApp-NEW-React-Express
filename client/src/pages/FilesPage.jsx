import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import HomeButton from "../components/HomeComponents/HomeButton";

const FilesPage = () => {
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get(`/api/user-file`);

        if (Array.isArray(response.data.files)) {
          setFiles(response.data.files);
        } else {
          setFiles([]);
        }
      } catch (err) {
        console.error("Failed to fetch user files:", err);
        setFiles([]);
      }
    };

    if (user) {
      fetchUserFiles();
    }
  }, [user, uploadStatus]);

  const fileNameTranslation = (word) => {
    const alphabet = {
      а: "a",
      А: "A",
      б: "b",
      Б: "B",
      в: "v",
      В: "V",
      г: "g",
      Г: "G",
      д: "d",
      Д: "D",
      е: "e",
      Е: "E",
      ж: "j",
      Ж: "J",
      з: "z",
      З: "Z",
      и: "i",
      И: "I",
      й: "y",
      Й: "Y",
      к: "k",
      К: "K",
      л: "l",
      Л: "L",
      м: "m",
      М: "M",
      н: "n",
      Н: "N",
      о: "o",
      О: "O",
      п: "p",
      П: "P",
      р: "r",
      Р: "R",
      с: "s",
      С: "S",
      т: "t",
      Т: "T",
      у: "u",
      У: "U",
      ф: "f",
      Ф: "F",
      х: "h",
      Х: "H",
      ц: "c",
      Ц: "C",
      ч: "ch",
      Ч: "Ch",
      ш: "sh",
      Ш: "Sh",
      щ: "sht",
      Щ: "Sht",
      ъ: "y",
      Ъ: "Y",
      ь: "y",
      Ь: "Y",
      ю: "iu",
      Ю: "Iu",
      я: "q",
      Я: "Q",
    };

    let translatedWord = "";

    for (let i = 0; i < word.length; i++) {
      let currentChar = word[i];
      translatedWord +=
        alphabet[currentChar] !== undefined
          ? alphabet[currentChar]
          : currentChar;
    }

    return translatedWord;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const translatedName = fileNameTranslation(file.name);
      const renamedFile = new File([file], translatedName, { type: file.type });
      setFileName(translatedName);
      setFiles([renamedFile]);
    }
  };

  const handleUploadButtonClick = async () => {
    if (files.length === 0) {
      setUploadStatus("error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      await axios.post("/api/user-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("success");
      setFileName("");
      setFiles([]);
    } catch (err) {
      console.error("An error occurred while uploading user file:", err);
      setUploadStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>JobConqueror - Files</title>
      </Helmet>
      <HStack mx="10rem" align="flex-start" w="100%" spacing="10rem">
        <VStack align="flex-start" w="50%">
          <Text fontSize="1.25rem" fontWeight={700}>
            Upload a file
          </Text>
          <Text>
            You can upload all the files you need for your job application.
            <br /> Please upload one file at a time.{" "}
            <strong>Only PDF and Word files are accepted.</strong>
          </Text>
          <Input
            type="file"
            id="fileInput"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Flex w="100%" align="center" gap="1.5rem">
            <Input
              value={fileName}
              isReadOnly
              bg="white"
              border="1px solid var(--cyan)"
            />
            <HomeButton
              title="Choose a file"
              onClick={() => document.getElementById("fileInput").click()}
            />
          </Flex>
          <HomeButton
            size="100%"
            title="Upload file"
            onClick={handleUploadButtonClick}
          />
        </VStack>
        <VStack align="flex-start" w="50%">
          <Text fontSize="1.25rem" fontWeight={700}>
            Uploaded files
          </Text>
          <Flex
            bg="white"
            borderRadius="0.5rem"
            p="1rem"
            w="100%"
            direction="column"
            gap="1rem"
          >
            {Array.isArray(files) && files.length > 0 ? (
              files.map((file, index) => (
                <HStack w="100%" justify="space-between" key={index}>
                  <Text fontWeight={600}>
                    {file.file_name || file.name}{" "}
                    <Text as="span" opacity="0.6" fontWeight={400}>
                      ({file.file_size || (file.size / 1000000).toFixed(2)} MB)
                    </Text>
                    <Text opacity="0.6" fontWeight={400}>
                      {new Date(
                        file.uploaded_at || file.lastModified
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Text>
                  </Text>
                  <HomeButton
                    title="Remove"
                    onClick={() => handleRemoveFile(file.id)}
                  />
                </HStack>
              ))
            ) : (
              <Text>No files uploaded.</Text>
            )}
          </Flex>
        </VStack>
      </HStack>
    </>
  );
};

export default FilesPage;
