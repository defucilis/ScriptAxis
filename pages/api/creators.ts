import { PrismaClient } from "@prisma/client";
import { Creator } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchCreators = async (): Promise<Creator[]> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching all creators");
        const creators = await prisma.creator.findMany({
            orderBy: {
                totalViews: "desc",
            },
            include: { scripts: { select: { slug: true } } },
        });
        await prisma.$disconnect();
        return creators;
    } catch (error) {
        await prisma.$disconnect();
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
