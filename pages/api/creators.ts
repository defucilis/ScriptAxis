import Database from "lib/Database";
import ScriptUtils from "lib/ScriptUtils";
import { Creator } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchCreators = async (): Promise<Creator[]> => {
    try {
        console.log("Fetching all creators");
        let creators = await Database.Instance().creator.findMany({
            orderBy: {
                totalViews: "desc",
            },
            include: { scripts: { select: { slug: true } } },
        });
        await Database.disconnect();
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            creators = creators.map(creator => ({
                ...creator,
                thumbnail: "/img/placeholder-thumbnail.png",
                name: ScriptUtils.makeStringSfw(creator.name),
            }));
        }
        return creators;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchCreators };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await FetchCreators();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching creators - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
