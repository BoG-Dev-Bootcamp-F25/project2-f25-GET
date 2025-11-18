import mongoose from "mongoose";
import connectDB from "../../index";
import User from "../../models/User";
import * as argon2 from "argon2";

async function verifyUser(
    email: string,
    password: string
) {
    try {
        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return null;
        }

        const isValidPass = await argon2.verify(user.password, password);

        if (!isValidPass) {
            return null;
        }

        return {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin
        }
    } catch (error) {
        console.error("error verifying user:", error);
        throw false;
    }
}

export default verifyUser;