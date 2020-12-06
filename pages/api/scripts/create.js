import {PrismaClient} from '@prisma/client'

const CreateScript = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient({log: ["query"]});

    try {
        let transaction = [];
        
        //Create the script object
        const rawData = req.body;
        transaction.push(prisma.script.create({data: {
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
            tags: rawData.tags,
            thumbnail: rawData.thumbnail,
            description: rawData.description,
            duration: rawData.duration,
            sourceUrl: rawData.sourceUrl
        }}));

        //Create or insert any necessary tags
        rawData.tags.forEach(tag => {
            transaction.push(prisma.tag.upsert({
                where: { name: tag },
                create: { name: tag, count: 1 },
                update: { count: { increment: 1 }}
            }))
        })

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

        const results = await prisma.$transaction(transaction);

        res.status(201);
        res.json(results)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create script", error.message);
        res.status(400);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateScript;