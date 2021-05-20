import axios from "axios";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { UiUser, User } from "./types";

const uiUseSession = (): [UiUser, boolean] => {
    const [session, sessionLoading] = useSession();
    const [user, setUser] = useState<UiUser>(null);
    const [loading, setLoading] = useState(sessionLoading);

    useEffect(() => {
        const loadUserData = async (email: string) => {
            const fullUserValue: UiUser = (await axios(`/api/users/${email}`)).data;
            setUser(fullUserValue);
            setLoading(false);
        };

        if (!session) return;
        if (sessionLoading) setLoading(true);

        const untypedSession: any = session;
        let user: User | null = null;
        if (session) user = untypedSession.dbUser;
        if (user) loadUserData(user.email);
    }, [session, sessionLoading]);

    return [user, loading];
};

export default uiUseSession;
