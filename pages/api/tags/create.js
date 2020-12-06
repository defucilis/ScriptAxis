import {NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'

const CreateTag = async (req, res) => {
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const data = req.body;
        const newTag = await prisma.tag.create({data});
        res.status(201);
        res.json(newTag)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create tag - " + usefulError);
        res.status(500);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.disconnectionPromise;
    }
}

export default CreateTag;