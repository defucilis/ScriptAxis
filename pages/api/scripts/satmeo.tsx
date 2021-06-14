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
        methods: ["GET"],
        //origin: https://domaintbd.com
    })
);

const FetchScripts = async (): Promise<Script[]> => {
    try {
        console.log("Fetching scripts for satmeo");
        const findParams: any = {
            where: {
                active: true,
            },
            select: {
                id: true,
                sourceUrl: true,
                streamingUrl: true,
                name: true,
                talent: true,
                tags: true,
                createdAt: true,
                updatedAt: true,
                categoryName: true,
                creatorName: true,
            },
        };

        const scripts = await Database.Instance().script.findMany(findParams);
        await Database.disconnect();
        return scripts;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const auth = String(req.query.auth);
    if(auth !== process.env.NEXT_PUBLIC_API_KEY_SATMEO) {
        res.status(403);
        res.json({
            error: "Invalid API Key"
        });
        return;
    }
    await cors(req, res);
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
