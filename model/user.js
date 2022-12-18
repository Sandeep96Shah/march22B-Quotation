const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    quotations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Quotation'
        }
    ]
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;