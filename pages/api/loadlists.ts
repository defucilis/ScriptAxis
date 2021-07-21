import Database from "lib/Database";
import ScriptUtils from "lib/ScriptUtils";
import { StringListsWithCount } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchLists = async (): Promise<StringListsWithCount> => {
    try {
        let tags = await Database.Instance().tag.findMany();
        tags = tags.sort((a, b) => b.count - a.count);
        let categories = await Database.Instance().category.findMany();
        categories = categories.sort((a, b) => b.count - a.count);
        const talent = await Database.Instance().talent.findMany();
        const studios = await Database.Instance().studio.findMany();
        const creators = await Database.Instance().creator.findMany({
            select: {
                name: true,
            },
        });

        const output = ScriptUtils.parseDatabaseListsWithCount({
            tags,
            categories,
            talent,
            studios,
            creators,
        });
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            output.tags = output.tags.map(tag => ScriptUtils.makeTagCategorySfw(tag));
            output.categories = output.categories.map(category =>
                ScriptUtils.makeTagCategorySfw(category)
            );
            output.talent = output.talent.map(t => ScriptUtils.makeStringSfw(t));
            output.studios = output.studios.map(s => ScriptUtils.makeStringSfw(s));
            output.creators = output.creators.map(c => ScriptUtils.makeStringSfw(c));
        }
        await Database.disconnect();
        return output;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchLists };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await FetchLists();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching tags and categories - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
