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
import "../../components/style.css";
import ScrollableChat from '../utils/ScrollableChat';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import LottieImport from "react-lottie";
import typingAnimation from '../../animation/Typing Indicator.lottie';

import { io } from "socket.io-client";

const url = import.meta.env.VITE_API_BACKEND_URL;
var socket, selectedChatCompare;



const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    // for typing indicator
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`${url}/api/message/${selectedChat._id}`, config);

            setMessage(data);
            // console.log(data);

            socket.emit("join chat", selectedChat._id);


        } catch (error) {
            toaster.create({
                title: "Failed to fetch messages",
                type: "error",
                duration: 3000,
                position: "top",
                closable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        socket = io(url);
        socket.emit("setup", user);
        socket.on("connected", () => {
            setSocketConnected(true);
        });
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        return () => {
            socket.disconnect();
        }

    }, [user]);



    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    console.log("notification", notification);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }

            } else {
                setMessage((prevMessages) => [...prevMessages, newMessageRecieved]);
            }
        }
        );
        return () => {
            socket.off("message recieved");
        }
    });



    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {

            try {

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
                // console.log(data);

                socket.emit("new message", data);
                setMessage([...message, data]);

            } catch (error) {
                toaster.create({
                    title: "Failed to send the message",
                    type: "error",
                    duration: 3000,
                    position: "top",
                    closable: true,
                });
            }
        }
    }


    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // typing indicator logic can be implemented here
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;

        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }


        }, timerLength);
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
                                        fetchmessages={fetchMessages}
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
                                <div className="messages">

                                    <ScrollableChat messages={message} />
                                </div>
                            )}


                            <Field.Root mt={3} required onKeyDown={sendMessage}>
                                {
                                    isTyping ? (
                                        <Box w="70px" h="28px" mb={1} overflow="hidden" display="flex" alignItems="center">
                                            <DotLottieReact
                                                src={typingAnimation}
                                                autoplay
                                                loop
                                                style={{ width: '70px', height: '28px' }}
                                            />
                                        </Box>
                                    ) : null
                                }
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