import Database from "lib/Database";
import getUser from "lib/getUser";
import { Creator, roleIsAdmin } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const Aggregate = async (): Promise<Creator[]> => {
    const updateCreator = async (creator: Creator) => {
        //Get the creator's most-viewed script for the thumbnail
        const allScripts = await Database.Instance().script.findMany({
            where: {
                creator: {
                    name: creator.name,
                },
            },
        });

        //Remove duplicates
        const uniqueScripts = [];
        let totalViews = 0;
        let totalLikes = 0;
        allScripts.forEach(script => {
            if (uniqueScripts.findIndex(s => s.sourceUrl === script.sourceUrl)) return;
            uniqueScripts.push(script);
            totalViews += script.views;
            totalLikes += script.likeCount;
        });

        const thumbnail =
            uniqueScripts.length > 0
                ? uniqueScripts.sort((a, b) => b.views - a.views)[0].thumbnail
                : "";

        const updatedCreator = await Database.Instance().creator.update({
            where: {
                name: creator.name,
            },
            data: {
                totalViews,
                totalLikes,
                thumbnail,
            },
        });
        return updatedCreator;
    };

    try {
        console.log("Running aggregation...");
        const creators = await Database.Instance().creator.findMany();
        const output: Creator[] = [];
        for (let i = 0; i < creators.length; i++) {
            const creator = await updateCreator(creators[i]);
            output.push(creator);
            console.log(`Updated creator ${i + 1} / ${creators.length}`);
        }
        await Database.disconnect();
        return output;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { Aggregate };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !roleIsAdmin(user.role)) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await Aggregate();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching tags and categories - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
