import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
    {
        buyer: String,
        seller: String,
        security: String,
        qty: Number,
        price: Number,
    },
    {
        timestamps: true,
    },
);

const Match = mongoose.model('Match', matchSchema);
export default Match;
