import mongoose, { InferSchemaType, Model, Schema, model, models } from "mongoose";

const trainingLogSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
    },
    hours: {
        type: Number,
        required: true
    }
});

export const Tree: Model<InferSchemaType<typeof trainingLogSchema>> = models.TrainingLog ?? model('TrainingLog', trainingLogSchema);

export default mongoose.models?.TrainingLog || mongoose.model("traininglogs", trainingLogSchema);