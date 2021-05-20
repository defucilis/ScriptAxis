import { PrismaClient } from "@prisma/client";
import getUser from "lib/getUser";
import { NextApiRequest, NextApiResponse } from "next";

const CreateCategory = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const prisma = new PrismaClient();

    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const data = req.body;
        console.log("Creating category with data", req.body);
        const newCategory = await prisma.category.create({ data });
        res.status(201);
        res.json(newCategory);
    } catch (error) {
        res.json({
            error: { message: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
};

export default CreateCategory;
