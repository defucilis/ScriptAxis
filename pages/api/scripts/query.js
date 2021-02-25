import { PrismaClient } from "@prisma/client";
import ScriptUtils from "../../../lib/ScriptUtils";

const QueryScripts = ({ filters, sorting, page }) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Querying scripts", { page, sorting, filters });

            let finalWhere = {
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
            if (filters.name) finalWhere.AND.push({ name: filters.name });
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

            if (filters.studio) finalWhere.AND.push({ studio: filters.studio });

            if (filters.sourceUrl) finalWhere.AND.push({ sourceUrl: filters.sourceUrl });
            if (filters.streamingUrl) finalWhere.AND.push({ streamingUrl: filters.streamingUrl });

            if (filters.include) finalWhere.AND.push({ tags: { hasEvery: filters.include } });
            if (filters.exclude) finalWhere.NOT = { tags: { hasSome: filters.exclude } };
            if (filters.talent) finalWhere.AND.push({ talent: { has: filters.talent } });

            let count = await prisma.script.count({
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

            await prisma.$disconnect();
            resolve({ count, scripts });
        } catch (error) {
            await prisma.$disconnect();
            reject(error);
        }
    });
};

export { QueryScripts };

export default async (req, res) => {
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
