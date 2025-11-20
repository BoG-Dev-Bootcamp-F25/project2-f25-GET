import { NextResponse } from 'next/server';
import readUsers from "../../../../../server/mongodb/actions/admin/readUsers";

export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const users = await readUsers();
        
        return Response.json(users, { status: 200 });
    } catch (error) {
        console.error("get users error:", error);
        return new Response("Failed to fetch users", { status: 500 });
    }
};