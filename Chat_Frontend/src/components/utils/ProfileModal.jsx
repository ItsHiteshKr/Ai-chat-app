import {
    Dialog,
    Portal,
    Button,
    CloseButton,
    Image,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { FiEye } from "react-icons/fi";


const ProfileModal = ({ user, children, open, setOpen }) => {
    // open/setOpen diye = controlled mode (Menu jaise jagah ke liye).
    // nahi diye = trigger mode (children ya default profile button).
    const isControlled = open !== undefined;

    return (
        <Dialog.Root
            {...(isControlled
                ? { open, onOpenChange: (e) => setOpen(e.open) }
                : {})}
            motionPreset="slide-in-bottom"
        >
            {!isControlled && (
                <Dialog.Trigger asChild>
                    {children ? children : (
                        <IconButton aria-label="View profile" variant="ghost">
                            <FiEye />
                        </IconButton>
                    )}
                </Dialog.Trigger>
            )}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header justifyContent="center">
                            <Dialog.Title fontSize="3xl" fontFamily="Work sans" m={2}>
                                {user?.name}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={4}
                        >
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={user?.pic || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
                                alt={user?.name}
                            />
                            <Text fontSize="lg">
                                Email: {user?.email}
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer justifyContent="end" p={4}>
                            <Dialog.ActionTrigger asChild>
                                <Button p={3} rounded="2xl" bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
                                    Close
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ProfileModal;
