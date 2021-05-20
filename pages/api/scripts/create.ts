import Database from "lib/Database";
import getUser from "lib/getUser";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const CreateScript = async (rawData: any): Promise<Script> => {
    try {
        console.log("Creating script with data", rawData);

        const transaction = [];

        //Make sure that the category is included in the tags!
        const tags = [rawData.category, ...rawData.tags];
        const data: any = {
            name: rawData.name,
            slug: rawData.slug,
            searchString: rawData.searchString,
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
        if (rawData.createdAt) data.createdAt = new Date(rawData.createdAt);
        if (rawData.funscript) data.funscript = rawData.funscript;
        if (rawData.averageSpeed) data.averageSpeed = rawData.averageSpeed;

        transaction.push(Database.Instance().script.create({ data }));

        //Create or insert any necessary tags
        if (rawData.tags) {
            rawData.tags.forEach(tag => {
                transaction.push(
                    Database.Instance().tag.upsert({
                        where: { name: tag },
                        create: { name: tag, count: 1 },
                        update: { count: { increment: 1 } },
                    })
                );
            });
        }

        //Add the script to its category
        transaction.push(
            Database.Instance().category.update({
                where: { name: rawData.category },
                data: {
                    scripts: { connect: { slug: rawData.slug } },
                    count: { increment: 1 },
                },
            })
        );

        //Add the script to its creator
        transaction.push(
            Database.Instance().creator.update({
                where: { name: rawData.creator },
                data: {
                    scripts: { connect: { slug: rawData.slug } },
                },
            })
        );

        //Add the script to its owner
        transaction.push(
            Database.Instance().user.update({
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
                    Database.Instance().talent.upsert({
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
                Database.Instance().studio.upsert({
                    where: { name: rawData.studio },
                    create: { name: rawData.studio },
                    update: {},
                })
            );
        }

        const results: any[] = await Database.Instance().$transaction(transaction);
        await Database.disconnect();
        return results[0];
    } catch (error) {
        await Database.disconnect();
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
