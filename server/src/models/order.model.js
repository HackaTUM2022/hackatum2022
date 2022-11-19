import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        security: String,
        qty: Number,
        price: Number,
        side: {
            type: String,
            enum: ['sell', 'buy', 'undefined'],
            default: 'undefined',
        },
        user: String,
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
