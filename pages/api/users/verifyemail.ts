import { PrismaClient } from "@prisma/client";
import { User } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const VerifyEmail = async (email: string): Promise<User> => {
    const prisma = new PrismaClient();
    try {
        console.log("Registering verified email for user " + email);
        const user = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerified: true,
            },
        });
        await prisma.$disconnect();
        return user;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { VerifyEmail };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await VerifyEmail(req.body.email);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
