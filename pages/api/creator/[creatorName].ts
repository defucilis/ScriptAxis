import { PrismaClient } from "@prisma/client";
import { Creator, Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchCreator = async (name: string): Promise<Creator & { scripts: Script[] }> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching creator with data", name);
        const creator = await prisma.creator.findUnique({
            where: {
                name: name,
            },
            include: {
                scripts: true,
            },
        });
        await prisma.$disconnect();
        return creator;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchCreator };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const creator = await FetchCreator(String(req.query.creatorName));
        res.status(200);
        res.json(creator);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
