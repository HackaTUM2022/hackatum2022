import { Router } from 'express';

import {
    me,
} from '../controllers/user.controller.js';

const router = Router();

// Return details about the user account
router.get(
    '/me',
    me,
);

export default router;
