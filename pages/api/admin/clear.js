import {PrismaClient} from '@prisma/client'

const ClearData = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient({log: ["query"]});

    try {
        let transaction = [];
        
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Category" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Creator" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Script" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Tag" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Talent" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Studio" CONTINUE IDENTITY CASCADE;'))
        //transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."User" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."VerificationRequest" CONTINUE IDENTITY CASCADE;'))
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."_ScriptLiker" CONTINUE IDENTITY CASCADE;'))

        const results = await prisma.$transaction(transaction);

        res.status(201);
        res.json(results)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to clear data", error.message);
        res.status(400);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default ClearData;