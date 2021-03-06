import Database from "lib/Database";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { NextApiRequest, NextApiResponse } from "next";

const FetchScript = async (slug: string, noview = false): Promise<Script> => {
    try {
        console.log("Fetching script", { slug, noview });
        const where = {
            slug: slug,
            active: true,
        };
        const promise = noview
            ? Database.Instance().script.findFirst({ where })
            : Database.Instance().script.update({
                  where: { slug },
                  data: {
                      views: { increment: 1 },
                      scriptAxisViews: { increment: 1 },
                  },
              });

        let script = await promise;

        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            script = ScriptUtils.makeScriptSfw(script);
        }
        await Database.disconnect();
        return script;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { FetchScript };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const slug = String(req.query.scriptSlug);
        const noview = req.query.noview
            ? String(req.query.noview) === "true"
                ? true
                : false
            : false;
        const script = await FetchScript(slug, noview);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error fetching script - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
