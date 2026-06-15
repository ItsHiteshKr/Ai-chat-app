import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            bg="purple.600"
            color="white"
            cursor="pointer"
            onClick={handleFunction}
            w="fit-content"
            gap={1}

        >
            <Text display="flex" alignItems="center">
                {user.name} <span> <IoClose ml={2} /></span>
            </Text>


        </Box>
    )
}

export default UserBadgeItem