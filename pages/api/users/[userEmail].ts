import { PrismaClient } from "@prisma/client";
import { UiUser, LeanUser } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchLeanUser = async (email: string): Promise<LeanUser> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching lean user with email", { email });

        //if lean, we only want the slugs of the liked and owned scripts
        //even that might be too much for the 4096kB user cookie

        const users = await prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                creator: { select: { name: true } },
                likedScripts: { select: { slug: true } },
                ownedScripts: { select: { id: true } },
            },
        });
        delete users.savedFilters;
        await prisma.$disconnect();
        return users;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};
const FetchUser = async (email: string): Promise<UiUser> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching user with email", { email });

        //if lean, we only want the slugs of the liked and owned scripts
        //even that might be too much for the 4096kB user cookie
        const scriptSelect = {
            select: {
                slug: true,
                name: true,
                thumbnail: true,
                creator: { select: { name: true } },
            },
        };

        const users = await prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                creator: { select: { name: true } },
                likedScripts: scriptSelect,
                ownedScripts: scriptSelect,
            },
        });
        await prisma.$disconnect();
        return users;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchUser };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const email = String(req.query.userEmail);
        const lean = req.query.lean ? (req.query.lean === "true" ? true : false) : false;
        const script = lean ? await FetchLeanUser(email) : await FetchUser(email);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching user - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
