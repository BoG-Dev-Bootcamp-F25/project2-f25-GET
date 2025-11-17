import mongoose from "mongoose";
import connectDB from "../index";
import User from "../models/User";

async function createUser(
    fullName: string,
    email: string,
    password: string,
    admin: boolean
) {
    try {
        await connectDB();
        const newUser = new User({ fullName, email, password, admin });
        await newUser.save();
    } catch (error) {
        throw false;
    }
}

export default createUser;