import { PrismaClient } from "@prisma/client";
import { ScriptStub } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const GetAllScripts = async (): Promise<ScriptStub[]> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching all scripts");
        const scripts = await prisma.script.findMany();
        await prisma.$disconnect();
        return scripts;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { GetAllScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await GetAllScripts();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
