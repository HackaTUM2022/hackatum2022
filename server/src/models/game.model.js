import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
    {
        username: String,
        highscoreDays: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Game = mongoose.model('Game', gameSchema);
export default Game;
