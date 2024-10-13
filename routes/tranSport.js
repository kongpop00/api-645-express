const Transport = require('../models/tranSport');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        const transports = await Transport.find();
        return res.status(200).json(transports);
    }

    if (req.method === 'POST') {
        const transport = new Transport(req.body);
        await transport.save();
        return res.status(201).json(transport);
    }

    return res.status(405).send(); // Method Not Allowed
};
