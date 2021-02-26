import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const ViewScript = async (scriptSlug: string): Promise<void> => {
    const prisma = new PrismaClient();
    try {
        console.log("Registering script view for", scriptSlug);
        await prisma.script.update({
            where: { slug: scriptSlug },
            data: {
                views: { increment: 1 },
            },
        });
        await prisma.$disconnect();
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { ViewScript };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await ViewScript(req.body.slug);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
