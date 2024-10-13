const express = require('express');
const mongoose = require('mongoose');
const Transport = require('../models/transport'); // ใช้พาธที่ถูกต้อง

const app = express();
app.use(express.json());

// เชื่อมต่อกับ MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    }
}

// API Endpoint
app.get('/transports', async (req, res) => {
    try {
        const transports = await Transport.find();
        res.json(transports);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving transports');
    }
});

app.post('/transports', async (req, res) => {
    const transport = new Transport(req.body);
    try {
        const savedTransport = await transport.save();
        res.status(201).json(savedTransport);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error creating transport');
    }
});

// ส่งฟังก์ชันให้ Vercel
module.exports = app;
