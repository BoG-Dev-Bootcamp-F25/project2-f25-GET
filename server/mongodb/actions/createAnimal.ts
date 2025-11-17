import mongoose from "mongoose";
import connectDB from "../index";
import Animal from "../models/Animal";

async function createAnimal(
    name: string,
    breed: string,
    owner: mongoose.Schema.Types.ObjectId,
    hoursTrained: number,
    profilePicture: string
) {
    try {
        await connectDB();
        const newUser = new Animal({ name, breed, owner, hoursTrained, profilePicture });
        await newUser.save();
    } catch (error) {
        throw false;
    }
}

export default createAnimal;