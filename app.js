const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // โหลดตัวแปรสภาพแวดล้อม
const app = express();
const port = process.env.PORT || 3000;

console.log('MongoDB URI:', process.env.MONGODB_URI);

// Middleware เพื่อแปลง JSON body
app.use(express.json());

// เชื่อมต่อกับ MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// ตั้งค่า router
app.use('/transports', require('./routes/tranSport'));

// ติดตั้ง route สำหรับ root
app.get('/', (req, res) => {
  res.send('Welcome to the Transport API!');
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
