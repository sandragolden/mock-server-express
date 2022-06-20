import express from 'express';
import * as auth from '../controllers/auth.js';

const router = express.Router();

router.post('/', auth.auth);
router.post('/token', auth.refreshToken);
router.post('/logout', auth.logout);

export default router;
