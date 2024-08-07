import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaCamera } from "react-icons/fa";
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContext";
import HomeButton from "../components/HomeComponents/HomeButton";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const response = await axios.get(`/api/user-avatar`);
      setAvatar(response.data.avatar);
    };

    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      fetchUserAvatar();
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateUserAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await axios.post("/api/user-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.error("An error occurred while updating user avatar:", err);
    }
  };

  const handleCredentialsChange = async (e) => {
    e.preventDefault();

    try {
      const userId = user.user_id;
      await axios.post("/api/update-credentials", {
        fullName,
        email,
        userId,
      });
      setErrors({});
    } catch (err) {
      console.error("Error:", err);
      const validationErrors = {};
      if (err.response && err.response.data.errors) {
        err.response.data.errors.forEach((error) => {
          validationErrors[error.path] = error.msg;
        });
      }
      if (err.response && err.response.data.msg) {
        validationErrors.msg = err.response.data.msg;
      }
      setErrors(validationErrors);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    let resetEmail = email;
    try {
      await axios.post("/api/reset-password-email", {
        resetEmail,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!user) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        minHeight="50vh"
        w="100%"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <Helmet>
        <title>JobConqueror - Profile</title>
      </Helmet>
      <Flex
        mx="10rem"
        w="100%"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        flexWrap={{ md: "wrap", lg: "nowrap" }}
        gap={{ base: "1.5rem", lg: "0" }}
      >
        <VStack
          align="flex-start"
          w={{ base: "100%", md: "45%", lg: "max-content" }}
        >
          <Text fontSize="1.25rem" fontWeight={700}>
            Credentials
          </Text>
          <Text>
            The following credentials will be used for the application <br />
            when applying for a position at a company.
          </Text>
          <Flex
            direction="column"
            gap="0.5rem"
            as="form"
            onSubmit={handleCredentialsChange}
          >
            <FormControl
              w={{ base: "100%", lg: "sm" }}
              id="fullName"
              isInvalid={errors.fullName}
            >
              <FormLabel>Full Name</FormLabel>
              <Input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                name="fullName"
                type="text"
                bg="white"
                border="1px solid var(--cyan)"
              />
              <FormErrorMessage>{errors.fullName}</FormErrorMessage>
            </FormControl>
            <FormControl
              w={{ base: "100%", lg: "sm" }}
              id="email"
              isInvalid={errors.email}
            >
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                bg="white"
                border="1px solid var(--cyan)"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            {errors.msg && (
              <Text color="red.500" fontSize="0.875rem">
                {errors.msg}
              </Text>
            )}
            <HomeButton
              title="Save changes"
              onClick={handleCredentialsChange}
            />
          </Flex>
        </VStack>

        <VStack
          align="flex-start"
          w={{ base: "100%", md: "45%", lg: "max-content" }}
        >
          <Text fontSize="1.25rem" fontWeight={700}>
            Change password
          </Text>
          <Text>An email will be sent to you for resetting your password.</Text>
          <Flex
            direction="column"
            gap="0.5rem"
            as="form"
            onSubmit={handleResetPassword}
          >
            <FormControl w={{ base: "100%", lg: "sm" }} id="resetEmail">
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                name="resetEmail"
                disabled
                type="email"
                bg="white"
                border="1px solid var(--cyan)"
              />
            </FormControl>
            <HomeButton title="Send" onClick={handleResetPassword} />
          </Flex>
        </VStack>

        <VStack
          alignItems="center"
          w={{ base: "100%", md: "100%", lg: "max-content" }}
        >
          <Text fontSize="1.25rem" fontWeight={700} pb="0.5rem">
            Profile picture
          </Text>
          <Box position="relative" mb="1rem">
            <Avatar
              size="xl"
              src={
                avatar
                  ? avatar
                  : "https://cdn-icons-png.flaticon.com/512/9131/9131590.png"
              }
            />
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
          <HomeButton title="Update image" onClick={updateUserAvatar} />
        </VStack>
      </Flex>
    </>
  );
};

export default ProfilePage;
