import mongoose from "mongoose";

let connected = false;

export const connectToDb = async () => {
	if (!connected) {
		await mongoose.connect('mongodb://127.0.0.1:27017/test');
		connected = true;
	}
};
