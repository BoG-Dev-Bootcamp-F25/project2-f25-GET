import mongoose from "mongoose";
import connectDB from "../index";
import User from "../models/User";
import * as argon2 from "argon2";

async function createUser(
    fullName: string,
    email: string,
    password: string,
    admin: boolean
) {
    try {
        await connectDB();
        const hash = await argon2.hash(password);
        const newUser = new User({ fullName, email: email.toLowerCase(), password: hash, admin });
        await newUser.save();
    } catch (error) {
        throw false;
    }
}

export default createUser;