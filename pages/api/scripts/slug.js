import {PrismaClient} from '@prisma/client'

const FetchScript = (slug) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient(/*{log: ["query"]}*/);
        try {
            const scripts = await prisma.script.findFirst({
                where: {
                    slug: slug,
                    active: true
                },
                include: {
                    creator: { select: { name: true }},
                    owner: { select: { username: true }}
                }
            });
            await prisma.$disconnect();
            resolve(scripts);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchScript}

export default async (req, res) => {
    try {
        const script = await FetchScript();
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