import {PrismaClient} from '@prisma/client'

const ClearData = async (req, res) => {
    const prisma = new PrismaClient();

    try {
        console.log("Wiping database...");

        let transaction = [];
        
        console.log("\tClearing Category table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Category" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing Creator table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Creator" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing Script table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Script" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing Tag table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Tag" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing Talent table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Talent" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing Studio table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."Studio" CONTINUE IDENTITY CASCADE;'))
        //console.log("\tClearing User table");
        //transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."User" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing VerificationRequest table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."VerificationRequest" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing _ScriptLiker table");
        transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."_ScriptLiker" CONTINUE IDENTITY CASCADE;'))

        const results = await prisma.$transaction(transaction);

        res.status(201);
        res.json(results)
    } catch(error) {
        console.log("Failed to clear data", error.message);
        res.json({
            error: { message: error.message }
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default ClearData;