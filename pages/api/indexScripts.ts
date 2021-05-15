import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchScripts = async (): Promise<{ recentScripts: Script[]; topScripts: Script[] }> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching all scripts");

        let recentScripts = await prisma.script.findMany({
            where: {
                active: true,
            },
            take: 8,
            orderBy: {
                created: "desc",
            },
            include: {
                creator: { select: { name: true } },
                owner: { select: { username: true } },
            },
        });
        let topScripts = await prisma.script.findMany({
            where: {
                active: true,
                created: {
                    gte: dayjs().subtract(1, "week").toDate(),
                },
            },
            take: 8,
            orderBy: {
                likeCount: "desc",
            },
            include: {
                creator: { select: { name: true } },
                owner: { select: { username: true } },
            },
        });
        if (topScripts.length === 0) {
            topScripts = await prisma.script.findMany({
                where: {
                    active: true,
                    created: {
                        gte: dayjs().subtract(1, "month").toDate(),
                    },
                },
                take: 8,
                orderBy: {
                    likeCount: "desc",
                },
                include: {
                    creator: { select: { name: true } },
                    owner: { select: { username: true } },
                },
            });
        }
        if (topScripts.length === 0) {
            topScripts = await prisma.script.findMany({
                where: {
                    active: true,
                    created: {
                        gte: dayjs().subtract(1, "year").toDate(),
                    },
                },
                take: 8,
                orderBy: {
                    likeCount: "desc",
                },
                include: {
                    creator: { select: { name: true } },
                    owner: { select: { username: true } },
                },
            });
        }
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            recentScripts = recentScripts.map(script => ScriptUtils.makeScriptSfw(script));
            topScripts = topScripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
        await prisma.$disconnect();
        return { recentScripts, topScripts };
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await FetchScripts();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
