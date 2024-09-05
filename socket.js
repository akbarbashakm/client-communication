const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);

        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
