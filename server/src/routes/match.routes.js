import { Router } from 'express';

import {
    listMatches,
} from '../controllers/match.controller.js';

const router = Router();

// Return details about the orders
router.get(
    '/',
    listMatches,
);

export default router;
