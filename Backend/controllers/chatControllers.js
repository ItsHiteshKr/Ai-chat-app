const asynchandler = require('express-async-handler');
const Chat = require('../models/ChatModel');
const User = require('../models/UserModel');

// create chat 
const accessChat = asynchandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with the request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };


        try {
            var createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }

    }
});

// fetch chat
const fetchChats = asynchandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// create group chat
const createGroupChat = asynchandler(async (req, res) => {
    const { name, users } = req.body;

    if (!name || !users) {
        return res.status(400).send({ message: "Please Fill all the fields" });
    }

    var usersArray = JSON.parse(users);

    if (usersArray.length < 2) {
        return res
            .status(400)
            .send({ message: "More than 2 users are required to form a group chat" });
    }

    usersArray.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: usersArray,
            isGroupChat: true,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

// rename group
const renameGroup = asynchandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.status(200).send(updatedChat);
    }


});

// add to group
const addToGroup = asynchandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId }
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.status(200).send(added);
    }
});

// remove from group
const removeFromGroup = asynchandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId }
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.status(200).send(removed);
    }
});




module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };