import readAnimals from "../../../../../server/mongodb/actions/admin/readAnimals";

export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const { searchParams } = new URL(req.url);
        const lastId = searchParams.get('lastId') ?? undefined;
        const limit = parseInt(searchParams.get('limit') ?? '4');
        const ownerId = searchParams.get('ownerId') ?? undefined;

        const animals = await readAnimals(lastId, limit, ownerId);

        return Response.json(
            animals,
            { status: 200 }
        );
    } catch (error) {
        console.error("get animal error:", error);
        return new Response(
            "Failed to get animals",
            { status: 500 }
        );
    }
};