import { Router } from 'express';

import {
    generateDailyConsumption,
} from '../controllers/consumption.controller.js';

const router = Router();

// Return a discrete consumption list for a given day (24h)
router.get(
    '/',
    generateDailyConsumption,
);

export default router;