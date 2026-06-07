import { Routes, Route } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import ChatPage from './pages/ChatPage';


function App() {

  return (
    <div className="App">
      <Box position="absolute" top="4" right="4" rounded="full" >
        <ColorModeButton />
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App;