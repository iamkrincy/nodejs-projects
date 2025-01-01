const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            qty: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
