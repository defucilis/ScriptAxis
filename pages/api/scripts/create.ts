import { PrismaClient } from "@prisma/client";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const CreateScript = async (rawData: any): Promise<Script> => {
    //console.log(req.body);
    const prisma = new PrismaClient();

    try {
        console.log("Creating script with data", rawData);

        const transaction = [];

        //Make sure that the category is included in the tags!
        const tags = [rawData.category, ...rawData.tags];
        const data: any = {
            name: rawData.name,
            slug: rawData.slug,
            //Todo - if we're inserting a new Creator here, we should check to see if it should
            //       be linked to the new user by default - some kind of flag or something...
            creator: {
                connectOrCreate: {
                    where: { name: rawData.creator },
                    create: { name: rawData.creator },
                },
            },
            owner: {
                connect: {
                    id: rawData.owner,
                },
            },
            category: {
                connectOrCreate: {
                    where: { name: rawData.category },
                    create: { name: rawData.category },
                },
            },
            tags: tags,
            thumbnail: rawData.thumbnail,
            description: rawData.description,
            duration: rawData.duration,
            sourceUrl: rawData.sourceUrl,
            streamingUrl: rawData.streamingUrl,
            studio: rawData.studio || undefined,
            talent: rawData.talent,
        };

        //for testing only!
        if (rawData.likeCount) data.likeCount = rawData.likeCount;
        if (rawData.thumbsUp) data.thumbsUp = rawData.thumbsUp;
        if (rawData.thumbsDown) data.thumbsDown = rawData.thumbsDown;
        if (rawData.views) data.views = rawData.views;
        if (rawData.created) data.created = new Date(rawData.created);

        transaction.push(prisma.script.create({ data }));

        //Create or insert any necessary tags
        if (rawData.tags) {
            rawData.tags.forEach(tag => {
                transaction.push(
                    prisma.tag.upsert({
                        where: { name: tag },
                        create: { name: tag, count: 1 },
                        update: { count: { increment: 1 } },
                    })
                );
            });
        }

        //Add the script to its category
        transaction.push(
            prisma.category.update({
                where: { name: rawData.category },
                data: {
                    scripts: { connect: { slug: rawData.slug } },
                    count: { increment: 1 },
                },
            })
        );

        //Add the script to its creator
        transaction.push(
            prisma.creator.update({
                where: { name: rawData.creator },
                data: {
                    scripts: { connect: { slug: rawData.slug } },
                },
            })
        );

        //Add the script to its owner
        transaction.push(
            prisma.user.update({
                where: { id: rawData.owner },
                data: {
                    ownedScripts: { connect: { slug: rawData.slug } },
                },
            })
        );

        //If talents were included, add them to the talent table
        if (rawData.talent) {
            rawData.talent.forEach((talent: string) => {
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
        if (rawData.studio) {
            transaction.push(
                prisma.studio.upsert({
                    where: { name: rawData.studio },
                    create: { name: rawData.studio },
                    update: {},
                })
            );
        }

        const results: any[] = await prisma.$transaction(transaction);
        await prisma.$disconnect();
        return results[0];
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const script = await CreateScript({ ...req.body });
        res.status(201);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
