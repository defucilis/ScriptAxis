import Database from "lib/Database";
import getUser from "lib/getUser";
import { roleIsModerator } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const CreateTag = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !roleIsModerator(user.role)) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const data = req.body;
        console.log("Creating new tag", data);
        const newTag = await Database.Instance().tag.create({ data });
        res.status(201);
        res.json(newTag);
    } catch (error) {
        console.log("Failed to create tag - " + error);
        res.json({
            error: { message: error.message },
        });
    } finally {
        await Database.disconnect();
    }
};

export default CreateTag;
