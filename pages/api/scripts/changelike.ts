import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const ChangeLike = async (
    scriptSlug: string,
    userId: string,
    creatorName: string,
    isLiked: boolean
): Promise<void> => {
    const prisma = new PrismaClient();
    try {
        console.log("Setting scriptLiked to " + isLiked, { scriptSlug, userId, creatorName });
        const transaction = [];
        //add or remove the script from the user's liked scripts
        transaction.push(
            prisma.user.update({
                where: { id: userId },
                data: {
                    likedScripts: isLiked
                        ? { connect: { slug: scriptSlug } }
                        : { disconnect: { slug: scriptSlug } },
                },
            })
        );

        //add or remove the user from the script's "liked by" list
        //and update its likeCount
        transaction.push(
            prisma.script.update({
                where: { slug: scriptSlug },
                data: isLiked
                    ? {
                          likeCount: { increment: 1 },
                      }
                    : {
                          likeCount: { decrement: 1 },
                      },
            })
        );

        transaction.push(
            prisma.creator.update({
                where: { name: creatorName },
                data: {
                    totalLikes: isLiked ? { increment: 1 } : { decrement: 1 },
                },
            })
        );

        transaction.push();
        const results: any[] = await prisma.$transaction(transaction);
        await prisma.$disconnect();
        return results[1].likeCount;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { ChangeLike };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const newLikeCount = await ChangeLike(
            req.body.slug,
            req.body.uid,
            req.body.creator,
            req.body.isLiked
        );
        res.status(200);
        res.json({ newLikeCount });
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
