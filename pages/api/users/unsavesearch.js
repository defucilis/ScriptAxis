import {PrismaClient} from '@prisma/client'

const SetSavedSearches = (uid, filters) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();

        try {
            console.log("Setting saved searches for user " + uid, filters);
            const response = await prisma.user.update({
                where: {
                    id: uid
                },
                data: {
                    savedFilters: filters
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

export {SetSavedSearches}

export default async (req, res) => {
    try {
        const script = await SetSavedSearches(req.body.uid, req.body.filters);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};