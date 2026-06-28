import { useState } from 'react'
import {
  Box, Avatar, Button,
  Text, Menu, Portal, Drawer, CloseButton,
  Input, Spinner
} from '@chakra-ui/react';
import { Tooltip } from "@/components/ui/tooltip";
import { FaBell, FaSearch } from 'react-icons/fa';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogic'

const url = import.meta.env.VITE_API_BACKEND_URL;
const version = import.meta.env.VITE_VERSION;

function SideDrawer() {

  const { user, setSelectedChat, chats, setChats,
    notification, setNotification } = ChatState();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);


  function LogoutHandler() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }

  const handleSearch = async () => {

    if (!search) {
      toaster.create({
        title: "Please enter something in search",
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
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${url}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchresult(data);

    } catch (error) {
      toaster.create({
        title: "Failed to load the search results",
        type: "warning",
        duration: 3000,
        position: "top",
        closable: true,
      });
      setLoading(false);
    }
  };


  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`${url}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      // Do something with the chat data, e.g., navigate to the chat page
      console.log("Chat accessed:", data);
      setIsOpen(false); // Close the drawer after accessing the chat

    } catch (error) {
      toaster.create({
        title: "Error fetching the chat",
        type: "warning",
        duration: 3000,
        position: "top",
        closable: true,
      });
      setLoadingChat(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      maxW="100%"
      p="5px 10px 5px 15px"
      borderWidth="2px"
    >
      <Box>
        <Tooltip content="Search users to chat"
          contentProps={{ px: 1, py: 1 }}
          positioning={{ placement: "bottom" }}
        >
          <Button variant="ghost" bg="gray.100" rounded="full" _hover={{ bg: "gray.200" }}
            onClick={() => setIsOpen(true)} px={2} py={1} display="flex" alignItems="center">

            <FaSearch size={15} />
            <Text display={{ base: "none", md: "flex" }} px="0.5" fontSize="md">
              Search User
            </Text>
          </Button>
        </Tooltip>
      </Box>



      <Text fontSize="4xl" fontFamily="Work sans">
        Talk-A-tive
        <span style={{ color: "blue", fontSize: "small" }}>{version}</span>
      </Text>

      <Box gap={2} display="flex" alignItems="center">

        <Menu.Root content="Notifications">
          <Menu.Trigger asChild>
            <Button variant="ghost" bg="gray.100" rounded="full" _hover={{ bg: "gray.200" }} position="relative">
              <FaBell size={18} />
              {notification.length > 0 && (
                <Box
                  as="span"
                  position="absolute"
                  top="0"
                  right="0"
                  transform="translate(35%, -35%)"
                  minW="18px"
                  h="18px"
                  px="5px"
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  fontSize="10px"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {notification.length > 99 ? '99+' : notification.length}
                </Box>
              )}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel p={2} w="full" color="red.600" >
                    {
                      !notification.length ? "No new messages" : `You have ${notification.length} new messages`
                    }
                  </Menu.ItemGroupLabel>
                </Menu.ItemGroup>
                <Menu.CheckboxItem value="new-txt-a" p={2} cursor="pointer" borderWidth={1} w="full" >
                  {notification.map(notif => (
                    <Menu.CheckboxItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter(n => n !== notif));
                      }}
                      cursor="pointer" w="full"
                    >
                      {
                        notif.chat.isgroupChat ? `New Message in ${notif.chat.ChatName}` : `New message from ${getSender(user, notif.chat.users)}`
                      }
                    </Menu.CheckboxItem >

                  ))
                  }
                </Menu.CheckboxItem>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>


        <Menu.Root positioning={{ placement: "bottom" }} >
          <Menu.Trigger rounded="full" focusRing="outside" cursor="pointer"
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user.name || "Unknown User"} />
              <Avatar.Image src={user.pic} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content bg="white" w="150px" borderRadius="md" boxShadow="md" >

                <Menu.Item value="profile" p={2} cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => setProfileOpen(true)}
                >My Profile</Menu.Item>

                <Menu.Item value="settings" p={2} cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => console.log("Settings Clicked")}
                >Settings</Menu.Item>

                <Menu.Item value="logout" p={2} cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => LogoutHandler()}
                >Logout</Menu.Item>

              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Context>
                  {(store) => (
                    <Drawer.Body pt="6" spaceY="3" mx={3}>
                      <Text fontSize="2xl" fontFamily="Work sans" mb={4}>Search Users</Text>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Input placeholder="Search by name or email"
                          mb={3} pl={2}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          borderWidth="2px"
                          borderColor="blue.300"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{
                            borderColor: "blue.500",
                            outline: "none",
                          }}
                        />

                        <Button onClick={handleSearch}
                          bg="gray.200" color="black" _hover={{ bg: "gray.300" }}
                          mx={2} mb={3} w="13%" rounded="md"
                        >Go
                        </Button>
                      </Box>
                      <Box>
                        {loading ? (
                          <ChatLoading />
                        ) : (
                          searchresult.length > 0 ? (
                            searchresult.map(user => (
                              <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}
                              />)
                            )
                          ) : (
                            <Text>No users found</Text>
                          )
                        )}
                        {
                          loadingChat && <Spinner size="lg" />
                        }
                      </Box>
                    </Drawer.Body>
                  )}
                </Drawer.Context>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>


        <ProfileModal user={user} open={profileOpen} setOpen={setProfileOpen} />

      </Box>

    </Box >
  )
}
export default SideDrawer;
