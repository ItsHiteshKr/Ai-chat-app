// This file contains utility functions related to chat logic, such as determining the sender of a message in a chat.

// getSender: This function takes the logged-in user and an array of users in a chat, and returns the name of the other user in the chat (the sender). It checks if the first user in the array is the logged-in user; if so, it returns the name of the second user, otherwise it returns the name of the first user.
export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}


// getSenderFull: Similar to getSender, but instead of returning just the name, it returns the full user object of the sender. This can be useful when you need more information about the sender, such as their email or profile picture.
export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

// isSameSender: This function checks if the sender of the current message is the same as the sender of the next message in the array. It takes the messages array, the current message, the index of the current message, and the logged-in user's ID as parameters. It returns true if the next message is from a different sender or if there is no next message, and if the current message is not sent by the logged-in user.
export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

// isLastMessage: This function checks if the current message is the last message in the array and if it was sent by someone other than the logged-in user. It takes the messages array, the index of the current message, and the logged-in user's ID as parameters. It returns true if the current message is the last one and was sent by another user.
export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
}



export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    ) return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    ) return 0;
    else return "auto";
}


export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
}