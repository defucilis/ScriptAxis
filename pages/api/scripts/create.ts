import Database from "lib/Database";
import getUser from "lib/getUser";
import { roleIsCreator, Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import { GetScrapedInfo } from "../admin/scrape";

export const getUniqueScriptSlug = async (slugPrefix: string): Promise<string> => {
    try {
        //get entries that start with the given slug
        //note that they don't necessarily represent equal slugs
        //for example "test-work" and "test-work-continues" both begin with "test-work"
        //so the new slug should be "test-work-1" not "test-work-2"
        const existingSlugs = (
            await Database.Instance().script.findMany({
                where: {
                    slug: {
                        startsWith: slugPrefix,
                    },
                },
                select: {
                    slug: true,
                },
            })
        )
            .map(obj => obj.slug)
            .filter(slug => {
                const suffix = slug.substring(slugPrefix.length);
                //if the slug is literally the prefix, then it counts
                if (suffix.length === 0) return true;
                //if the slug continues (e.g. test-worky) then it doesn't count
                if (suffix[0] !== "-") return false;
                //if everything after the hyphen is a number, then it counts
                return !isNaN(Number(suffix.substring(1)));
            });
        if (existingSlugs.length === 0) return slugPrefix;

        let validSlugNumber = 1;
        while (existingSlugs.indexOf(`${slugPrefix}-${validSlugNumber}`) !== -1) {
            validSlugNumber++;
        }
        return `${slugPrefix}-${validSlugNumber}`;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

const CreateScript = async (rawData: any): Promise<Script> => {
    try {
        console.log("Creating script with data", rawData);

        const transaction = [];

        //make sure that slug is unique by appending numbers if necessary
        rawData.slug = await getUniqueScriptSlug(rawData.slug);

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

        if (rawData.sourceUrl.includes("discuss.eroscripts.com")) {
            try {
                console.log("Scraping data from EroScripts");
                const scrapedData = await GetScrapedInfo(rawData.sourceUrl);
                data.views = scrapedData.views;
                data.likeCount = scrapedData.likeCount;
                data.createdAt = scrapedData.createdAt;
            } catch (error) {
                console.error(error);
            }
        }

        console.log(data);

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
        if (!user || !roleIsCreator(user.role)) {
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
