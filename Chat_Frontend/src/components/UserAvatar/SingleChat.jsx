import React from 'react'
import { useState, useEffect } from 'react'
import {
    Box, Button,
    Text
} from '@chakra-ui/react'
import { FaArrowLeft } from "react-icons/fa";
import { ChatState } from '../../context/ChatProvider';
import { getSender, getSenderFull } from '@/config/ChatLogic';
import ProfileModal from '../utils/ProfileModal';
import UpdateGroupChatModal from '../utils/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    // console.log("selected chat in single chat", selectedChat);


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
                            <Text>
                                my message here
                            </Text>
                            {/* message here */}
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