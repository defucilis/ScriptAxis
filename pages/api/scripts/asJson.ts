import { PrismaClient } from "@prisma/client";
import { TestDataScriptInput } from "lib/TestData";
import { NextApiRequest, NextApiResponse } from "next";
import ScriptUtils from "../../../lib/ScriptUtils";

const FetchScripts = async (): Promise<TestDataScriptInput[]> => {
    const prisma = new PrismaClient();
    try {
        console.log("Fetching JSON dump of scripts");
        const scripts = await prisma.script.findMany({
            where: {
                active: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                creator: { select: { name: true } },
                owner: { select: { username: true } },
                category: { select: { name: true } },
            },
        });
        const mappedScripts = scripts.map(script => {
            //this is both to transform the data,
            //and to put it in the order that matches TestData.js
            let output: TestDataScriptInput = {
                name: script.name,
                creator: script.creator.name,
                sourceUrl: "",
                duration: "",
                category: "",
                tags: [],
                likeCount: 0,
                views: 0,
                thumbsUp: 0,
                thumbsDown: 0,
                createdAt: new Date().valueOf(),
            };
            if (script.sourceUrl) output.sourceUrl = script.sourceUrl;
            if (script.streamingUrl) output.streamingUrl = script.streamingUrl;
            if (script.description) output.description = script.description;
            if (script.funscript) output.funscript = script.funscript;
            if (script.averageSpeed) output.averageSpeed = script.averageSpeed;
            output.thumbnail = script.thumbnail;
            output.duration = ScriptUtils.durationToString(script.duration);
            output.category = script.category.name;
            if (script.tags && script.tags.length > 0)
                output.tags = script.tags.filter(t => t !== output.category);
            if (script.studio) output.studio = script.studio;
            if (script.talent && script.talent.length > 0) output.talent = script.talent;
            output = {
                ...output,
                likeCount: script.likeCount,
                views: script.views,
                thumbsUp: script.thumbsUp,
                thumbsDown: script.thumbsDown,
                createdAt: script.createdAt.valueOf(),
                searchString: ScriptUtils.getSearchString(script),
            };

            return output;
        });
        await prisma.$disconnect();
        return mappedScripts;
    } catch (error) {
        await prisma.$disconnect();
        throw error;
    }
};

export { FetchScripts };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const scripts = await FetchScripts();
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error fetching scripts - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
