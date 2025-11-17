import createTrainingLog from "../../../../server/mongodb/actions/createTrainingLog";
import mongoose from "mongoose";

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { user, animal, title, date, description, hours } = body ?? {};

        if (
            !mongoose.isValidObjectId(user) ||
            !mongoose.isValidObjectId(animal) ||
            typeof title !== 'string' ||
            typeof date !== 'string' ||
            typeof description !== 'string' ||
            typeof hours !== 'number'
        ) {
            return new Response("Invalid input", { status: 400});
        }
        
        await createTrainingLog(user, animal, title, new Date(date), description, hours);

        return new Response("Success", { status: 200});
    } catch (error) {
        console.error("Error in route", error);
        return new Response("Failed", { status: 500});
    }
};
