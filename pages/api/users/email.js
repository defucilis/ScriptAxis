import {PrismaClient} from '@prisma/client'

const FetchUser = (email) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            const users = await prisma.user.findFirst({
                where: {
                    email: email
                },
                include: {
                    creator: { select: { name: true }}
                }
            });
            await prisma.$disconnect();
            resolve(users);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchUser}

export default async (req, res) => {
    try {
        const script = await FetchUser(req.body.email);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.log("Error fetching script - " + error);
        res.status(400);
        res.json({
            error
        });
    }
};