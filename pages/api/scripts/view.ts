import Database from "lib/Database";
import { NextApiRequest, NextApiResponse } from "next";

const ViewScript = async (scriptSlug: string): Promise<number> => {
    try {
        console.log("Registering script view for", scriptSlug);
        const updatedScript = await Database.Instance().script.update({
            where: { slug: scriptSlug },
            data: {
                views: { increment: 1 },
                scriptAxisViews: { increment: 1},
            },
        });
        await Database.disconnect();
        return updatedScript.views;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { ViewScript };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const views = await ViewScript(req.body.slug);
        res.status(200);
        res.json(views);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
