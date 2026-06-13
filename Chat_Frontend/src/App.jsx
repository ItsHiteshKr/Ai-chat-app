import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';
import { Toaster } from './components/ui/toaster';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import ChatPage from './pages/ChatPage';


function App() {

  return (
    <div className="App">
      <Toaster />
      {/* <Box position="absolute" top="4" right="4" rounded="full" p={3} zIndex={1}>
        <ColorModeButton />
      </Box> */}
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