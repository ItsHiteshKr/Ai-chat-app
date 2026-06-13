import { useState } from "react"
import {
    Container, Box, Field,
    Input, Button, FileUpload, InputGroup,
    HStack, Text
} from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = process.env.BACKEND_URL;

export default function SignUp() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setpic] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function handleClick() {
        setShow(!show);
    }

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toaster.create({
                title: "Please select an image",
                type: "warning",
                duration: 5000,
                position: "top",
                closable: true,
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-App");
            data.append("cloud_name", "diliqaxtu");
            fetch("https://api.cloudinary.com/v1_1/diliqaxtu/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setpic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toaster.create({
                title: "Please select an image in jpeg or png format",
                type: "warning",
                duration: 5000,
                position: "top",
                closable: true,
            });
            setLoading(false);
            return;
        }
    };

    // confirmPassword bhara hua ho aur password se match na kare to true
    const passwordMismatch =
        confirmPassword !== "" && password !== confirmPassword;

    const submitHandler = async () => {
        setLoading(true);
        // 1. Saare required fields bhare hain?
        if (!name || !email || !password || !confirmPassword) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 5000,
                position: "top",
                closable: true,
            });
            setLoading(false);
            return;
        }

        // 2. Password aur Confirm Password match karte hain?
        if (password !== confirmPassword) {
            toaster.create({
                title: "Passwords do not match",
                type: "error",
                duration: 5000,
                position: "top",
                closable: true,
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${url}/api/user`,
                { name, email, password, pic },
                config
            );
            toaster.create({
                title: "Form submitted successfully",
                type: "success",
                duration: 5000,
                position: "top",
                closable: true,
            });
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toaster.create({
                title: "Error submitting form",
                description: error.response.data.message,
                type: "error",
                duration: 5000,
                position: "top",
                closable: true,
            });
        }
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
                        accept={["image/png", "image/jpeg"]}
                        maxFiles={1}
                        onFileChange={(details) =>
                            postDetails(details.acceptedFiles[0])
                        }
                    >
                        <FileUpload.HiddenInput />
                        <HStack>
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" size="sm" px={8}>
                                    Upload file
                                </Button>
                            </FileUpload.Trigger>
                            {loading && (
                                <Text fontSize="sm" color="gray.600">
                                    Uploading...
                                </Text>
                            )}
                            {pic && !loading && (
                                <Text fontSize="sm" color="green.600">
                                    Image uploaded ✓
                                </Text>
                            )}
                        </HStack>
                    </FileUpload.Root>
                </Field.Root>

                <Button colorScheme="blue" background={"blue"} mt={4} w="100%" display="block" mx="auto" px={4} rounded="full" onClick={submitHandler}
                    isLoading={loading}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    )
}
