import { useState, useEffect } from 'react';
import axios from 'axios';


function ChatPage() {

  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chat');
      setChats(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  }
  useEffect(() => {
    fetchChats();
  }, [])

  return (
    <div>chatpage</div>
  )
}

export default ChatPage
