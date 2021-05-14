import { PrismaClient } from "@prisma/client";
import { Query, Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import ScriptUtils from "../../../lib/ScriptUtils";

const QueryScripts = async ({
    filters,
    sorting,
    page,
}: Query): Promise<{ count: number; scripts: Script[] }> => {
    const prisma = new PrismaClient();
    try {
        console.log("Querying scripts", { page, sorting, filters });

        const finalWhere: any = {
            AND: [
                {
                    active: {
                        equals: true,
                    },
                },
            ],
        };

        console.log(filters);

        //these are set directly from UI
        if (filters.name) finalWhere.AND.push({ searchString: filters.name });
        if (filters.category) finalWhere.AND.push({ category: filters.category });

        //duration needs to be split into two checks for min and max
        if (filters.minDuration)
            finalWhere.AND.push({
                duration: { gte: ScriptUtils.indexToDuration(Number(filters.minDuration)) },
            });
        if (filters.maxDuration)
            finalWhere.AND.push({
                duration: { lte: ScriptUtils.indexToDuration(Number(filters.maxDuration)) },
            });

        if (filters.minSpeed)
            finalWhere.AND.push({
                averageSpeed: { gte: ScriptUtils.indexToSpeed(Number(filters.minSpeed)) },
            });
        if (filters.maxSpeed)
            finalWhere.AND.push({
                averageSpeed: { lte: ScriptUtils.indexToSpeed(Number(filters.maxSpeed)) },
            });

        if (filters.studio) finalWhere.AND.push({ studio: filters.studio });

        if (filters.sourceUrl) finalWhere.AND.push({ sourceUrl: filters.sourceUrl });
        if (filters.streamingUrl) finalWhere.AND.push({ streamingUrl: filters.streamingUrl });

        if (filters.include) finalWhere.AND.push({ tags: { hasEvery: filters.include } });
        if (filters.exclude) finalWhere.NOT = { tags: { hasSome: filters.exclude } };
        if (filters.talent) finalWhere.AND.push({ talent: { has: filters.talent } });

        //if we're sorting by speed, we also therefore need to ensure that only scripts WITH a speed value are returned
        if (
            sorting.findIndex(s => !!s.averageSpeed) !== -1 &&
            !(filters.maxSpeed || filters.minSpeed)
        ) {
            finalWhere.AND.push({
                averageSpeed: {
                    gte: 0,
                },
            });
        }

        const count = await prisma.script.count({
            where: finalWhere,
        });

        let scripts = await prisma.script.findMany({
            skip: page && page > 1 ? 18 * (page - 1) : 0,
            take: 18,
            where: finalWhere,
            orderBy: sorting,
            include: {
                creator: { select: { name: true } },
                owner: { select: { username: true } },
            },
        });

        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            scripts = scripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
        await prisma.$disconnect();
        return { count, scripts };
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { QueryScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log("Request Body", req.body);
    try {
        const output = await QueryScripts(req.body);
        res.status(200);
        res.json(output);
    } catch (error) {
        console.error("error fetching scripts - " + error.message);
        res.json({
            error: { message: error.message },
        });
    }
};
