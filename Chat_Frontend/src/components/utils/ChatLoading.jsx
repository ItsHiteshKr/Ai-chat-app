import React from 'react'
import {
    HStack, Stack,
    SkeletonText
} from '@chakra-ui/react'
function ChatLoading() {
    return (
        <Stack>
            <SkeletonText mt="4" noOfLines={10} spacing="4" variant={'shine'} />
        </Stack>
    )
}

export default ChatLoading