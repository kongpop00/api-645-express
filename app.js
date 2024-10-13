require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const transportsRouter = require('./routes/transports');
const app = express();
const port = process.env.PORT || 3000;

// Middleware เพื่อแปลง JSON body
app.use(express.json());

// เชื่อมต่อกับ MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// ใช้ router สำหรับ /transports
app.use('/transports', transportsRouter);

// Route สำหรับ root path
app.get('/', (req, res) => {
    res.send('Welcome to the Transport API!');
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
