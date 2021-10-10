import axios from "axios";
import getUser from "lib/getUser";
import Emojis from "lib/emojis";
import { roleIsCreator } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import TurndownService from "turndown";
import ScriptUtils from "lib/ScriptUtils";

const parseParagraphs = (cookedHtml: string): string => {
    cookedHtml = cookedHtml.replace(/<div(.|\n)*?<\/div>/g, ""); //no divs
    cookedHtml = cookedHtml.replace(/<aside(.|\n)*?<\/aside>/g, ""); //no asides
    cookedHtml = cookedHtml.replace(/<h1(.|\n)*?<\/h1>/g, ""); //no H1
    cookedHtml = cookedHtml.replace(/<h2(.|\n)*?<\/h2>/g, ""); //no H2
    cookedHtml = cookedHtml.replace(/<h3(.|\n)*?<\/h3>/g, ""); //no H3
    cookedHtml = cookedHtml.replace(/<h4(.|\n)*?<\/h4>/g, ""); //no H4
    cookedHtml = cookedHtml.replace(/<h5(.|\n)*?<\/h5>/g, ""); //no H5
    cookedHtml = cookedHtml.replace(/<p><a class="attachment"(.|\n)*?<\/p>/g, ""); //no attachments
    cookedHtml = cookedHtml.replace(/<p><a href="\/uploads(.|\n)*?<\/p>/g, ""); //no attachments
    cookedHtml = cookedHtml.replace(/<p><img(.|\n)*?<\/p>/g, ""); //no images
    return cookedHtml;
};

const replaceEmojis = (markdown: string): string => {
    //get all the emojis - they appear between colons :like_this:
    const locations = Array.from(markdown.matchAll(new RegExp(/!\[:/, "gi"))).map(a => a.index + 3);
    const emojiNames = locations.map(index => {
        const endIndex = markdown.substring(index).search(/:/);
        return markdown.substring(index, endIndex + index);
    });

    const finalEmojis = emojiNames.map(name => {
        for (let i = 0; i < Emojis.length; i++) {
            if (Emojis[i].key === name) return Emojis[i];
        }
        return null;
    });

    console.log(finalEmojis);
    const emojiChars = finalEmojis.map(emoji =>
        emoji ? String.fromCodePoint(parseInt(emoji.unicode, 16)) : ""
    );
    console.log(emojiChars);

    for (let i = 0; i < locations.length; i++) {
        markdown = markdown.replace(/!\[:(.)*?\)/, emojiChars[i]);
    }

    return markdown;
};

export const GetThreadData = async (scriptUrl: string): Promise<any> => {
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

    const turndownService = new TurndownService();
    const parsedParagraphs = parseParagraphs(threadData.post_stream.posts[0].cooked.toString());
    let markdown = turndownService.turndown(parsedParagraphs);
    markdown = replaceEmojis(markdown);
    markdown = markdown.replace(/!\[(.)*?\)/g, ""); //remove ALL images for sure
    const author = threadData.post_stream.posts[0].username;
    const parsedData = {
        markdown,
        author,
        title: ScriptUtils.formatScriptTitle(threadData.title),
    };

    return parsedData;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const user = await getUser(req);
        if (!user || !roleIsCreator(user.role)) {
            res.status(401);
            res.json({ error: { message: "You are not authorized to perform this action" } });
            return;
        }
        const scripts = await GetThreadData(String(req.query.url));
        res.status(200);
        res.json(scripts);
    } catch (error) {
        console.error("error scraping script metadata from eroscripts", error);
        res.json({
            error: { message: error.message },
        });
    }
};
