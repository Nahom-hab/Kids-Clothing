// routes/messageRoutes.js
import express from 'express';
const router = express.Router();

import { createMessage, getMessages } from '../controller/feedback.constroller.js';



router.post('/', createMessage);
router.get('/', getMessages);



export default router;