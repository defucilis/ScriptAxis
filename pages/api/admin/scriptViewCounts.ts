import Database from "lib/Database";
import getUser from "lib/getUser";
import { NextApiRequest, NextApiResponse } from "next";

const GetScriptViews = async (): Promise<
    { id: number; name: string; categoryName: string; scriptAxisViews: number }[]
> => {
    try {
        console.log("Fetching scripts by views");
        const scripts = await Database.Instance().script.findMany({
            select: {
                id: true,
                name: true,
                categoryName: true,
                scriptAxisViews: true,
            },
            orderBy: {
                scriptAxisViews: "desc",
            },
        });
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await GetScriptViews();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
