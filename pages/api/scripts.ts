import { Prisma } from "@prisma/client";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import Database from "lib/Database";

const initMiddleware = middleware => {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, result => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
};

const cors = initMiddleware(
    Cors({
        methods: ["POST"],
    })
);

const FetchScripts = async (
    amount?: number,
    orderBy?: Prisma.Enumerable<Prisma.ScriptOrderByInput>,
    minDate?: Date
): Promise<Script[]> => {
    try {
        console.log("Fetching all scripts");
        const findParams: any = {
            where: {
                active: true,
            },
            include: {
                creator: { select: { name: true } },
                owner: { select: { name: true } },
            },
        };
        if (amount) findParams.take = amount;
        if (orderBy) findParams.orderBy = orderBy;
        if (minDate) findParams.where.createdAt = { gte: minDate };

        let scripts = await Database.Instance().script.findMany(findParams);
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            scripts = scripts.map(script => ScriptUtils.makeScriptSfw(script));
        }
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await cors(req, res);
    try {
        const amount = req.body && req.body.take ? Number(req.body.take) : undefined;
        const orderBy = req.body && req.body.orderBy ? req.body.orderBy : { createdAt: "desc" };
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
