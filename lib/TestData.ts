import slugify from "slugify";
import ScriptUtils from "./ScriptUtils";

/*
This file represents a manual backup of the entire database. It means that I can wipe the whole database and not have to worry about losing data
Obviously, this only works while scripts are being added manually by me. Once the community starts adding scripts, this file will no longer be useful.
(Instead, I'll have to rely on manually-created backups to restore the database should I need to wipe it)

To add a script, copy the 'template script' first item (which is ignored when this file is processed) and update all fields.
*/

export interface TestDataScriptInput {
    name: string;
    creator: string;
    sourceUrl: string;
    streamingUrl?: string;
    thumbnail?: string;
    description?: string;
    duration: string;
    category: string;
    tags: string[];
    studio?: string;
    talent?: string[];
    likeCount: number;
    views: number;
    scriptAxisViews?: number;
    thumbsUp: number;
    thumbsDown: number;
    createdAt: number;
    funscript?: string;
    averageSpeed?: number;
    searchString?: string;
}

export interface TestDataScript {
    name: string;
    creator: string;
    sourceUrl: string;
    streamingUrl?: string;
    thumbnail: string;
    description?: string;
    duration: number;
    category: string;
    tags: string[];
    studio?: string;
    talent?: string[];
    likeCount: number;
    views: number;
    scriptAxisViews?: number;
    thumbsUp: number;
    thumbsDown: number;
    createdAt: number;
    owner: number;
    slug: string;
    funscript?: string;
    averageSpeed?: number;
    searchString?: string;
}

const TestData: TestDataScriptInput[] = [
    {
        name: "TemplateScript",
        creator: "CreatorName",
        sourceUrl: "Sourceurl",
        streamingUrl: "StreamingUrl",
        thumbnail: "SourceThumbnail",
        description: "OptionalDescription",
        duration: "0001:0001",
        category: "CategoryName",
        tags: ["Tag", "OtherTag"],
        studio: "StudioName",
        talent: ["TalentName"],
        likeCount: 0,
        views: 0,
        scriptAxisViews: 0,
        thumbsUp: 1,
        thumbsDown: 0,
        createdAt: new Date(2021, 0, 5).valueOf(),
    },
];

const GetTestData = (): TestDataScript[] => {
    return PrepareTestData(TestData);
};

export const PrepareTestData = (scripts: any[]): TestDataScript[] => {
    return scripts
        .filter(data => data.name !== "TemplateScript")
        .map((data: TestDataScriptInput) => {
            return {
                ...data,
                slug: slugify(data.name).toLowerCase(),
                thumbnail: data.thumbnail || "/img/placeholder-thumbnail.png",
                duration: ScriptUtils.stringToDuration(data.duration),
                owner: 1,
                searchString: data.searchString || ScriptUtils.getSearchString(data),
            };
        });
};

export default GetTestData;
