import { PrismaClient } from "@prisma/client";
import getUser from "lib/getUser";
import { NextApiRequest, NextApiResponse } from "next";

interface UpdateCreatorOutput {
    creatorName: string;
    totalViews: number;
    totalLikes: number;
    thumbnail: string;
}

const UpdateCreator = async (creatorName: string): Promise<UpdateCreatorOutput> => {
    const prisma = new PrismaClient();

    //Get the creator's most-viewed script for the thumbnail
    const allScripts = await prisma.script.findMany({
        where: {
            creator: {
                name: creatorName,
            },
        },
    });

    const thumbnail =
        allScripts.length > 0 ? allScripts.sort((a, b) => b.views - a.views)[0].thumbnail : "";

    const aggregations = await prisma.script.aggregate({
        where: {
            creator: {
                name: creatorName,
            },
        },
        sum: {
            views: true,
            likeCount: true,
        },
    });
    const updatedCreator = await prisma.creator.update({
        where: {
            name: creatorName,
        },
        data: {
            totalViews: aggregations.sum.views,
            totalLikes: aggregations.sum.likeCount,
            thumbnail,
        },
    });

    await prisma.$disconnect();

    return {
        creatorName: creatorName,
        totalViews: updatedCreator.totalViews,
        totalLikes: updatedCreator.totalLikes,
        thumbnail: updatedCreator.thumbnail,
    };
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const creator = await UpdateCreator(String(req.query.creatorName));
        res.status(200);
        res.json(creator);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
