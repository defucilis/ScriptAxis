import { PrismaClient } from "@prisma/client";
import getUser from "lib/getUser";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const UpdateScript = async (rawData: any): Promise<Script> => {
    //console.log(req.body);
    const prisma = new PrismaClient();

    try {
        console.log("Updating script with data", rawData);

        const transaction = [];

        const id = rawData.id;
        const set = rawData.set || {};
        const remove = rawData.remove || {};
        const add = rawData.add || {};

        const updateData = { ...set };
        if (add.creator) {
            updateData.creator = {
                connectOrCreate: {
                    where: { name: add.creator },
                    create: { name: add.creator },
                },
            };
        }
        if (add.category) {
            updateData.category = {
                connectOrCreate: {
                    where: { name: add.category },
                    create: { name: add.category },
                },
            };
        }

        console.log("Updating script id " + id + " with data", updateData);
        transaction.push(
            prisma.script.update({
                where: { id: id },
                data: updateData,
            })
        );

        //remove one from count of tags that this script is no longer part of
        if (remove.category) {
            console.log("Removing from category", remove.category);
            transaction.push(
                prisma.category.update({
                    where: { name: remove.category },
                    data: {
                        count: { decrement: 1 },
                    },
                })
            );
        }
        //add the script to the category that it is now part of
        if (add.category) {
            console.log("Adding to category", add.category);
            transaction.push(
                prisma.category.update({
                    where: { name: add.category },
                    data: {
                        scripts: { connect: { id: id } },
                        count: { increment: 1 },
                    },
                })
            );
        }

        //remove this script from the script array of its old category (and remove one from its count)
        if (remove.tags) {
            remove.tags.forEach(tag => {
                console.log("Removing tag", tag);
                transaction.push(
                    prisma.tag.update({
                        where: { name: tag },
                        data: { count: { decrement: 1 } },
                    })
                );
            });
        }
        //add this script to the script array of its new category (and add one to its count)
        if (add.tags) {
            add.tags.forEach(tag => {
                console.log("Adding tag", tag);
                transaction.push(
                    prisma.tag.upsert({
                        where: { name: tag },
                        create: { name: tag, count: 1 },
                        update: { count: { increment: 1 } },
                    })
                );
            });
        }

        //If talents were included, add them to the talent table
        if (add.talent) {
            add.talent.forEach(talent => {
                console.log("Adding talent", talent);
                transaction.push(
                    prisma.talent.upsert({
                        where: { name: talent },
                        create: { name: talent },
                        update: {},
                    })
                );
            });
        }

        //If a studio was included, add it to the studio table
        if (add.studio) {
            console.log("Adding studio", add.studio);
            transaction.push(
                prisma.studio.upsert({
                    where: { name: add.studio },
                    create: { name: add.studio },
                    update: {},
                })
            );
        }

        const results: any[] = await prisma.$transaction(transaction);
        await prisma.$disconnect();
        console.log("Results: ", results[0]);
        return results[0];
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const script = await UpdateScript({ ...req.body });
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
