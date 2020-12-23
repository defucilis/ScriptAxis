import {PrismaClient} from '@prisma/client'

const ViewScript = (scriptSlug) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Registering script view for", scriptSlug);
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
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};