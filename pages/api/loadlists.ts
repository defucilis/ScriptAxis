import { PrismaClient } from "@prisma/client";
import ScriptUtils from "lib/ScriptUtils";
import { StringListsWithCount } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchLists = async (): Promise<StringListsWithCount> => {
    const prisma = new PrismaClient();
    try {
        let tags = await prisma.tag.findMany();
        tags = tags.sort((a, b) => b.count - a.count);
        let categories = await prisma.category.findMany();
        categories = categories.sort((a, b) => b.count - a.count);
        const talent = await prisma.talent.findMany();
        const studios = await prisma.studio.findMany();
        const creators = await prisma.creator.findMany({
            select: {
                name: true,
            },
        });
        console.log(talent);
        await prisma.$disconnect();
        return ScriptUtils.parseDatabaseListsWithCount({
            tags,
            categories,
            talent,
            studios,
            creators,
        });
    } catch (error) {
        await prisma.$disconnect();
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
