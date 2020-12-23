import {PrismaClient} from '@prisma/client'

const ChangeLike = (scriptSlug, userId, creatorName, isLiked) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Setting scriptLiked to " + isLiked, {scriptSlug, userId, creatorName})
            let transaction = [];
            //add or remove the script from the user's liked scripts
            transaction.push(prisma.user.update({
                where: { id: userId },
                data: { likedScripts: isLiked
                    ? { connect: { slug: scriptSlug } }
                    : { disconnect: { slug: scriptSlug } }
                }
            }));

            //add or remove the user from the script's "liked by" list
            //and update its likeCount
            transaction.push(prisma.script.update({
                where: {slug: scriptSlug},
                data: isLiked 
                    ? { 
                        likeCount: { increment: 1 }
                    }
                    : {
                        likeCount: { decrement: 1 }
                    }
            }));

            transaction.push(prisma.creator.update({
                where: {name: creatorName},
                data: {
                    totalLikes: isLiked
                        ? { increment: 1}
                        : { decrement: 1}
                }
            }))

            transaction.push()
            const results = await prisma.$transaction(transaction);
            resolve(results);
            await prisma.$disconnect();
            resolve(user);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {ChangeLike}

export default async (req, res) => {
    try {
        const script = await ChangeLike(req.body.slug, req.body.uid, req.body.creator, req.body.isLiked);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};