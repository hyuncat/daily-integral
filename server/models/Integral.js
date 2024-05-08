const mongoose = require('mongoose');

const IntegralSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    integral: { type: String, required: true },
    solution: { type: String, required: true },
    showDate: { type: String, required: true }
});

module.exports = mongoose.model('Integral', IntegralSchema);