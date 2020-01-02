const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log(`A User Connectioned with socket id: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`A User has Disconnected with socket id: ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
