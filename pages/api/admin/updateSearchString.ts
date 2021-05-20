import { PrismaClient } from "@prisma/client";
import getUser from "lib/getUser";

import ScriptUtils from "lib/ScriptUtils";
import { NextApiRequest, NextApiResponse } from "next";

const UpdateSearchString = async (scriptSlug: string) => {
    const prisma = new PrismaClient();
    try {
        const script = await prisma.script.findUnique({
            where: {
                slug: scriptSlug,
            },
        });
        if (!script) throw new Error("Script not found for slug " + scriptSlug);

        const searchString = ScriptUtils.getSearchString(script);

        const output = await prisma.script.update({
            where: {
                slug: scriptSlug,
            },
            data: {
                searchString,
            },
        });
        await prisma.$disconnect();
        return output;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await UpdateSearchString(String(req.query.slug));
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error scraping script metadata from eroscripts", error);
        res.json({
            error: { message: error.message },
        });
    }
};
