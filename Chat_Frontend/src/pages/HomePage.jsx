import React from 'react'
import { useEffect } from 'react'
import Login from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';
import {
  Container,
  Box, Tabs, Link,
  Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const version = import.meta.env.VITE_VERSION;

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }

  }, [navigate])




  return (
    <Container maxW="xl" centerContent >
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        w="100%"
        bg={"white"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"

      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          py={3}
        >
          Talk-A-tive
        </Text>
      </Box>

      <Box
        w="100%"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        p={4}
      >
        <Tabs.Root defaultValue="login" variant="enclosed" colorScheme="dark">

          <Tabs.List w="100%" mb="1em" >
            <Tabs.Trigger value="login" flex={1} asChild>
              <Link unstyled href="#login" textAlign="center" justifyContent="center" w="50%">
                Login
              </Link>
            </Tabs.Trigger>
            <Tabs.Trigger value="SignUp" flex={1} asChild>
              <Link unstyled href="#SignUp" textAlign="center" justifyContent="center" w="50%">
                Sign Up
              </Link>
            </Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="login">
            <Text textAlign="center" fontSize="lg">
              Welcome back! Please login to your account.
            </Text>
            <Login />
          </Tabs.Content>

          <Tabs.Content value="SignUp">
            <Text textAlign="center" fontSize="lg" >
              New here? Please sign up to create an account.
            </Text>
            <SignUp />
          </Tabs.Content>

        </Tabs.Root>
      </Box>

      <h3 textAlign="center" fontSize="sm" mt={4} color="gray.500">
        Version: {version}
      </h3>

    </Container>
  )
}

export default HomePage
