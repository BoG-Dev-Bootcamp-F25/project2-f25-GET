import createUser from "../../../../server/mongodb/actions/createUser";

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { fullName, email, password, admin } = body ?? {};

        if (
            typeof fullName !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof admin !== 'boolean'
        ) {
            return new Response("Invalid input", { status: 400});
        }
        
        await createUser(fullName, email, password, admin);

        return new Response("Success", { status: 200});
    } catch (error) {
        console.error("Error in route", error);
        return new Response("Failed", { status: 500});
    }
};