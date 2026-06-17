const asynchandler = require('express-async-handler');
const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');
const Message = require('../models/MessageModel');

// send message
const sendMessage = asynchandler(async (req, res) => {

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    // chat exist karta hai? aur user uska member hai?
    const chat = await Chat.findById(chatId);

    if (!chat) {
        res.status(404);
        throw new Error("Chat not found");
    }

    const isMember = chat.users.some(
        (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isMember) {
        res.status(403);
        throw new Error("You are not a member of this chat");
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate('sender', " name pic");
        message = await message.populate('chat');

        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }



});

// get all messages
const allMessage = asynchandler(async (req, res) => {
    const { chatId } = req.params;

    // chat exist karta hai? aur user uska member hai?
    const chat = await Chat.findById(chatId);

    if (!chat) {
        res.status(404);
        throw new Error("Chat not found");
    }

    const isMember = chat.users.some(
        (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isMember) {
        res.status(403);
        throw new Error("You are not a member of this chat");
    }

    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name pic email')
            .populate('chat');

        res.json(messages);

    } catch (error) {

        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { sendMessage, allMessage };
