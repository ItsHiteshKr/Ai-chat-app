import { useState, useRef } from 'react'
import {
    Button, Dialog, Portal, CloseButton,
    Input, Box, Text
} from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider';
import { toaster } from "@/components/ui/toaster"
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem"
import UserBadgeItem from './UserBadgeItem';

const url = import.meta.env.VITE_API_URL;

const GroupChatModal = ({ children }) => {

    const { user, chats, setChats } = ChatState();

    const [open, setOpen] = useState(false);

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toaster.create({
                title: "User already added",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    }


    const handleDelete = (userToRemove) => {
        setSelectedUsers(
            selectedUsers.filter((u) => u._id !== userToRemove._id)
        );
    }

    const handleSubmit = async () => {

        if (!groupChatName || !selectedUsers) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            return;
        }

        try {

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post(`${url}/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(u => u._id))
            }, config);

            // console.log(data);
            setChats([data, ...chats]);
            setOpen(false);
            toaster.create({
                title: "New Group chat created successfully",
                type: "success",
                duration: 3000,
                position: "top",
                closable: true,
            });

        } catch (error) {
            toaster.create({
                title: "Error creating group chat",
                type: "error",
                duration: 3000,
                position: "top",
                closable: true,
            });
        }




    }

    return (
        <div>
            <span onClick={() => setOpen(true)}>
                {children}
            </span>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
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
                                >Create Group Chat</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>

                            <Dialog.Body display="flex" flexDir="column">
                                <Input placeholder="Chat Name"
                                    mb={3} pl={2}
                                    borderWidth="2px"
                                    borderColor="blue.200"
                                    _hover={{ borderColor: "blue.500" }}
                                    _focus={{
                                        borderColor: "blue.500",
                                        outline: "none",
                                    }}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => setGroupChatName(e.target.value)}

                                />
                                <Input placeholder="Add Users eg: John, Piyush, Jane"
                                    mb={1} pl={2}
                                    borderWidth="2px"
                                    borderColor="blue.200"
                                    _hover={{ borderColor: "blue.500" }}
                                    _focus={{
                                        borderColor: "blue.500",
                                        outline: "none",
                                    }}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                {/* Selected users */}
                                <Box w="100%" display="flex" flexWrap="wrap">
                                    {
                                        selectedUsers.map(u => (
                                            <UserBadgeItem
                                                key={u._id}
                                                user={u}
                                                handleFunction={() => handleDelete(u)}
                                            />
                                        ))
                                    }
                                </Box>



                                {/* render search user results */}
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (searchResult?.slice(0, 4).map(user => {
                                    return <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />

                                }))

                                }
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button mr={1} px={4}
                                    rounded="md"
                                    bg="blue.500"
                                    color="white"
                                    _hover={{ bg: "blue.600" }}
                                    _active={{ bg: "blue.700" }}
                                    onClick={handleSubmit}
                                >
                                    Create Chat
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </div>
    )
}

export default GroupChatModal
