import {PrismaClient} from '@prisma/client'

const FetchScripts = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient(/*{log: ["query"]}*/);

    try {
        const scripts = await prisma.script.findMany();
        res.status(200);
        res.json(scripts)
    } catch(error) {
        console.log("Error fetching scripts - " + error);
        res.status(500);
        res.json({
            error
        });
    } finally {
        await prisma.disconnectionPromise;
    }
}

export default FetchScripts;