import {PrismaClient} from '@prisma/client'

const FetchTagsAndCategories = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient(/*{log: ["query"]}*/);
        try {
            const tags = await prisma.tag.findMany();
            const categories = await prisma.category.findMany();
            await prisma.$disconnect();
            resolve({tags, categories});
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchTagsAndCategories}

export default async (req, res) => {
    try {
        const scripts = await FetchTagsAndCategories();
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