import {PrismaClient} from '@prisma/client'

const ViewScript = (scriptSlug) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            const result = await prisma.script.update({
                where: {slug: scriptSlug},
                data: {
                    views: { increment: 1 }
                }
            });
            resolve(result);
            await prisma.$disconnect();
            resolve(user);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {ViewScript}

export default async (req, res) => {
    try {
        const script = await ViewScript(req.body.slug);
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