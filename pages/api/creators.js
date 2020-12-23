import {PrismaClient} from '@prisma/client'

const FetchCreators = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Fetching all creators");
            const creators = await prisma.creator.findMany({
                orderBy: {
                    totalViews: "desc"
                },
                include: { scripts: { select: { slug: true } } }
            });
            await prisma.$disconnect();
            resolve(creators);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchCreators}

export default async (req, res) => {
    try {
        const scripts = await FetchCreators();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.error("error fetching creators - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};