import connectDB from "../..";
import TrainingLog from "../../models/TrainingLog";

async function readTrainingLogs(lastId?: string, limit: number = 4) {
    try {
        await connectDB();
        const query = lastId ? { _id: { $lt: lastId } } : {};

        const trainingLogs = await TrainingLog.find(query)
            .sort({ _id: -1 })
            .limit(limit);

        console.log("Found training logs:", trainingLogs.length);
        console.log("Training logs:", trainingLogs);
        return trainingLogs;
    } catch (error) {
        console.error("Error reading training logs:", error);
        throw error;
    }
}

export default readTrainingLogs;