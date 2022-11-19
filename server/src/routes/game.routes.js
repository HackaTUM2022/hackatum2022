import { Router } from 'express';

import {
    createGame,
    updateGame,
    listGames,
} from '../controllers/game.controller.js';

const router = Router();

// Games
router.post(
    '/',
    createGame,
);

router.put(
    '/',
    updateGame,
);

router.get(
    '/',
    listGames,
);

export default router;
