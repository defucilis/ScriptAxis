import axios from "axios";
import Database from "lib/Database";
import getUser from "lib/getUser";
import { NextApiRequest, NextApiResponse } from "next";

export const GetScrapedInfo = async (
    scriptUrl: string
): Promise<{ success?: boolean; views: number; likeCount: number; createdAt: Date }> => {
    if (!scriptUrl.includes("discuss.eroscripts.com"))
        throw { message: "can only scrape scripts from EroScripts" };

    const baseUrl = "https://discuss.eroscripts.com";
    const headers = {
        "Api-Key": process.env.NEXT_PUBLIC_DISCOURSE_API_KEY,
        "Api-Username": process.env.NEXT_PUBLIC_DISCOURSE_USER,
    };

    const slices = scriptUrl.split("/");
    const url = `${baseUrl}/t/${
        scriptUrl.split("/").slice(slices.length === 6 ? -1 : -2)[0]
    }.json?track_visit=false`;
    const threadResponse = await axios({
        method: "get",
        url,
        headers,
    });

    const threadData = threadResponse.data;
    if (typeof threadData === "string")
        throw { message: "Authentication failed for EroScripts - bad cookie?" };

    if (!threadData.views) throw { message: "failed to get JSON data from EroScripts URL..." };

    const views = threadData.views;
    let likeCount = 0;
    try {
        likeCount = threadData.post_stream.posts[0].actions_summary[0].count;
    } catch {
        likeCount = 0;
    }
    const createdAt = new Date(threadData.created_at);

    return {
        success: true,
        views,
        likeCount,
        createdAt,
    };
};

const Scrape = async (scriptSlug: string, scriptUrl: string) => {
    try {
        const scrapedInfo = await GetScrapedInfo(scriptUrl);
        const output = await Database.Instance().script.update({
            where: {
                slug: scriptSlug,
            },
            data: {
                views: scrapedInfo.views,
                likeCount: scrapedInfo.likeCount,
                createdAt: scrapedInfo.createdAt,
            },
        });
        await Database.disconnect();
        return output;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !user.isAdmin) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await Scrape(req.body.slug, req.body.url);
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error scraping script metadata from eroscripts", error);
        res.json({
            error: { message: error.message },
        });
    }
};
