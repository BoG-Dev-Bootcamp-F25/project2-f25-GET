import verifyUser from "../../../../../server/mongodb/actions/user/verifyUser";

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

        return Response.json({
            id: user._id,
            admin: user.admin,
            fullName: user.fullName
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

