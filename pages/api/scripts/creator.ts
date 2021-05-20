import Database from "lib/Database";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchCreatorScripts = async (name: string): Promise<Script[]> => {
    try {
        console.log("Fetching scripts belonging to creator", name);
        let scripts = await Database.Instance()
            .creator.findUnique({
                where: {
                    name: name,
                },
            })
            .scripts({
                include: {
                    creator: { select: { name: true } },
                    owner: { select: { name: true } },
                },
            });
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            scripts = scripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchCreatorScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await FetchCreatorScripts(req.body.name);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
