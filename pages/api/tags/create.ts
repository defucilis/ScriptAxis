import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const CreateTag = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const prisma = new PrismaClient();

    try {
        const data = req.body;
        console.log("Creating new tag", data);
        const newTag = await prisma.tag.create({ data });
        res.status(201);
        res.json(newTag);
    } catch (error) {
        console.log("Failed to create tag - " + error);
        res.json({
            error: { message: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
};

export default CreateTag;
