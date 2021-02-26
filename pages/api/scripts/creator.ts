import { PrismaClient } from "@prisma/client";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchCreatorScripts = async (name: string): Promise<Script[]> => {
    const prisma = new PrismaClient();
        try {
            console.log("Fetching scripts belonging to creator", name);
            const scripts = await prisma.creator
                .findUnique({
                    where: {
                        name: name,
                    },
                })
                .scripts({
                    include: {
                        creator: { select: { name: true } },
                        owner: { select: { username: true } },
                    },
                });
            await prisma.$disconnect();
            return scripts;
        } catch (error) {
            await prisma.$disconnect();
            throw error;
        }
};

export { FetchCreatorScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await FetchCreatorScripts(req.body.name);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
