import { Match, CONSTANTS } from '../models/index.js';

const listMatches = async (req, res) => {
    try {
        const matches = await Match.find();

        res.status(200).send(
            {
                status: CONSTANTS.SUCCESS,
                message: 'Matches retrieved successfully',
                data: matches,
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
    // eslint-disable-next-line import/prefer-default-export
    listMatches,
};
