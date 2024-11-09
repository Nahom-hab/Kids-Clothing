// routes/messageRoutes.js
import express from 'express';
const router = express.Router();

import { createMessage, getMessages } from '../controller/feedback.constroller.js';
import { sendUserFeedBack } from '../controller/sendmessage.controller.js';



router.post('/', createMessage);
router.get('/', getMessages);
router.post('/sendToBot', sendUserFeedBack);





export default router;