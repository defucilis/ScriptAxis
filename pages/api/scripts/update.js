import {PrismaClient} from '@prisma/client'

const UpdateScript = async (req, res) => {
    //console.log(req.body);
    const prisma = new PrismaClient({log: ["query"]});

    try {
        let transaction = [];

        const id = req.body.id;
        const set = req.body.set || {};
        const remove = req.body.remove || {};
        const add = req.body.add || {};

        let updateData = {...set};
        if(add.creator) {
            updateData.creator = { connectOrCreate: {
                where: {name: add.creator},
                create: {name: add.creator}
            }}
        }
        if(add.category) {
            updateData.category = { connectOrCreate: {
                where: {name: add.category},
                create: {name: add.category}
            }}
        }

        console.log("Updating script id " + id + " with data", updateData);
        transaction.push(prisma.script.update({
            where: { id: id },
            data: updateData
        }));

        //remove one from count of tags that this script is no longer part of
        if(remove.category) {
            console.log("Removing from category", remove.category);
            transaction.push(prisma.category.update({
                where: { name: remove.category },
                data: { 
                    count: { decrement: 1 },
                }
            }))
        }
        //add the script to the category that it is now part of
        if(add.category) {
            console.log("Adding to category", add.category);
            transaction.push(prisma.category.update({
                where: { name: add.category },
                data: { 
                    scripts: { connect: { id: id } },
                    count: { increment: 1 },
                },
            }))
        }

        //remove this script from the script array of its old category (and remove one from its count)
        if(remove.tags) {
            remove.tags.forEach(tag => {
                console.log("Removing tag", tag);
                transaction.push(prisma.tag.update({
                    where: { name: tag },
                    data: { count: { decrement: 1 } }
                }))
            })
        }
        //add this script to the script array of its new category (and add one to its count)
        if(add.tags) {
            add.tags.forEach(tag => {
                console.log("Adding tag", tag);
                transaction.push(prisma.tag.upsert({
                    where: { name: tag },
                    create: { name: tag, count: 1 },
                    update: { count: { increment: 1 } }
                }))
            })
        }

        //If talents were included, add them to the talent table
        if(add.talent) {
            add.talent.forEach(talent => {
                console.log("Adding talent", talent);
                transaction.push(prisma.talent.upsert({
                    where: {name: talent},
                    create: {name: talent},
                    update: {}
                }))
            });
        }

        //If a studio was included, add it to the studio table
        if(add.studio) {
            console.log("Adding studio", add.studio);
            transaction.push(prisma.studio.upsert({
                where: {name: add.studio},
                create: {name: add.studio},
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

export default UpdateScript;