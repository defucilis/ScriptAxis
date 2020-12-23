import {PrismaClient} from '@prisma/client'

const SaveSearch = (uid, searchString) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();

        try {
            console.log("Saving search query for user " + uid, searchString);
            const currentSavedFilters = (await prisma.user.findFirst({
                where: {
                    id: uid
                },
                select: {
                    savedFilters: true
                }
            })).savedFilters;

            const exists = currentSavedFilters.findIndex(f => f === searchString) !== -1;
            if(exists) {
                await prisma.$disconnect();
                resolve(currentSavedFilters);
                return;
            }

            const response = await prisma.user.update({
                where: {
                    id: uid
                },
                data: {
                    savedFilters: [...currentSavedFilters, searchString]
                }
            })
            
            await prisma.$disconnect();
            resolve(response);
        } catch(error) {
            reject(error);
            await prisma.$disconnect();
        }
    })
}

export {SaveSearch}

export default async (req, res) => {
    try {
        const script = await SaveSearch(req.body.uid, req.body.searchString);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};