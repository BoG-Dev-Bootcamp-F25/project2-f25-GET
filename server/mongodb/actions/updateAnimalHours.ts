import mongoose from "mongoose";
import connectDB from "../index";
import Animal from "../models/Animal";

async function updateAnimalHours(
    animalId: mongoose.Schema.Types.ObjectId | string,
    hours: number
) {
    try {
        await connectDB();
        const animal = await Animal.findByIdAndUpdate(
            animalId,
            { $inc: { hoursTrained: hours } },
            { new: true }
        );
        
        if (!animal) {
            throw new Error("Animal not found");
        }
        
        return animal;
    } catch (error) {
        console.error("Error updating animal hours:", error);
        throw error;
    }
}

export default updateAnimalHours;