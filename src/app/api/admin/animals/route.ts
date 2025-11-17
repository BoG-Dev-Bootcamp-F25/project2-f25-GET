import readAnimals from "../../../../../server/mongodb/actions/admin/readAnimals";

export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const animals = await readAnimals();

        return Response.json(
            animals,
            { status: 200 }
        );
    } catch (error) {
        console.error("get animal error:", error);
        return new Response(
            "Failed to get users",
            { status: 500 }
        );
    }
};