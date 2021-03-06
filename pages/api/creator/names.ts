import Database from "lib/Database";
import { NextApiRequest, NextApiResponse } from "next";

const FetchNames = async (): Promise<string[]> => {
    try {
        console.log("Fetching all creator names");
        const creators = await Database.Instance().creator.findMany({
            select: { name: true },
            orderBy: { totalViews: "desc" },
        });
        await Database.disconnect();
        return creators.map(creator => creator.name);
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const names = await FetchNames();
        res.status(200);
        res.json(names);
    } catch (error) {
        console.error("error fetching creator names - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
