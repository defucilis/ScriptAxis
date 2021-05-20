import Database from "lib/Database";
import getUser from "lib/getUser";
import { NextApiRequest, NextApiResponse } from "next";

const ClearData = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const user = await getUser(req);
    if (!user || !user.isAdmin) {
        res.status(401);
        res.json({ error: { message: "You are not authorized to perform this action" } });
        return;
    }

    try {
        console.log("Wiping database...");

        const transaction = [];

        console.log("\tClearing Category table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."Category" CONTINUE IDENTITY CASCADE;'
            )
        );
        console.log("\tClearing Creator table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."Creator" CONTINUE IDENTITY CASCADE;'
            )
        );
        console.log("\tClearing Script table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."Script" CONTINUE IDENTITY CASCADE;'
            )
        );
        console.log("\tClearing Tag table");
        transaction.push(
            Database.Instance().$queryRaw('TRUNCATE TABLE public."Tag" CONTINUE IDENTITY CASCADE;')
        );
        console.log("\tClearing Talent table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."Talent" CONTINUE IDENTITY CASCADE;'
            )
        );
        console.log("\tClearing Studio table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."Studio" CONTINUE IDENTITY CASCADE;'
            )
        );
        //console.log("\tClearing User table");
        //transaction.push(prisma.$queryRaw('TRUNCATE TABLE public."User" CONTINUE IDENTITY CASCADE;'))
        console.log("\tClearing VerificationRequest table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."VerificationRequest" CONTINUE IDENTITY CASCADE;'
            )
        );
        console.log("\tClearing _ScriptLiker table");
        transaction.push(
            Database.Instance().$queryRaw(
                'TRUNCATE TABLE public."_ScriptLiker" CONTINUE IDENTITY CASCADE;'
            )
        );

        const results = await Database.Instance().$transaction(transaction);
        await Database.disconnect();

        res.status(201);
        res.json(results);
    } catch (error) {
        console.log("Failed to clear data", error.message);
        res.json({
            error: { message: error.message },
        });
    } finally {
        await Database.disconnect();
    }
};

export default ClearData;
