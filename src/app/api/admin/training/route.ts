import readTrainingLogs from "../../../../../server/mongodb/actions/admin/readTrainingLogs";

export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const { searchParams } = new URL(req.url);
        const lastId = searchParams.get('lastId') ?? undefined;
        const limit = parseInt(searchParams.get('limit') ?? '4');

        const trainingLogs = await readTrainingLogs(lastId, limit);
        
        return Response.json(trainingLogs, { status: 200 });
    } catch (error) {
        console.error("get training logs error:", error);
        return new Response("Failed to fetch training logs", { status: 500 });
    }
};