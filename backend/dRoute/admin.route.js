import express from 'express';

import AdminMiddleWere from '../middelware/authMiddleware.js';
import Admin from '../models/admin.js';
import { loginAdmin, logoutAdmin, ReisterAdmin } from '../controller/admin.controller.js';

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);
router.post('/logout/:id', AdminMiddleWere, logoutAdmin);
router.post('/create/:id', ReisterAdmin);



router.get('/check-admin-status', AdminMiddleWere, async (req, res) => {
    // Send back the admin's id, email, and username if they are authenticated as an admin
    const admin = await Admin.findById(req.admin.id)
    const { password, ...data } = admin


    if (!admin) {
        return res.json('admin not found')
    }
    res.json({
        id: req.admin.id,
        email: data._doc.email,
        username: data._doc.username,
    });
});


export default router;
