const express = require('express');
const router = express.Router();
const Transport = require('../models/tranSport');

// GET - แสดงรายการทั้งหมด
router.get('/', async (req, res) => {
    const transports = await Transport.find();
    res.json(transports);
});

// POST - เพิ่มรายการใหม่
router.post('/', async (req, res) => {
    const transport = new Transport(req.body);
    await transport.save();
    res.status(201).json(transport);
});

// DELETE - ลบรายการตาม ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Transport.findByIdAndRemove(id);
    res.status(204).send();
});

module.exports = router; // ส่งออก router
