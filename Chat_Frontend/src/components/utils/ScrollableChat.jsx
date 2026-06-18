import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../../context/ChatProvider';
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar } from "@chakra-ui/react"

import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../config/ChatLogic';

const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();



    return (
        <ScrollableFeed>
            {
                messages && messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {
                            (isSameSender(messages, m, i, user._id) ||
                                isLastMessage(messages, i, user._id)
                            ) && (
                                <Tooltip
                                    content={m.sender.name}
                                    showArrow
                                    contentProps={{ px: 3, py: 1 }}
                                    positioning={{ placement: "bottom-start" }}
                                >
                                    <Avatar.Root size="sm" mt="7px" mr={1} cursor="pointer">
                                        <Avatar.Fallback name={m.sender.name} />
                                        <Avatar.Image src={m.sender.pic} />
                                    </Avatar.Root>

                                </Tooltip>
                            )
                        }

                        <span
                            style={{
                                backgroundColor: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat;