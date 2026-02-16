const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String, // e.g. 'Food', 'Salary'
    },
    date: {
        type: String, // Storing as YYYY-MM-DD string as per frontend input
        // Or Date type if parsing:
        // type: Date
    },
    type: {
        type: String, // 'income' or 'expense'
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
