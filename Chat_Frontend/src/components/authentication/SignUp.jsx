import { useState } from "react"
import {
    Container, Box, Field,
    Input, Button, FileUpload, InputGroup,
    HStack, Text
} from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"

export default function SignUp() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    function handleClick() {
        setShow(!show);
    }

    // confirmPassword bhara hua ho aur password se match na kare to true
    const passwordMismatch =
        confirmPassword !== "" && password !== confirmPassword;

    const submitHandler = () => {
        // 1. Saare required fields bhare hain?
        if (!name || !email || !password || !confirmPassword) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                closable: true,
            });
            return;
        }

        // 2. Password aur Confirm Password match karte hain?
        if (password !== confirmPassword) {
            toaster.create({
                title: "Passwords do not match",
                type: "error",
                closable: true,
            });
            return;
        }

        // 3. Sab sahi -> aage ka logic (backend call yahan aayega)
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Profile Picture:", profilePicture);

        toaster.create({
            title: "Form submitted successfully",
            type: "success",
            closable: true,
        });
    };


    return (
        <Container maxW="xl" centerContent mt={1}>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={1}
                p={2}
                w="100%"
                bg={"white"}
                m="4px 10px 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Field.Root required>
                    <Field.Label>Name <Field.RequiredIndicator /></Field.Label>
                    <Input
                        placeholder="Enter your name"
                        type="text"
                        value={name}
                        px={2}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        px={2}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field.Root>

                {/* Password - Show/Hide button input ke andar */}
                <Field.Root required>
                    <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
                    <InputGroup
                        endElement={
                            <Button
                                size="xs"
                                variant="ghost"
                                mr={2}
                                onClick={handleClick}
                            >
                                {show ? "Hide" : "Show"}
                            </Button>
                        }
                    >
                        <Input
                            placeholder="Enter your password"
                            type={show ? "text" : "password"}
                            value={password}
                            px={2}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                </Field.Root>

                {/* Confirm Password - same InputGroup pattern */}
                <Field.Root required invalid={passwordMismatch}>
                    <Field.Label>Confirm Password <Field.RequiredIndicator /></Field.Label>
                    <InputGroup
                        endElement={
                            <Button
                                size="xs"
                                variant="ghost"
                                mr={2}
                                onClick={handleClick}
                            >
                                {show ? "Hide" : "Show"}
                            </Button>
                        }
                    >
                        <Input
                            placeholder="Confirm your password"
                            type={show ? "text" : "password"}
                            value={confirmPassword}
                            px={2}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                    <Field.ErrorText>Passwords do not match</Field.ErrorText>
                </Field.Root>

                <Field.Root optional>
                    <Field.Label>Upload Your Profile Picture</Field.Label>
                    <FileUpload.Root
                        accept={["image/png"]}
                        maxFiles={1}
                        onFileChange={(details) =>
                            setProfilePicture(details.acceptedFiles[0])
                        }
                    >
                        <FileUpload.HiddenInput />
                        <HStack>
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" size="sm" px={8}>
                                    Upload file
                                </Button>
                            </FileUpload.Trigger>
                            {profilePicture && (
                                <Text fontSize="sm" color="gray.600" truncate>
                                    {profilePicture.name}
                                </Text>
                            )}
                        </HStack>
                    </FileUpload.Root>
                </Field.Root>

                <Button colorScheme="blue" background={"blue"} mt={4} w="100%" display="block" mx="auto" px={4} rounded="full" onClick={submitHandler}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    )
}
