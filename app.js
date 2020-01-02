const app = require('express')();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
