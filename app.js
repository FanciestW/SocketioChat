const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

const users = [];
const messages = [];

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log(`User Connectioned with socket id: ${socket.id}`);

    socket.emit('ask name');

    // Emit user connected message to all connected clients except for the sender client.
    socket.broadcast.emit('user connected', { socketId: socket.id });

    // When a new user joins and states username.
    socket.on('new user', (username) => {

        console.log(`New user named: ${username}`);
        users.push({ socketId: socket.id, username });
        // Emit user connected message to all connected clients except for the sender client.
        socket.broadcast.emit('user connected', { username, });
        socket.emit('welcome', { serverMsg: `Welcome to the chat ${username}!`, messages, });
    });

    // When a chat message is received.
    socket.on('chat message', (msg) => {
        console.log(`User with socket id: ${socket.id} said: ${msg}`);
        const { username } = users.find((u) => { return u.socketId === socket.id; });
        
        const newMessage = `${username} said: ${msg}`;
        messages.push(newMessage);
        // Emit message from client to all other clients including the sender client.
        // io.emit('chat message', { msg: `${username} said: ${msg}` });

        // Broadcast message to all other clients excluding the original sender.
        socket.broadcast.emit('chat message', { msg: newMessage });
    });

    // When a socket/client disconnects.
    socket.on('disconnect', () => {
        console.log(`User has Disconnected with socket id: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
