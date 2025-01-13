// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Create a Socket.IO instance

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests (if your frontend is hosted separately)
app.use(cors());

// Directory to store uploaded images
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR); // Save uploads in the uploads directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filenames
    }
});

const upload = multer({ storage: storage });

// In-memory store for lobby images (could be replaced with a database)
let lobbies = {};

// API to upload an image to a specific lobby
app.post('/api/upload/:lobbyId', upload.single('image'), (req, res) => {
    const lobbyId = req.params.lobbyId; // Get the lobby ID from the URL

    // Check if an image file was uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Construct the URL for the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;

    // Store the image in the corresponding lobby (create the lobby if it doesn't exist)
    if (!lobbies[lobbyId]) {
        lobbies[lobbyId] = [];
    }
    lobbies[lobbyId].push(imageUrl);

    // Broadcast the new image to all users in the lobby via Socket.IO
    io.to(lobbyId).emit('new-image', { imageUrl });

    // Respond with the image URL
    res.json({ imageUrl });
});

// Serve static files
app.use(express.static('public'));

// Serve uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));

// Handle Socket.IO connections for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When a client joins a lobby, add them to the correct room
    socket.on('join-lobby', (lobbyId) => {
        socket.join(lobbyId); // Join the Socket.IO room for this lobby
        console.log(`User ${socket.id} joined lobby ${lobbyId}`);

        // Send the current images in the lobby to the new user
        if (lobbies[lobbyId]) {
            lobbies[lobbyId].forEach(imageUrl => {
                socket.emit('new-image', { imageUrl }); // Send each image
            });
        }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Create an API to create a new lobby
app.post('/api/lobby', (req, res) => {
    const lobbyId = Date.now().toString(); // Generate a unique lobby ID (you could use UUIDs instead)
    lobbies[lobbyId] = []; // Initialize the lobby with an empty array for images
    res.json({ lobbyId });
});

// API to get the list of existing lobbies
app.get('/api/lobbies', (req, res) => {
    res.json(Object.keys(lobbies)); // Return a list of all lobby IDs
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});