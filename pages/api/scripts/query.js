import {PrismaClient} from '@prisma/client'

const QueryScripts = ({filters, sorting}) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient(/*{log: ["query"]}*/);
        try {

            let finalWhere = {
                AND: [
                    {
                        active: { 
                            equals: true
                        }
                    }
                ]
            };
            //these are set directly from UI
            if(filters.name) finalWhere.AND.push({name: filters.name});
            if(filters.category) finalWhere.AND.push({category: filters.category});

            //duration needs to be split into two checks for min and max
            if(filters.duration) {
                if(filters.duration.min !== -1) finalWhere.AND.push({duration: {gte: filters.duration.min}});
                if(filters.duration.max !== -1) finalWhere.AND.push({duration: {lte: filters.duration.max}});
            }

            //todo: God damn it Prisma doesn't support filtering with lists
            //see: https://github.com/prisma/prisma-client-js/issues/341
            //see: https://github.com/prisma/prisma/issues/3475
            //Until this is added, I'll need to workaround either raw SQL
            //I really don't want to do that, so I think I'll just filter them myself...

            let scripts = await prisma.script.findMany({
                where: finalWhere,
                orderBy: sorting,
                include: {
                    creator: { select: { name: true }},
                    owner: { select: { username: true }}
                }
            });

            //Filtering on the server after fetching everything, because that's how we have to do it
            //Please halp prisma team :c
            if(filters.include) scripts = scripts
                .filter(script => filters.include.reduce((acc, tag) => {
                    return acc && script.tags.findIndex(t => t === tag) !== -1;
                }, true));
            
            if(filters.exclude) scripts = scripts
                .filter(script => filters.exclude.reduce((acc, tag) => {
                    return acc && script.tags.findIndex(t => t === tag) === -1;
                }, true));

            await prisma.$disconnect();
            resolve(scripts);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {QueryScripts}

export default async (req, res) => {
    console.log("Request Body", req.body);
    try {
        const scripts = await QueryScripts(req.body);
        res.status(200);
        res.json(scripts);
    } catch(error) {
        console.log("Error fetching scripts - " + error);
        res.status(400);
        res.json({
            error
        });
    }
};