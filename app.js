const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log(`User Connectioned with socket id: ${socket.id}`);

    // Emit user connected message to all connected clients except for the sender client.
    socket.broadcast.emit('user connected', { socketId: socket.id });

    // Emit welcome event to the newly connected client socket.
    socket.emit('welcome', { serverMsg: 'Welcome to the chat', });

    // When a chat message is received.
    socket.on('chat message', (msg) => {
        console.log(`User with socket id: ${socket.id} said: ${msg}`);

        // Emit message from client to all other clients including the sender client.
        io.emit('chat message', msg);
    });

    // When a socket/client disconnects.
    socket.on('disconnect', () => {
        console.log(`User has Disconnected with socket id: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
