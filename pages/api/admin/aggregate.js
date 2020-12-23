import {PrismaClient} from '@prisma/client'

const Aggregate = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});

        const updateCreator = creator => {
            return new Promise(async (resolve, reject) => {
                try {
                    //Get the creator's most-viewed script for the thumbnail
                    const allScripts = await prisma.script.findMany({
                        where: {
                            creator: {
                                name: creator.name
                            }
                        }
                    });

                    //todo - this isn't correctly selecting the most viewed script?
                    const thumbnail = allScripts.length > 0 
                        ? allScripts.sort((a, b) => a.viewCount - b.viewCount)[0].thumbnail 
                        : "";

                    const aggregations = await prisma.script.aggregate({
                        where: {
                            creator: {
                                name: creator.name
                            }
                        },
                        sum: {
                            views: true,
                            likeCount: true
                        }
                    });
                    const updatedCreator = await prisma.creator.update({
                        where: {
                            name: creator.name
                        },
                        data: {
                            totalViews: aggregations.sum.views,
                            totalLikes: aggregations.sum.likeCount,
                            thumbnail
                        }
                    });
                    resolve(updatedCreator);
                } catch(error) {
                    reject(error);
                }
            })
        }

        //todo: (separate) improve the aggregate function to also remove any tags, studios or talents that have no associated scripts
        //                 this isn't really urgent

        try {
            const creators = await prisma.creator.findMany();
            let output = [];
            for(let i = 0; i < creators.length; i++) {
                const creator = await updateCreator(creators[i]);
                output.push(creator);
            }
            await prisma.$disconnect();
            resolve(output);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {Aggregate}

export default async (req, res) => {
    try {
        const scripts = await Aggregate();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.error("error fetching tags and categories - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};