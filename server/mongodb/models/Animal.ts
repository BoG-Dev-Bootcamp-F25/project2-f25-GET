import mongoose, { InferSchemaType, Model, Schema, model, models } from "mongoose";

const animalSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hoursTrained: {
        type: Number,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    }
});

export const Tree: Model<InferSchemaType<typeof animalSchema>> = models.animal ?? model('Animal', animalSchema);