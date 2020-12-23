import {PrismaClient} from '@prisma/client'

const FetchLists = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Fetching all data lists...");
            console.log("\tFething tags");
            let tags = await prisma.tag.findMany();
            tags = tags.sort((a, b) => b.count - a.count);
            console.log("\tFetching categories");
            let categories = await prisma.category.findMany();
            categories = categories.sort((a, b) => b.count - a.count);
            console.log("\tFetching talent");
            let talent = await prisma.talent.findMany();
            console.log("\tFetching studios");
            let studios = await prisma.studio.findMany();
            console.log("\tFetching creators");
            let creators = await prisma.creator.findMany({
                select: {
                    name: true
                }
            })
            await prisma.$disconnect();
            resolve({tags, categories, talent, studios, creators});
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
        console.error("error fetching tags and categories - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};