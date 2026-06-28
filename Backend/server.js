const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // install karna hai isko 
const connectDB = require('./config/db');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');


dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Get route is Running Successfully');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket) => {
    // console.log('Connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log('User joined room: ' + userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        // console.log('User joined chat room: ' + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));

    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));


    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        // if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
    });

});
