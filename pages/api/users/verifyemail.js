import {PrismaClient} from '@prisma/client'

const VerifyEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Registering verified email for user " + email);
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
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};