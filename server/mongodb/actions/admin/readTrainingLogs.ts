import connectDB from "../..";
import TrainingLog from "../../models/TrainingLog";

async function readTrainingLogs() {
    try {
        await connectDB();
        const trainingLogs = await TrainingLog.find()
        console.log("Found training logs:", trainingLogs.length);
        console.log("Training logs:", trainingLogs);
        return trainingLogs;
    } catch (error) {
        console.error("Error reading training logs:", error);
        throw error;
    }
}

export default readTrainingLogs;