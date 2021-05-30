import Database from "lib/Database";
import getUser from "lib/getUser";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const DeleteScript = async (scriptId: number): Promise<Script> => {
    try {
        console.log("Deleting script ", scriptId);

        //we need to fetch the script's tags so that we can decrement the appropriate tags in the database
        const tags = (
            await Database.Instance().script.findUnique({
                where: { id: scriptId },
            })
        ).tags;

        const transaction = [];
        tags.forEach(tag => {
            transaction.push(
                Database.Instance().tag.update({
                    where: { name: tag },
                    data: { count: { decrement: 1 } },
                })
            );
        });
        transaction.push(
            Database.Instance().script.delete({
                where: { id: scriptId },
            })
        );

        const results: any[] = await Database.Instance().$transaction(transaction);
        await Database.disconnect();
        return results[results.length - 1];
    } catch (error) {
        await Database.disconnect();
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
        const deleteStatus = await DeleteScript(Number(req.query.scriptId));
        res.status(201);
        res.json(deleteStatus);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
