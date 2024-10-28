import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './src/db/connect.db.js';

import userRouter from './src/routes/user.route.js';
import WalletRouter from './src/routes/wallet.route.js';
import adminRouter from './src/routes/admin.route.js';

import TaskBoosts from './src/controllers/TasksBoosts.controller.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",  // Allow any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // Allow these HTTP methods
    preflightContinue: false,
    optionsSuccessStatus: 204,  // For legacy browsers
    allowedHeaders: "Content-Type,Authorization",  // Allow these headers
}));

// TaskBoosts();

// Routes
app.use('/api', userRouter);
app.use('/api', WalletRouter);
app.use('/api', adminRouter)

const httpServer = createServer(app);

// Setup Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',  // Allow frontend access in production
    }
});

let CanvasCordinates = [
    { Id: "510510", color: "rgb(81, 233, 244)", X: 510, Y: 510 },
    { Id: "5100", color: "rgb(81, 233, 244)", X: 510, Y: 0 }
];

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Send the full canvas coordinates to the newly connected client
    socket.emit('pixel-Total-data', CanvasCordinates);

    // Listen for pixel updates from any client
    socket.on('pixel-update', (data) => {
        console.log('Pixel update received:', data);

        // Update the coordinate on the server
        const updatedCoordinates = CanvasCordinates.map(coord =>
            coord.Id === data.Id ? { ...coord, color: data.color } : coord
        );

        // If the pixel doesn't already exist, add it
        const finalCoordinates = updatedCoordinates.some(coord => coord.Id === data.Id)
            ? updatedCoordinates
            : [...updatedCoordinates, data];

        CanvasCordinates = finalCoordinates;  // Update the server's state

        // Broadcast the update to all other clients
        socket.broadcast.emit('pixel-update', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
