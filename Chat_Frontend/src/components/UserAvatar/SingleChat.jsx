import React from 'react'
import { useState, useEffect } from 'react'
import {
    Box, Button, Field, Input,
    Text, Spinner
} from '@chakra-ui/react'
import { FaArrowLeft } from "react-icons/fa";
import { ChatState } from '../../context/ChatProvider';
import { getSender, getSenderFull } from '@/config/ChatLogic';
import ProfileModal from '../utils/ProfileModal';
import UpdateGroupChatModal from '../utils/UpdateGroupChatModal';
import axios from "axios";
import { toaster } from "@/components/ui/toaster";

const url = import.meta.env.VITE_API_BACKEND_URL;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {

            try {
                setLoading(true);

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };


                setNewMessage("");

                const { data } = await axios.post(`${url}/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
                console.log(data);


                setMessage([...message, data]);

            } catch (error) {
                toaster.create({
                    title: "Failed to send the message",
                    type: "error",
                    duration: 3000,
                    position: "top",
                    closable: true,
                });
            } finally {
                setLoading(false);
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // typing indicator logic can be implemented here
    }


    return (
        <>
            {
                selectedChat ? (
                    <>
                        <Box
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={2}
                            px={2}
                            w="100%"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottomWidth="2px"
                        >

                            <Button display={{ base: "flex", md: "none" }} onClick={() => setSelectedChat("")}>
                                <FaArrowLeft />
                            </Button>



                            {!selectedChat.isGroupChat ? (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                </>
                            ) : (
                                <> {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupChatModal
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>

                            )}

                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-end"
                            p={3}
                            bg="#E8E8E8"
                            w="100%"
                            h="100%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            {loading ? (
                                <Spinner
                                    size="xl"
                                    w={20}
                                    h={20}
                                    alignSelf="center"
                                    margin="auto"
                                    animationDuration="0.9s"
                                    color="teal.500"
                                />
                            ) : (
                                <div>
                                    {/* Messages will be displayed here */}
                                </div>
                            )}


                            <Field.Root mt={3} required onKeyDown={sendMessage}>
                                <Input
                                    variant="filled"
                                    bg="#E0E0E0"
                                    pl={2}
                                    _hover={{ bg: "#c4e7e4" }}
                                    _focus={{ border: "1px solid #3182ce", outline: "none" }}
                                    placeholder="Enter a message "
                                    value={newMessage}
                                    onChange={typingHandler}
                                />
                            </Field.Root>
                        </Box>
                    </>
                ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                            Click on a user to start chatting
                        </Text>
                    </Box>
                )
            }
        </>
    )
}

export default SingleChat