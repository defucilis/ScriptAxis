import { Prisma, PrismaClient } from "@prisma/client";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchScripts = async (
    amount?: number,
    orderBy?: Prisma.Enumerable<Prisma.ScriptOrderByInput>,
    minDate?: Date
): Promise<Script[]> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching all scripts");
        const findParams: any = {
            where: {
                active: true,
            },
            include: {
                creator: { select: { name: true } },
                owner: { select: { username: true } },
            },
        };
        if (amount) findParams.take = amount;
        if (orderBy) findParams.orderBy = orderBy;
        if (minDate) findParams.where.created = { gte: minDate };

        let scripts = await prisma.script.findMany(findParams);
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            scripts = scripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
        await prisma.$disconnect();
        return scripts;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const amount = req.body && req.body.take ? Number(req.body.take) : undefined;
        const orderBy = req.body && req.body.orderBy ? req.body.orderBy : { created: "desc" };
        const minDate = req.body && req.body.minDate ? new Date(req.body.minDate) : undefined;
        const scripts = await FetchScripts(amount, orderBy, minDate);
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
