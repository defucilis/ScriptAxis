import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const SetSavedSearches = async (uid: string, filters: string): Promise<any> => {
    const prisma = new PrismaClient();

    try {
        console.log("Setting saved searches for user " + uid, filters);
        const response = await prisma.user.update({
            where: {
                id: uid,
            },
            data: {
                savedFilters: filters,
            },
        });

        await prisma.$disconnect();
        return response;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { SetSavedSearches };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await SetSavedSearches(req.body.uid, req.body.filters);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
