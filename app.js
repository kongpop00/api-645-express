const express = require('express');
const mongoose = require('mongoose');
const transportsRouter = require('./routes/tranSport'); // Import transports router
const app = express();
const port = 3000;

// Middleware เพื่อแปลง JSON body
app.use(express.json());

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb+srv://admin-465:0944902030@cluster0.9zfh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected successfully'))
  .catch((err) => console.error(err));


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
