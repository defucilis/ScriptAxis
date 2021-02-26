import { PrismaClient } from "@prisma/client";
import { Creator } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const Aggregate = async (): Promise<Creator[]> => {
    const prisma = new PrismaClient();

    const updateCreator = async (creator: Creator) => {
        //Get the creator's most-viewed script for the thumbnail
        const allScripts = await prisma.script.findMany({
            where: {
                creator: {
                    name: creator.name,
                },
            },
        });

        const thumbnail =
            allScripts.length > 0 ? allScripts.sort((a, b) => b.views - a.views)[0].thumbnail : "";

        const aggregations = await prisma.script.aggregate({
            where: {
                creator: {
                    name: creator.name,
                },
            },
            sum: {
                views: true,
                likeCount: true,
            },
        });
        const updatedCreator = await prisma.creator.update({
            where: {
                name: creator.name,
            },
            data: {
                totalViews: aggregations.sum.views,
                totalLikes: aggregations.sum.likeCount,
                thumbnail,
            },
        });
        return updatedCreator;
    };

    try {
        console.log("Running aggregation...");
        const creators = await prisma.creator.findMany();
        const output: Creator[] = [];
        for (let i = 0; i < creators.length; i++) {
            const creator = await updateCreator(creators[i]);
            output.push(creator);
            console.log(`Updated creator ${i + 1} / ${creators.length}`);
        }
        await prisma.$disconnect();
        return output;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { Aggregate };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
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
