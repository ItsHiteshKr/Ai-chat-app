import React from 'react'
import {
    Box, Avatar,
    Text
} from '@chakra-ui/react'

function UserListItem({ user, handleFunction }) {
    return (
        <Box onClick={handleFunction}
            display="flex"
            alignItems="center"
            px={3}
            py={2}
            mb={2}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            bg="#E8E8E8"
            color="black"
            _hover={{
                bg: "#38B2AC",
                color: "white"
            }}
        >
            <Avatar.Root size="sm" mr={2} cursor="pointer">
                <Avatar.Fallback name={user.name} />
                <Avatar.Image src={user.pic} />
            </Avatar.Root>
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="sm" color="gray.500">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>

        </Box>
    )
}

export default UserListItem