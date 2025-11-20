import verifyUser from "../../../../../server/mongodb/actions/user/verifyUser";
import { signToken } from "../../../../../server/utils/jwt";
import { cookies } from 'next/headers';

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { email, password } = body ?? {};

        if (
            typeof email !== 'string' ||
            typeof password !== 'string'
        ) {
            return new Response("Invalid input", { status: 400});
        }
        
        const user = await verifyUser(email, password);

        if (!user) {
            return new Response("Invalid creds", { status: 400 });
        }

        const token = signToken({
            id: user._id.toString(),
            admin: user.admin,
            fullName: user.fullName
        });

        const cookieStore = await cookies();
        cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60
        });

        return Response.json({
            success: true
        }, { status: 200});
    } catch (error) {
        console.error("Error in route", error);
        return new Response("Failed", { status: 500});
    }
};

/*
sample usage
POST
http://localhost:3000/api/createUser
{
    "fullName": "Euan Ham",
    "email": "Euanham05@gmail.com",
    "password": "passwordbruh",
    "admin": true
}
*/

