import { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider';
import SingleChat from './UserAvatar/SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

  const { user, selectedChat } = ChatState();

  const [messages, setMessages] = useState([]);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "65%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
