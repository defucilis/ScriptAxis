import Database from "lib/Database";
import { ScriptStub } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchSlugs = async (): Promise<ScriptStub[]> => {
    try {
        console.log("Fetching all script slugs");
        const scripts = await Database.Instance().script.findMany({
            select: { id: true, slug: true, name: true, sourceUrl: true },
        });
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchSlugs };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await FetchSlugs();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching script slugs etc - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
