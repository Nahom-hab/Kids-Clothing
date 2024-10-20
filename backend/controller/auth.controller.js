import User from "../models/user.js";
import bcrypt from "bcryptjs"; 
import { errorHandeler } from "../utils/errorHandeler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(errorHandeler(400, "User already exists. You cannot signup."));
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ username, password: hashedPassword, email });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "User created successfully", user: savedUser }); //
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandeler(404, "User not found"));

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) return next(errorHandeler(401, "Wrong credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.SECRET, { expiresIn: "2w" });

        const { password: hashedPassword, ...otherUserData } = validUser._doc;

        res
            .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" })
            .status(200)
            .json(otherUserData);
    } catch (err) {
        next(err);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token", { path: "/", domain: "yourdomain.com" });
        res.status(200).json("User logged out");
    } catch (error) {
        next(error);
    }
};
