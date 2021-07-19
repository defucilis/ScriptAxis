import { NextApiRequest, NextApiResponse } from "next";
import Database from "lib/Database";
import { roleIsAdmin } from "lib/types";

const createFirstAdmin = async (auth: string) => {
    if (!auth || auth != process.env.NEXT_PUBLIC_FIRST_ADMIN_AUTH)
        throw new Error("Authentication not provided for creating first admin");

    const users = await Database.Instance().user.findMany();
    if (users.length !== 1) throw new Error("There must be exactly one user in the database");
    if (!roleIsAdmin(users[0].role)) throw new Error("The database user is already an admin");

    console.log("Setting only user's admin status to true");

    users[0].role = "ADMIN";
    users[0].name = "defucilis";
    await Database.Instance().user.update({
        where: {
            id: users[0].id,
        },
        data: {
            role: "ADMIN",
            name: "defucilis",
        },
    });
    await Database.disconnect();
    return users[0];
};
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await createFirstAdmin(String(req.query.auth));
        res.statusCode = 200;
        res.json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.statusCode = error.statusCode || 200;
        res.json(error);
    }
};
