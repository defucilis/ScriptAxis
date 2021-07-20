import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { User } from "./types";

const typedUseSession = (): [User, boolean] => {
    const [session, sessionLoading] = useSession();
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(sessionLoading);

    useEffect(() => {
        if (!session) return;

        const untypedSession: any = session;
        let user: User | null = null;
        if (session) user = untypedSession.dbUser;
        setUser(user);
    }, [session]);

    useEffect(() => {
        setLoading(sessionLoading);
    }, [sessionLoading]);

    return [user, loading];
};

export default typedUseSession;
