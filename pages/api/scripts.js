import {PrismaClient} from '@prisma/client'

const FetchScripts = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Fetching all scripts");
            const scripts = await prisma.script.findMany({
                where: {
                    active: true
                },
                take: 16,
                orderBy: {
                    created: "desc"
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

export {FetchScripts}

export default async (req, res) => {
    try {
        const scripts = await FetchScripts();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};