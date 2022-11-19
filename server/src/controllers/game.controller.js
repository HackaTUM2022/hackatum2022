import { Game, CONSTANTS } from '../models/index.js';

const createGame = async (req, res) => {
    try {
        const game = await Game.create(
            {
                username: req.body.username,
            },
        );

        res.status(200).send(
            {
                status: CONSTANTS.SUCCESS,
                message: 'Games retrieved successfully',
                data: game,
            },
        );
    } catch (error) {
        res.status(500).send(
            {
                status: CONSTANTS.ERROR,
                message: error.message,
            },
        );
    }
};

const updateGame = async (req, res) => {
    try {
        const game = await Game.findOneAndUpdate(
            {
                username: req.body.username,
            },
            {
                $set: {
                    highscoreDays: req.body.highscoreDays,
                },
            },
            {
                new: true,
            },
        );

        res.status(200).send(
            {
                status: CONSTANTS.SUCCESS,
                message: 'Games retrieved successfully',
                data: game,
            },
        );
    } catch (error) {
        res.status(500).send(
            {
                status: CONSTANTS.ERROR,
                message: error.message,
            },
        );
    }
};

const listGames = async (req, res) => {
    try {
        const games = await Game.find();

        res.status(200).send(
            {
                status: CONSTANTS.SUCCESS,
                message: 'Games retrieved successfully',
                data: games,
            },
        );
    } catch (error) {
        res.status(500).send(
            {
                status: CONSTANTS.ERROR,
                message: error.message,
            },
        );
    }
};

export {
    createGame,
    updateGame,
    listGames,
};
