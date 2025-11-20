import { cookies } from 'next/headers';

export const POST = async (): Promise<Response> => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('auth-token');
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error logging out:", error);
        return new Response("Failed", { status: 500 });
    }
};