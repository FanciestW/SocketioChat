const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log(`User Connectioned with socket id: ${socket.id}`);

    // When a chat message is received.
    socket.on('chat message', (msg) => {
        console.log(`User with socket id: ${socket.id} said: ${msg}`);
    });

    // When a socket/client disconnects.
    socket.on('disconnect', () => {
        console.log(`User has Disconnected with socket id: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
