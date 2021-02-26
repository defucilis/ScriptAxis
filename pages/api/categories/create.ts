import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const CreateCategory = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const prisma = new PrismaClient();

    try {
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
