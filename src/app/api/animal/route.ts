import createAnimal from "../../../../server/mongodb/actions/createAnimal";
import mongoose from "mongoose";

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { name, breed, owner, hoursTrained, profilePicture } = body ?? {};

        if (
            typeof name !== 'string' ||
            typeof breed !== 'string' ||
            !mongoose.isValidObjectId(owner) ||
            typeof hoursTrained !== 'number' ||
            typeof profilePicture !== 'string'
        ) {
            return new Response("Invalid input", { status: 400});
        }
        
        await createAnimal(name, breed, owner, hoursTrained, profilePicture);

        return new Response("Success", { status: 200});
    } catch (error) {
        console.error("Error in route", error);
        return new Response("Failed", { status: 500});
    }
};