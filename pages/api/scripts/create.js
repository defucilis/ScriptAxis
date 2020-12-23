import {PrismaClient} from '@prisma/client'

const CreateScript = async (req, res) => {
    //console.log(req.body);
    const prisma = new PrismaClient();

    try {
        console.log("Creating script with data", req.body);

        let transaction = [];
        
        //Create the script object
        const rawData = req.body;

        //Make sure that the category is included in the tags!
        const tags = [rawData.category, ...rawData.tags];
        let data = {
            name: rawData.name,
            slug: rawData.slug,
            //Todo - if we're inserting a new Creator here, we should check to see if it should
            //       be linked to the new user by default - some kind of flag or something...
            creator: { connectOrCreate : {
                where: {name: rawData.creator},
                create: {name: rawData.creator}
            }},
            owner: { connect : {
                id: rawData.owner
            }},
            category: {connectOrCreate : {
                where: {name: rawData.category},
                create: {name: rawData.category}
            }},
            tags: tags,
            thumbnail: rawData.thumbnail,
            description: rawData.description,
            duration: rawData.duration,
            sourceUrl: rawData.sourceUrl,
            streamingUrl: rawData.streamingUrl,
            studio: rawData.studio || undefined,
            talent: rawData.talent,
        }

        //for testing only!
        if(rawData.likeCount) data.likeCount = rawData.likeCount;
        if(rawData.thumbsUp) data.thumbsUp = rawData.thumbsUp;
        if(rawData.thumbsDown) data.thumbsDown = rawData.thumbsDown;
        if(rawData.views) data.views = rawData.views;
        if(rawData.created) data.created = new Date(rawData.created);

        transaction.push(prisma.script.create({data}));

        //Create or insert any necessary tags
        if(rawData.tags) {
            rawData.tags.forEach(tag => {
                transaction.push(prisma.tag.upsert({
                    where: { name: tag },
                    create: { name: tag, count: 1 },
                    update: { count: { increment: 1 }}
                }))
            })
        }

        //Add the script to its category
        transaction.push(prisma.category.update({
            where: {name: rawData.category},
            data: {
                scripts: { connect: {slug: rawData.slug} },
                count: { increment: 1 }
            }
        }))

        //Add the script to its creator
        transaction.push(prisma.creator.update({
            where: {name: rawData.creator},
            data: {
                scripts: { connect: {slug: rawData.slug} }
            }
        }))

        //Add the script to its owner
        transaction.push(prisma.user.update({
            where: {id: rawData.owner},
            data: {
                ownedScripts: { connect: {slug: rawData.slug} }
            }
        }))

        //If talents were included, add them to the talent table
        if(rawData.talent) {
            rawData.talent.forEach(talent => {
                transaction.push(prisma.talent.upsert({
                    where: {name: talent},
                    create: {name: talent},
                    update: {}
                }))
            });
        }

        //If a studio was included, add it to the studio table
        if(rawData.studio) {
            transaction.push(prisma.studio.upsert({
                where: {name: rawData.studio},
                create: {name: rawData.studio},
                update: {}
            }))
        };

        const results = await prisma.$transaction(transaction);

        res.status(201);
        res.json(results)
    } catch(error) {
        console.log("Failed to create script", error.message);
        res.json({
            error: { message: error.message }
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateScript;