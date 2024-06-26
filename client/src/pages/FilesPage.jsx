import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { HStack, Text, VStack, Flex, Input } from "@chakra-ui/react";
import HomeButton from "../components/HomeComponents/HomeButton";

const FilesPage = () => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log("File selected:", file);
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
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
          </Text>
          <Input
            type="file"
            id="fileInput"
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
              onClick={handleUploadButtonClick}
            />
          </Flex>
          <HomeButton size="100%" title="Upload file" />
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
            <HStack w="100%" justify="space-between">
              <Text fontWeight={600}>
                1. CV-Mark_Veskov.pdf{" "}
                <Text as="span" opacity="0.6" fontWeight={400}>
                  (2 MB)
                </Text>
                <Text opacity="0.6" fontWeight={400}>
                  06.07.2024, 14:35
                </Text>
              </Text>
              <HomeButton title="Remove" />
            </HStack>
          </Flex>
        </VStack>
      </HStack>
    </>
  );
};

export default FilesPage;
