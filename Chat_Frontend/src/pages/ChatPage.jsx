import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@chakra-ui/react';

function ChatPage() {

  // const [chats, setChats] = useState([]);

  // const fetchChats = async () => {
  //   try {
  //     const { data } = await axios.get('/api/chat');
  //     setChats(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   }
  // }
  // useEffect(() => {
  //   fetchChats();
  // }, [])

  return (
    <Container maxW="xl" centerContent mt={1} backgroundColor="white" borderRadius="lg" boxShadow="lg" p={4}>
      <h1 fontSize="2xl" fontWeight="bold">
        Chat Page
      </h1>
    </Container>
  )
}

export default ChatPage
