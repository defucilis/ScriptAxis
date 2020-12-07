import {PrismaClient} from '@prisma/client'

const FetchTagsAndCategories = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient(/*{log: ["query"]}*/);
        try {
            let tags = await prisma.tag.findMany();
            tags = tags.sort((a, b) => b.count - a.count);
            let categories = await prisma.category.findMany();
            categories = categories.sort((a, b) => b.count - a.count);
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