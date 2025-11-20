import mongoose from "mongoose";
import connectDB from "../index";
import TrainingLog from "../models/TrainingLog";
import Animal from "../models/Animal";

async function createTrainingLog(
    user: mongoose.Schema.Types.ObjectId,
    animal: mongoose.Schema.Types.ObjectId,
    title: string,
    date: Date,
    description: string,
    hours: number
) {
    try {
        await connectDB();
        const newTrainingLog = new TrainingLog({ user, animal, title, date, description, hours });
        await newTrainingLog.save();
        
        // Update the animal's hoursTrained
        await Animal.findByIdAndUpdate(
            animal,
            { $inc: { hoursTrained: hours } },
            { new: true }
        );
    } catch (error) {
        console.error("Error", error);
        throw false;
    }
}

export default createTrainingLog;