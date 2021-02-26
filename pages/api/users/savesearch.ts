import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const SaveSearch = async (uid: string, searchString: string): Promise<any> => {
    const prisma = new PrismaClient();

    try {
        console.log("Saving search query for user " + uid, searchString);
        const currentSavedFilters = (
            await prisma.user.findFirst({
                where: {
                    id: uid,
                },
                select: {
                    savedFilters: true,
                },
            })
        ).savedFilters;

        const exists = currentSavedFilters.findIndex(f => f === searchString) !== -1;
        if (exists) {
            await prisma.$disconnect();
            return currentSavedFilters
            return;
        }

        const response = await prisma.user.update({
            where: {
                id: uid,
            },
            data: {
                savedFilters: [...currentSavedFilters, searchString],
            },
        });

        await prisma.$disconnect();
        return response;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { SaveSearch };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await SaveSearch(req.body.uid, req.body.searchString);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
