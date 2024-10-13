const mongoose = require('mongoose');

// สร้าง schema
const transportSchema = new mongoose.Schema({
    nameseller :String,
    phoneseller : String,
    nameBuyer : String,
    addesBuyer : String,
    phoneBuyer : String,
    noti : String,
    listDatas : [{
        product : String,
        weight : String,
        value : String,
        count : String
    }],
    Updated_at :{type:Date , default:Date.now}
});

// สร้าง model
const Transport = mongoose.model('Transpor', transportSchema);

module.exports = Transport; // ส่งออก model
