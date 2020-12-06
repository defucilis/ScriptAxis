import {NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'

const CreateCategory = async (req, res) => {
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const data = req.body;
        const newCategory = await prisma.category.create({data});
        res.status(201);
        res.json(newCategory)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create category - " + usefulError);
        res.status(500);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.disconnectionPromise;
    }
}

export default CreateCategory;