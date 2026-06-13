import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';

import SideDrawer from '@/components/utils/SideDrawer';
import MyChats from '@/components/MyChats';
import ChatBox from '@/components/ChatBox';



function ChatPage() {

  const { user } = ChatState();

  // const [chats, setChats] = useState([]);

  return (
    <div style={{ width: "100%", maxWidth: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"

      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage
