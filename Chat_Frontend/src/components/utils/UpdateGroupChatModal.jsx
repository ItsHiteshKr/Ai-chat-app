import React from 'react'
import { useState, useEffect } from 'react'
import {
    Box, Button, Dialog, Portal, CloseButton,
    Input, IconButton,
    Spinner
} from '@chakra-ui/react'
import { toaster } from "@/components/ui/toaster"
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem"
import UserBadgeItem from './UserBadgeItem';
import { IoEyeOutline } from "react-icons/io5";
import { ChatState } from '../../context/ChatProvider';

const url = import.meta.env.VITE_API_URL;


const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [open, setOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const handleAddUser = async (userToAdd) => {

        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toaster.create({
                title: "User already added",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toaster.create({
                title: "Only admins can add someone!",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.put(`${url}/api/chat/groupadd`, {
                chatId: selectedChat._id,
                userId: userToAdd._id,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);

        } catch (error) {
            toaster.create({
                title: "Error adding user to group",
                type: "error",
                duration: 3000,
                position: "top",
                closable: true,
            });
            setLoading(false);
        }

    }


    const handleRemoveUser = async (userToRemove) => {

        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            toaster.create({
                title: "Only admins can remove someone!",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            return;
        }


        try {
            setLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.put(`${url}/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: userToRemove._id,
            }, config);


            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);

            setFetchAgain(!fetchAgain);
            setLoading(false);


        } catch (error) {
            toaster.create({
                title: "Error removing user from group",
                type: "error",
                duration: 3000,
                position: "top",
                closable: true,
            })
            setLoading(false);
        }


    }

    const handleRename = async () => {
        if (!groupChatName) {
            return;
        }

        try {

            setRenameLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(`${url}/api/chat/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName,

            }, config);


            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);

            toaster.create({
                title: "Group chat renamed",
                type: "success",
                duration: 3000,
                isClosable: true,
            })

        } catch (error) {
            toaster.create({
                title: "Failed to rename group chat",
                type: "error",
                duration: 3000,
                isClosable: true,
            });

            setRenameLoading(false);
        }
        setGroupChatName("");
    }

    const handleSearch = async (query) => {

        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`${url}/api/user?search=${query}`, config);
            console.log(data);
            setSearchResult(data);
            setLoading(false);

        } catch (error) {
            console.error("Error searching users:", error);
        }
    }


    return (
        <>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Dialog.Trigger asChild>
                    <IconButton aria-label="Update group" variant="ghost" color="blue">
                        <IoEyeOutline />
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner display="flex" alignItems="center" justifyContent="center">
                        <Dialog.Content bg="white" gap={5} px={5} py={4} borderRadius="lg">

                            <Dialog.Header display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={2}
                            >
                                <Dialog.Title fontSize="3xl"
                                    fontFamily="Work sans"
                                >{selectedChat.chatName}</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>

                            <Dialog.Body display="flex" flexDir="column">
                                {/* Selected users - selectedUsers state abhi define nahi hua */}
                                <Box w="100%" display="flex" flexWrap="wrap">
                                    {
                                        selectedChat.users.map(u => (
                                            <UserBadgeItem
                                                key={u._id}
                                                user={u}
                                                admin={selectedChat.groupAdmin}
                                                handleFunction={() => handleRemoveUser(u)}
                                            />
                                        ))
                                    }
                                </Box>
                                {/* rename group chat name */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    w="100%"
                                    gap={4}
                                    mb={5} mt={2}
                                >
                                    <Input
                                        placeholder="Chat Name"
                                        pl={3}
                                        value={groupChatName}
                                        onChange={(e) => setGroupChatName(e.target.value)}

                                    >

                                    </Input>

                                    <Button mr={1} px={4}
                                        rounded="md"
                                        bg="blue.500"
                                        color="white"
                                        _hover={{ bg: "blue.600" }}
                                        _active={{ bg: "blue.700" }}
                                        onClick={handleRename}
                                        loading={renameLoading}

                                    >
                                        Update
                                    </Button>

                                </Box>


                                <Input
                                    placeholder="Add Users to group"
                                    mb={3} pl={3}
                                    onChange={(e) => handleSearch(e.target.value)}
                                >
                                </Input>

                                {/* render search user results */}
                                {loading ? (
                                    <Spinner color="teal.500" size="lg" />
                                ) : (searchResult?.map(user => {
                                    return <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleAddUser(user)}
                                    />

                                }))
                                }
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button mr={1} px={4}
                                    rounded="md"
                                    bg="red.500"
                                    color="white"
                                    _hover={{ bg: "red.600" }}
                                    _active={{ bg: "red.700" }}
                                    onClick={() => handleRemoveUser(user)}
                                >
                                    Leave Group
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default UpdateGroupChatModal