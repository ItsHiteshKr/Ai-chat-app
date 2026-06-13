import { useState, useEffect } from 'react'
import { ChatState } from '@/context/ChatProvider';
import { toaster } from "@/components/ui/toaster"
import axios from "axios";
import {
  Box, Button,
  Text
} from '@chakra-ui/react';
import { MdAdd } from "react-icons/md";
import { getSender } from '@/config/ChatLogic';
import ChatLoading from './utils/ChatLoading';
import { Stack } from '@chakra-ui/react';

const url = import.meta.env.VITE_API_URL;


function MyChats() {

  const [loggedUser, setLoggedUser] = useState();


  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${url}/api/chat`, config);

      setChats(data);

    } catch (error) {
      toaster.error("Failed to load the chats");
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [])

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* Render the list of chats */}
      <Box
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        fontFamily="Work sans"
        fontSize={{ base: "28px", md: "30px" }}
        pb={3} px={3}
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
        borderBottomWidth="1px"
      >
        My Chats
        <Button
          display="flex"
          color="black"
          p={{ base: "0px 5px", md: "0px 10px" }}
          bg="gray.200"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<MdAdd />}
          onClick={() => {
            // Handle the click event for creating a new group chat
            console.log("Create New Group Chat clicked");
          }}
        >
          New Group Chat <MdAdd />
        </Button>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        borderWidth="1px"
      >
        {chats ? (
          <Stack
            overflowY="scroll"
          >
            {
              chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                  </Text>
                </Box>
              ))
            }
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats
