const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const QuotationModel = mongoose.model('Quotation', quotationSchema);

module.exports = QuotationModel;