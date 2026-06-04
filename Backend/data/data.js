const chats = [
    {
        isGroupChat: false,
        users: [
            {
                name: "John Doe",
                email: "john@example.com",
                phone: "7324047278",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
        ],
        _id: "617a077e18c25468bc7c4dd4",
        chatName: "John Doe",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Guest User",
                email: "guest@example.com",
                phone: "7324047280",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
        ],
        _id: "617a077e18c25468b27c4dd4",
        chatName: "Guest User",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Anthony",
                email: "anthony@example.com",
                phone: "7324047281",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
        ],
        _id: "617a077e18c2d468bc7c4dd4",
        chatName: "Anthony",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "John Doe",
                email: "jon@example.com",
                phone: "7324047278",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
            {
                name: "Guest User",
                email: "guest@example.com",
                phone: "7324047280",
            },
        ],
        _id: "617a518c4081150716472c78",
        chatName: "Friends",
        groupAdmin: {
            name: "Guest User",
            email: "guest@example.com",
            phone: "7324047280",
        },
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Jane Doe",
                email: "jane@example.com",
                phone: "7324047282",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
        ],
        _id: "617a077e18c25468bc7cfdd4",
        chatName: "Jane Doe",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "John Doe",
                email: "jon@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
                phone: "7324047279",
            },
            {
                name: "Guest User",
                email: "guest@example.com",
                phone: "7324047280",
            },
        ],
        _id: "617a518c4081150016472c78",
        chatName: "Chill Zone",
        groupAdmin: {
            name: "Guest User",
            email: "guest@example.com",
            phone: "7324047280",
        },
    },
];

module.exports = chats;