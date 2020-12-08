import {PrismaClient} from '@prisma/client'

const VerifyEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            const user = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    emailVerified: true
                }
            })
            await prisma.$disconnect();
            resolve(user);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {VerifyEmail}

export default async (req, res) => {
    try {
        const script = await VerifyEmail(req.body.email);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.log("Error fetching script - " + error);
        res.status(400);
        res.json({
            error
        });
    }
};