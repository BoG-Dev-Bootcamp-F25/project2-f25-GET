import connectDB from "../..";
import Animal from "../../models/Animal";


async function readAnimals(lastId?: string, limit: number = 4, ownerId?: string) {
    try {
        await connectDB();

        const query: any = {};
        if (ownerId) query.owner = ownerId;
        if (lastId) query._id = { $lt: lastId };

        const animals = await Animal.find(query)
            .sort({ _id: -1 })
            .limit(limit);

        console.log("Found animals:", animals.length);
        return animals;
    } catch (error) {
        console.error("Error reading animals:", error);
        throw error;
    }
}

export default readAnimals;