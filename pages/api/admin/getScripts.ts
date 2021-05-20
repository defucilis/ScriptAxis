import Database from "lib/Database";
import getUser from "lib/getUser";
import { ScriptStub } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const GetAllScripts = async (): Promise<ScriptStub[]> => {
    try {
        console.log("Fetching all scripts");
        const scripts = await Database.Instance().script.findMany();
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { GetAllScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await GetAllScripts();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
