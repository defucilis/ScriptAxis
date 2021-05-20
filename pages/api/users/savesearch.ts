import Database from "lib/Database";
import { NextApiRequest, NextApiResponse } from "next";

const SaveSearch = async (uid: number, searchString: string): Promise<any> => {
    try {
        console.log("Saving search query for user " + uid, searchString);
        const currentSavedFilters = (
            await Database.Instance().user.findFirst({
                where: {
                    id: uid,
                },
                select: {
                    savedFilters: true,
                },
            })
        ).savedFilters;

        const exists = currentSavedFilters.findIndex(f => f === searchString) !== -1;
        if (exists) {
            await Database.disconnect();
            return currentSavedFilters;
            return;
        }

        const response = await Database.Instance().user.update({
            where: {
                id: uid,
            },
            data: {
                savedFilters: [...currentSavedFilters, searchString],
            },
        });

        await Database.disconnect();
        return response;
    } catch (error) {
        await Database.disconnect();
        throw error;
    }
};

export { SaveSearch };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        console.log("Saving search ", req.body);
        const script = await SaveSearch(req.body.uid, req.body.searchString);
        res.status(200);
        res.json(script);
    } catch (error) {
        console.error("error saving search - " + error);
        res.json({
            error: { message: error.message },
        });
    }
};
