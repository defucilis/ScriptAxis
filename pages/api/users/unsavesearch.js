import {PrismaClient} from '@prisma/client'

const VerifyEmail = (uid, filters) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});

        console.log("USER ID", uid);

        try {
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

export {VerifyEmail}

export default async (req, res) => {
    try {
        const script = await VerifyEmail(req.body.uid, req.body.filters);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};