import createAnimal from "../../../../server/mongodb/actions/createAnimal";
import updateAnimalHours from "../../../../server/mongodb/actions/updateAnimalHours";
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

export const PATCH = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        console.log("Received body:", body);
        const { animalId, hours } = body ?? {};
        
        console.log("animalId:", animalId, "hours:", hours);
        
        if (!mongoose.isValidObjectId(animalId) || typeof hours !== 'number') {
            console.log("Validation failed");
            return new Response("invalid input", { status: 400 });
        }

        console.log("Calling updateAnimalHours...");
        const updatedAnimal = await updateAnimalHours(animalId, hours);
        console.log("Updated animal:", updatedAnimal);

        return Response.json(updatedAnimal, { status: 200 });
    } catch (error) {
        console.error("error in updating animal hours: ", error);
        return new Response("failed", { status: 500});
    }
}