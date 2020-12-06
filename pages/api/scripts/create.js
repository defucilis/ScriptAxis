import {PrismaClient} from '@prisma/client'

const CreateScript = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient(/*{log: ["query"]}*/);

    try {
        let transaction = [];
        
        //Create the script object
        const rawData = req.body;
        transaction.push(prisma.script.create({data: {
            name: rawData.name,
            slug: rawData.slug,
            creator: { connectOrCreate : {
                where: {name: rawData.creator},
                create: {name: rawData.creator}
            }},
            owner: { connect : {
                username: rawData.owner
            }},
            category: {connectOrCreate : {
                where: {name: rawData.category},
                create: {name: rawData.category}
            }},
            tags: !rawData.tags || rawData.tags.length === 0 
                ? undefined 
                : { 
                    connectOrCreate: rawData.tags.map(tagName => {
                        return {
                            where: { name: tagName },
                            create: { name: tagName }
                        }
                    })
                },
            thumbnail: rawData.thumbnail,
            sourceUrl: rawData.sourceUrl
        }}));

        //Add the script to each of its tags
        rawData.tags.forEach(tag => {
            transaction.push(prisma.tag.update({
                where: {name: tag},
                data: {
                    scripts: { connect: {slug: rawData.slug} },
                    count: { increment: 1 }
                }
            }));
        });

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
        transaction.push(prisma.creator.update({
            where: {username: rawData.owner},
            data: {
                ownedScripts: { connect: {slug: rawData.slug} }
            }
        }))

        const results = await prisma.$transaction(transaction);

        res.status(201);
        res.json(results)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create script - " + usefulError);
        res.status(500);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.disconnectionPromise;
    }
}

export default CreateScript;