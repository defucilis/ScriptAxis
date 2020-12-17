import {PrismaClient} from '@prisma/client'

const FetchUser = (email, lean) => {
    return new Promise(async (resolve, reject) => {
        const prisma = new PrismaClient({log: ["query"]});
        try {
            //if lean, we only want the slugs of the liked and owned scripts
            //even that might be too much for the 4096kB user cookie
            const scriptSelect = lean
            ? { select: { 
                slug: true
            }}
            : { select: { 
                slug: true, 
                name: true, 
                thumbnail: true, 
                creator: { select: { name: true } } 
            }};

            const users = await prisma.user.findFirst({
                where: {
                    email: email
                },
                include : {
                    creator: { select: { name: true }},
                    likedScripts: scriptSelect,
                    ownedScripts: scriptSelect,
                }
            });
            await prisma.$disconnect();
            resolve(users);
        } catch(error) {
            await prisma.$disconnect();
            reject(error);
        }
    })
}

export {FetchUser}

export default async (req, res) => {
    try {
        const script = await FetchUser(req.body.email, req.body.lean);
        res.status(200);
        res.json(script);
    } catch(error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message }
        });
    }
};