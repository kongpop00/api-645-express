const express = require('express');
const mongoose = require('mongoose');
const Transport = require('./models/transport'); // Import Transport model
const app = express();
const port = process.env.PORT || 3000;

// Middleware เพื่อแปลง JSON body
app.use(express.json());

// เชื่อมต่อกับ MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1); // ออกจากโปรแกรมหากไม่สามารถเชื่อมต่อได้
    }
}

// ใช้ router สำหรับ /transports
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

// จัดการข้อผิดพลาดทั่วไป
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// เริ่มเซิร์ฟเวอร์และเชื่อมต่อกับฐานข้อมูล
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
