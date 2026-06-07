import React from 'react'
import {
    Container, Box, Field,
    Input, Button, FileUpload
} from "@chakra-ui/react"

export default function SignUp() {
    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={2}
                p={2}
                w="100%"
                bg={"white"}
                m="4px 10px 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Field.Root required>
                    <Field.Label>
                        Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Enter your name" p={2} />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Enter your email" p={2} />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Enter your password" p={2} />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Confirm Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Confirm your password" p={2} />
                </Field.Root>

                <Field.Root optional>
                    <Field.Label>
                        Upload Your Profile Picture
                    </Field.Label>

                    <FileUpload.Root accept={["image/png"]}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild>
                            <Button variant="outline" size="sm" p={2}>
                                Upload file
                            </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List />
                    </FileUpload.Root>
                </Field.Root>


            </Box>

        </Container>
    )
}
