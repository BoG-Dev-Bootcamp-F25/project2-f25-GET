import readTrainingLogs from "../../../../../server/mongodb/actions/admin/readTrainingLogs";

export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const trainingLogs = await readTrainingLogs();
        
        return Response.json(trainingLogs, { status: 200 });
    } catch (error) {
        console.error("get training logs error:", error);
        return new Response("Failed to fetch training logs", { status: 500 });
    }
};