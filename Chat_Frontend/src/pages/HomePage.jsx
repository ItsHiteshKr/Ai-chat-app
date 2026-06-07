import React from 'react'
import Login from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';
import {
  Container,
  Box, Tabs, Link,
  Text
} from "@chakra-ui/react"

function HomePage() {
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
            <Text textAlign="center" fontSize="lg" mt={4}>
              Welcome back! Please login to your account.
            </Text>
            <Login />
          </Tabs.Content>

          <Tabs.Content value="SignUp">
            {/* <Text textAlign="center" fontSize="lg" mt={4}>
              New here? Please sign up to create an account.
            </Text> */}
            <SignUp />
          </Tabs.Content>

        </Tabs.Root>
      </Box>
    </Container>
  )
}

export default HomePage
