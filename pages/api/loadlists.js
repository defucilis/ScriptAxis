import {PrismaClient} from '@prisma/client'

const FetchLists = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            let tags = await prisma.tag.findMany();
            tags = tags.sort((a, b) => b.count - a.count);
            let categories = await prisma.category.findMany();
            categories = categories.sort((a, b) => b.count - a.count);
            let talent = await prisma.talent.findMany();
            let studios = await prisma.studio.findMany();
            await prisma.$disconnect();
            resolve({tags, categories, talent, studios});
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchLists}

export default async (req, res) => {
    try {
        const scripts = await FetchLists();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.log("Error fetching tags and categories - " + error);
        res.status(400);
        res.json({
            error
        });
    }
};