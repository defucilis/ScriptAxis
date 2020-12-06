import {NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from '@prisma/client'

const CreateUser = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const data = req.body;
        const newUser = await prisma.user.create({data});
        res.status(201);
        res.json(newUser)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create user - " + usefulError);
        res.status(500);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.disconnectionPromise;
    }
}

export default CreateUser;