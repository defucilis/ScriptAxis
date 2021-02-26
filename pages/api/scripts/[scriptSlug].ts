import { PrismaClient } from "@prisma/client";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchScript = async (slug: string, noview = false): Promise<Script> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching script", { slug, noview });
        const where = {
            slug: slug,
            active: true,
        };
        const include = {
            creator: { select: { name: true } },
            owner: { select: { username: true, id: true } },
        };
        const promise = noview
            ? prisma.script.findFirst({ where, include })
            : prisma.script.update({
                  where: { slug },
                  include,
                  data: {
                      views: { increment: 1 },
                  },
              });

        const scripts = await promise;
        await prisma.$disconnect();
        return scripts;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchScript };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const slug = String(req.query.scriptSlug);
        const noview = req.query.noview
            ? String(req.query.noview) === "true"
                ? true
                : false
            : false;
        const script = await FetchScript(slug, noview);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
