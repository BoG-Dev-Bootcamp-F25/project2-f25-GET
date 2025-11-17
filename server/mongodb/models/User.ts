import mongoose, { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
});

export const User: Model<InferSchemaType<typeof userSchema>> = models.User ?? model('User', userSchema);

export default mongoose.models?.User || mongoose.model("User", userSchema);