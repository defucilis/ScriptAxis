import {PrismaClient} from '@prisma/client'
import ScriptUtils from '../../../utilities/ScriptUtils'

const FetchScripts = () => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            console.log("Fetching JSON dump of scripts");
            let scripts = await prisma.script.findMany({
                where: {
                    active: true
                },
                orderBy: {
                    created: "desc"
                },
                include: {
                    creator: { select: { name: true }},
                    owner: { select: { username: true }},
                    category: { select: { name: true }}
                }
            });
            scripts = scripts.map(script => {
                //this is both to transform the data,
                //and to put it in the order that matches TestData.js
                let output = {
                    name: script.name,
                    creator: script.creator.name
                };
                if(script.sourceUrl) output.sourceUrl = script.sourceUrl;
                if(script.streamingUrl) output.streamingUrl = script.streamingUrl;
                output.thumbnail = script.thumbnail;
                output.duration = ScriptUtils.durationToString(script.duration);
                output.category = script.category.name;
                if(script.tags && script.tags.length > 0) output.tags = script.tags.filter(t => t !== output.category);
                if(script.studio) output.studio = script.studio;
                if(script.talent && script.talent.length > 0) output.talent = script.talent;
                output = {...output,
                    likeCount: script.likeCount,
                    views: script.views,
                    thumbsUp: script.thumbsUp,
                    thumbsDown: script.thumbsDown,
                    created: script.created.valueOf(),
                };

                return output
            });
            await prisma.$disconnect();
            resolve(scripts);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchScripts}

export default async (req, res) => {
    try {
        const scripts = await FetchScripts();
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};