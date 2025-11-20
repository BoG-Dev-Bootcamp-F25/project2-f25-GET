import { verifyToken } from "../../../../../server/utils/jwt";
import { cookies } from 'next/headers';

export const GET = async (req: Request): Promise<Response> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }

        const payload = verifyToken(token);

        if (!payload) {
            return new Response("Invalid token", { status: 401 });
        }

        return Response.json(
            {
                user: {
                    id: payload.id,
                    admin: payload.admin,
                    fullName: payload.fullName
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying auth:", error);
        return new Response("Failed", { status: 500 });
    }
};
