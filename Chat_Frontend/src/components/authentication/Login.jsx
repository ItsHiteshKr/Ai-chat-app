import { useState } from "react";
import {
    Container, Box, Field,
    Input, Button, InputGroup
} from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_BACKEND_URL;

export default function Login() {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function clickhandle() {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);

        if (!email || !password) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 3000,
                position: "top",
                closable: true,
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(`${url}/api/user/login`, { email, password }, config);

            toaster.create({
                title: "Login successful",
                type: "success",
                duration: 3000,
                position: "top",
                closable: true,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");

        } catch (error) {
            toaster.create({
                title: "Error occurred during login",
                description: error.message,
                type: "error",
                duration: 5000,
                position: "top",
                closable: true,
            });
            setLoading(false);
        }

    };

    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                p={2}
                gap={2}
                w="100%"
                bg={"white"}
                m="4px 10px 10px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
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

                {/* Password field with show/hide toggle */}
                <Field.Root required>
                    <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
                    <InputGroup
                        endElement={
                            <Button
                                size="xs"
                                variant="ghost"
                                mr={2}
                                onClick={clickhandle}
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

                <Button colorScheme={"blue"} background={"blue"} mt={4} w="100%" display="block" mx="auto" px={4} rounded="full"
                    isLoading={loading}
                    onClick={submitHandler}>
                    Login
                </Button>

                <Button variant="outline"
                    background={"red"} mt={2}
                    color={"white"} w="100%" display="block" mx="auto" px={4} rounded="full"
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("guestpassword");
                    }}>
                    Guest User Credentials
                </Button>

            </Box>
        </Container>
    )
}
