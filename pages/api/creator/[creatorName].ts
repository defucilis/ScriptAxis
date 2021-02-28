import { PrismaClient } from "@prisma/client";
import ScriptUtils from "lib/ScriptUtils";
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
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            creator.scripts = creator.scripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
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
        console.error("error fetching creator - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
