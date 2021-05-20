import { IncomingMessage } from "http";
import { getSession } from "next-auth/client";
import { User } from "./types";

type incomingRequest = IncomingMessage & {
    cookies?: {
        [key: string]: any;
    };
};
const getUser = async (req: incomingRequest): Promise<User> => {
    //note - the any here is necessary - the type definition for a session doesn't allow additional params,
    //even though they can be injected using custom callbacks in the next-auth configuration
    //(which is what we're doing to get the database user)
    const session: any = await getSession({ req });
    let user: User | null = null;
    if (session) user = session.dbUser;
    return user;
};

export default getUser;
