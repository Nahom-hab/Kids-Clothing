import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_ADMIN_SECRET, { expiresIn: '2w' });

            // Send JWT token as cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 14 * 24 * 60 * 60 * 1000, 
            });

            const { password, ...data } = admin
            res.json({ message: 'Login successful', adminData: data._doc });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const logoutAdmin = (req, res) => {
    if (req.admin.id == req.params.id) {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    }
}




export const ReisterAdmin = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if username or email already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create the admin
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            email,
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
