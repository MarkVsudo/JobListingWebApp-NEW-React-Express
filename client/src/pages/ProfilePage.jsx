import { Helmet } from "react-helmet";
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import HomeButton from "../components/HomeComponents/HomeButton";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>JobConqueror - Profile</title>
      </Helmet>
      <HStack spacing="5rem" mx="10rem" align="flex-start" w="100%">
        <VStack align="flex-start" w="33.33%">
          <Text fontSize="1.25rem" fontWeight={700}>
            Credentials
          </Text>
          <Text>
            The following credentials will be used for the application when
            applying for a position at a company.
          </Text>
          <FormControl w="sm">
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Mark Veskov"
              type="text"
              bg="white"
              border="1px solid var(--cyan)"
            />
          </FormControl>
          <FormControl w="sm">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email@example.com"
              type="email"
              bg="white"
              border="1px solid var(--cyan)"
            />
          </FormControl>
          <HomeButton title="Save changes" />
        </VStack>
        <VStack alignItems="center" w="33.33%">
          <Text fontSize="1.25rem" fontWeight={700} pb="0.5rem">
            Profile picture
          </Text>
          <Box position="relative" mb="1rem">
            <Avatar size="xl" src={profileImage} />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              display="none"
              id="profile-image-upload"
            />
            <IconButton
              aria-label="Upload profile picture"
              icon={<FaCamera />}
              as="label"
              htmlFor="profile-image-upload"
              position="absolute"
              bottom="0"
              right="0"
              borderRadius="full"
              bg="white"
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
            />
          </Box>
          <HomeButton title="Update image" />
        </VStack>
        <VStack align="flex-start" w="33.33%">
          <Text fontSize="1.25rem" fontWeight={700}>
            Change password
          </Text>
          <Text>An email will be sent to you for resetting your password.</Text>
          <FormControl w="sm">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email@example.com"
              type="email"
              bg="white"
              border="1px solid var(--cyan)"
            />
          </FormControl>
          <HomeButton title="Send" />
        </VStack>
      </HStack>
    </>
  );
};

export default ProfilePage;
