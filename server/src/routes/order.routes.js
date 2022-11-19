import { Router } from 'express';

import {
    createOrder,
    listOrders,
} from '../controllers/order.controller.js';

const router = Router();

// Return details about the orders
router.post(
    '/',
    createOrder,
);

router.get(
    '/',
    listOrders,
);

export default router;
