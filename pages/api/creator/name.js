import {PrismaClient} from '@prisma/client'

const FetchCreator = (name) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            const creator = await prisma.creator
                .findUnique({
                    where: {
                        name: name
                    },
                    include: {
                        scripts: true
                    }
                });
            await prisma.$disconnect();
            resolve(creator);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchCreator}

export default async (req, res) => {
    try {
        const script = await FetchCreator(req.body.name);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};