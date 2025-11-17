import connectDB from "../..";
import Animal from "../../models/Animal";


async function readAnimals() {
    try {
        await connectDB();
        const animals = await Animal.find();
        console.log("Found animals:", animals.length);
        console.log("Animals:", animals);
        return animals;
    } catch (error) {
        console.error("Error reading animals:", error);
        throw error;
    }
}

export default readAnimals;