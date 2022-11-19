import { Router } from 'express';

import {
    newDay,
} from '../controllers/newDay.controller.js';

const router = Router();

// Return a discrete consumption list for a given day (24h)
router.get(
    '/',
    newDay,
);

export default router;