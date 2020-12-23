import {PrismaClient} from '@prisma/client'

const FetchSlugs = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Fetching all script slugs");
            let scripts = await prisma.script.findMany({select: { id: true, slug: true, name: true}});
            await prisma.$disconnect();
            resolve(scripts);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchSlugs}

export default async (req, res) => {
    try {
        const scripts = await FetchSlugs();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.error("error fetching script slugs etc - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};