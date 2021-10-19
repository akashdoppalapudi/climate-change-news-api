import express from 'express';

import { homeGreeting, getNews, getNewsFromId } from './controller.js';

const router = express.Router();

router.get('/', homeGreeting);
router.get('/news', getNews);
router.get('/news/:newspaperId', getNewsFromId);

export default router;
