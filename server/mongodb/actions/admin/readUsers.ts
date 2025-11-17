import connectDB from "../..";
import User from "../../models/User";


async function readUsers() {
    try {
        await connectDB();
        const users = await User.find().select('-password');
        console.log("Found users:", users.length);
        console.log("Users:", users);
        return users;
    } catch (error) {
        console.error("Error reading users:", error);
        throw error;
    }
}

export default readUsers;

// const cursor = db.collection('inventory').find({});
