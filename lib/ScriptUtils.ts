import { ScriptFormDataOutput } from "components/forms/ScriptForm";
import {
    Filters,
    Query,
    SavedQuery,
    UrlQuery,
    StringLists,
    StringListsWithCount,
    Script,
    ScriptVisualStub,
} from "./types";

const indexToDuration = (index: number): number => {
    switch (index) {
        case 0:
            return 0;
        case 1:
            return 300; //5 minutes
        case 2:
            return 600; //10 minutes
        case 3:
            return 900; //15 minutes
        case 4:
            return 1200; //20 minutes
        case 5:
            return 1800; //30 minutes
        case 6:
            return 3600; //60 minutes
        case 7:
            return 7200; //120 minutes
    }
};

const indexToSpeed = (index: number): number => {
    switch (index) {
        case 0:
            return 0;
        case 1:
            return 75;
        case 2:
            return 150;
        case 3:
            return 225;
        case 4:
            return 300;
        case 5:
            return 375;
    }
};

const arraysIdentical = (a: any[], b: any[]) => {
    if (!a && !b) return true;
    if ((!a && b) || (a && !b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

// const parseScriptDocument = (script: Script): Script => {
//     console.log(script);

//     const output: Script = {
//         id: script.id,
//         name: script.name,
//         slug: script.slug,
//         creatorName: script.creatorName,
//         userId: script.userId,
//         categoryName: script.categoryName,
//         tags: !script.tags ? [] : script.tags,
//         description: script.description,
//         duration: script.duration,
//         thumbnail: script.thumbnail || "/img/placeholder-thumbnail.png",
//         sourceUrl: script.sourceUrl,
//         streamingUrl: script.streamingUrl,
//         studio: script.studio || "",
//         talent: script.talent || [],
//         active: script.active,
//         created: script.created,
//         modified: script.modified,
//         likeCount: script.likeCount,
//         thumbsUp: script.thumbsUp,
//         thumbsDown: script.thumbsDown,
//         views: script.views,
//         funscripts: [],

//         //SFW Overrides
//         // name: !script.name ? "Script" : script.name.split("").reverse().join(""),
//         //thumbnail: "/img/placeholder-thumbnail.png",
//         // studio: !script.studio ? null : script.studio.split("").reverse().join(""),
//         // category: !script.categoryName ? "Category" : script.categoryName.split("").reverse().join(""),
//         // tags: !script.tags ? [] : script.tags.map(tag => tag.split("").reverse().join("")),
//         // streamingUrl: "https://www.google.com",
//         // sourceurl: "https://www.google.com"
//     };
//     return output;
// };

type namedItem = { name: string };
type namedItemWithCount = { name: string; count: number };
const parseDatabaseLists = (data: {
    tags?: namedItem[];
    categories?: namedItem[];
    talent?: namedItem[];
    studios?: namedItem[];
    creators?: namedItem[];
}): StringLists => {
    return {
        tags: !data.tags ? [] : data.tags.map(t => t.name),
        categories: !data.categories ? [] : data.categories.map(c => c.name),
        talent: !data.talent ? [] : data.talent.map(t => t.name),
        studios: !data.studios ? [] : data.studios.map(s => s.name),
        creators: !data.creators ? [] : data.creators.map(c => c.name),
    };
};

const parseDatabaseListsWithCount = (data: {
    tags: namedItemWithCount[];
    categories: namedItemWithCount[];
    talent: namedItem[];
    studios: namedItem[];
    creators: namedItem[];
}): {
    tags: namedItemWithCount[];
    categories: namedItemWithCount[];
    talent: string[];
    studios: string[];
    creators: string[];
} => {
    return {
        tags: !data.tags ? [] : data.tags.map(t => ({ name: t.name, count: t.count })),
        categories: !data.categories
            ? []
            : data.categories.map(c => ({ name: c.name, count: c.count })),
        talent: !data.talent ? [] : data.talent.map(t => t.name),
        studios: !data.studios ? [] : data.studios.map(s => s.name),
        creators: !data.creators ? [] : data.creators.map(c => c.name),
    };
};

const removeCountFromLists = (data: StringListsWithCount): StringLists => {
    return {
        tags: !data.tags ? [] : data.tags.map(t => t.name),
        categories: !data.categories ? [] : data.categories.map(c => c.name),
        talent: data.talent || [],
        studios: data.studios || [],
        creators: data.creators || [],
    };
};

const durationToString = (duration: number): string => {
    let output = "";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - minutes * 60 - hours * 3600;
    if (hours > 0) {
        output += hours + ":";
        if (minutes > 10) output += minutes + ":";
        else if (minutes > 0) output += "0" + minutes + ":";
        else output += "00:";
    } else if (minutes > 0) {
        output += minutes + ":";
    }
    if (seconds >= 10) output += seconds;
    else if (seconds > 0) output += "0" + seconds;
    else output += "00";
    return output;
};

const stringToDuration = (str: string): number => {
    const pieces = str.split(":");
    if (pieces.length === 1) {
        return parseInt(str);
    } else if (pieces.length === 2) {
        return 60 * parseInt(pieces[0]) + parseInt(pieces[1]);
    } else if (pieces.length === 3) {
        return 3600 * parseInt(pieces[0]) + 60 * parseInt(pieces[1]) + parseInt(pieces[0]);
    }

    return -1;
};

const stringIsValidDuration = (str: string): boolean => {
    const pieces = str.split(":");
    //no more than three items (e.g. 3:55:22)
    if (pieces.length > 3) return false;

    //each pieces can only be two digits, and no decimals
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].length > 2) return false;
        if (!pieces[i].match(/^[0-9]*$/)) return false;
    }

    //make sure that everything is a number, and for minutes/seconds, under 60
    const numberPieces = pieces.map(s => parseInt(s));
    for (let i = 0; i < numberPieces.length; i++) {
        if (Number.isNaN(numberPieces[i])) return false;
        if (numberPieces[i] < 0) return false;
        if (i !== 0 && numberPieces[i] > 59) return false;
    }

    return true;
};

const viewsToString = (views: number, addViews = false): string => {
    const suffix = addViews ? (views === 1 ? " View" : " Views") : "";

    if (views > 1000000) {
        return Math.round(views / 100000) / 10 + "M" + suffix;
    }

    if (views > 10000) {
        return Math.round(views / 1000) + "k" + suffix;
    }

    if (views > 1000) {
        return Math.round(views / 100) / 10 + "k" + suffix;
    }

    return Math.round(views) + suffix;
};

const thumbsToPercentage = (thumbsup: number, thumbsdown: number): number => {
    const percentage = thumbsup / (Number(thumbsup) + Number(thumbsdown));
    return Math.round(percentage * 100.0);
};

const getSiteName = (url: string): string => {
    return url
        .replace("http://", "")
        .replace("https://", "")
        .replace("www.", "")
        .split("/")[0]
        .toLowerCase();
};

const filtersEqual = (filterA: Filters, filterB: Filters): boolean => {
    const stringArrayEqual = (arrayA: string[], arrayB: string[]) => {
        if ((arrayA && !arrayB) || (!arrayA && arrayB)) return false;
        if (arrayA.length !== arrayB.length) return false;
        for (let i = 0; i < arrayA.length; i++) {
            if (arrayA[i] !== arrayB[i]) return false;
        }
        return true;
    };

    if (filterA.name || filterB.name) {
        if ((filterA.name && !filterB.name) || (!filterA.name && filterB.name)) return false;
        else if (filterA.name.contains !== filterB.name.contains) return false;
    }

    if (filterA.category || filterB.category) {
        if ((filterA.category && !filterB.category) || (!filterA.category && filterB.category))
            return false;
        else if (filterA.category.name.equals !== filterB.category.name.equals) return false;
    }

    if (filterA.include || filterB.include) {
        if ((filterA.include && !filterB.include) || (!filterA.include && filterB.include))
            return false;
        else if (!stringArrayEqual(filterA.include, filterB.include)) return false;
    }

    if (filterA.exclude || filterB.exclude) {
        if ((filterA.exclude && !filterB.exclude) || (!filterA.exclude && filterB.exclude))
            return false;
        else if (!stringArrayEqual(filterA.exclude, filterB.exclude)) return false;
    }

    if (filterA.minDuration || filterB.minDuration) {
        if (
            (filterA.minDuration && !filterB.minDuration) ||
            (!filterA.minDuration && filterB.minDuration)
        )
            return false;
        if (filterA.minDuration !== filterB.minDuration) return false;
    }

    if (filterA.maxDuration || filterB.maxDuration) {
        if (
            (filterA.maxDuration && !filterB.maxDuration) ||
            (!filterA.maxDuration && filterB.maxDuration)
        )
            return false;
        if (filterA.maxDuration !== filterB.maxDuration) return false;
    }

    if (filterA.minSpeed || filterB.minSpeed) {
        if ((filterA.minSpeed && !filterB.minSpeed) || (!filterA.minSpeed && filterB.minSpeed))
            return false;
        if (filterA.minSpeed !== filterB.minSpeed) return false;
    }

    if (filterA.maxSpeed || filterB.maxSpeed) {
        if ((filterA.maxSpeed && !filterB.maxSpeed) || (!filterA.maxSpeed && filterB.maxSpeed))
            return false;
        if (filterA.maxSpeed !== filterB.maxSpeed) return false;
    }

    if (filterA.talent || filterB.talent) {
        if ((filterA.talent && !filterB.talent) || (!filterA.talent && filterB.talent))
            return false;
        else if (filterA.talent !== filterB.talent) return false;
    }

    if (filterA.studio || filterB.studio) {
        if ((filterA.studio && !filterB.studio) || (!filterA.studio && filterB.studio))
            return false;
        else if (filterA.studio.contains !== filterB.studio.contains) return false;
    }

    if (filterA.sourceUrl || filterB.sourceUrl) {
        if ((filterA.sourceUrl && !filterB.sourceUrl) || (!filterA.sourceUrl && filterB.sourceUrl))
            return false;
    }
    if (filterA.streamingUrl || filterB.streamingUrl) {
        if (
            (filterA.streamingUrl && !filterB.streamingUrl) ||
            (!filterA.streamingUrl && filterB.streamingUrl)
        )
            return false;
    }

    return true;
};

//goes from a filters object applied to the database and turns it into a query object to be turned into a URL query strin
//Note that this takes place on the *client* whenever it's necessary to prepare a query string or send query data to the server
const queryToUrlQuery = (input: Query): UrlQuery => {
    if (!input) return {};

    const filters = input.filters;
    const sorting = input.sorting;
    const page = input.page;
    const defaultSorting =
        sorting && sorting.length > 0 && sorting[0].created && sorting[0].created === "desc";
    const defaultPage = page && page == 1;
    if (defaultSorting && defaultPage && (!filters || Object.keys(filters).length === 0)) return {};

    const output: UrlQuery = {};
    if (filters.name) output.search = filters.name.contains;
    if (filters.category) output.category = filters.category.name.equals;
    if (filters.include) output.include = filters.include.join("_");
    if (filters.exclude) output.exclude = filters.exclude.join("_");
    if (filters.minDuration) output.minDuration = filters.minDuration;
    if (filters.maxDuration) output.maxDuration = filters.maxDuration;
    if (filters.minSpeed) output.minSpeed = filters.minSpeed;
    if (filters.maxSpeed) output.maxSpeed = filters.maxSpeed;
    if (filters.talent) output.talent = filters.talent;
    if (filters.studio) output.studio = filters.studio.contains;
    if (filters.sourceUrl) output.sourceUrl = "true";
    if (filters.streamingUrl) output.streamingUrl = "true";

    if (!defaultSorting && sorting && sorting.length > 0) {
        output.sorting = `${Object.keys(sorting[0])[0]}+${sorting[0][Object.keys(sorting[0])[0]]}`;
    }
    if (!defaultPage && page) {
        output.page = page;
    }

    return output;
};
//goes from a query object parsed from a URL string and turns it into a filter object to be applied to the database
//Note that this takes place on the *server* from the next.js `query` input into getServerSideProps
const stringObjectToQuery = (query: UrlQuery): Query => {
    const output: Query = { filters: {}, sorting: [{ created: "desc" }], page: 1 };

    if (query.search) output.filters.name = { contains: query.search, mode: "insensitive" };
    if (query.category) output.filters.category = { name: { equals: query.category } };
    if (query.include) output.filters.include = query.include.split("_");
    if (query.exclude) output.filters.exclude = query.exclude.split("_");
    if (query.minDuration) output.filters.minDuration = query.minDuration;
    if (query.maxDuration) output.filters.maxDuration = query.maxDuration;
    if (query.minSpeed) output.filters.minSpeed = query.minSpeed;
    if (query.maxSpeed) output.filters.maxSpeed = query.maxSpeed;
    if (query.talent) output.filters.talent = query.talent;
    if (query.studio) output.filters.studio = { contains: query.studio, mode: "insensitive" };
    if (query.sourceUrl) output.filters.sourceUrl = { not: null };
    if (query.streamingUrl) output.filters.streamingUrl = { not: null };
    if (query.sorting) {
        const pieces = query.sorting.split(" ");
        output.sorting = [{ [pieces[0]]: pieces[1] }];
    }
    if (query.page) {
        output.page = query.page;
    }

    if (output.filters === {}) delete output.filters;

    return output;
};

const queryToString = (query: UrlQuery): string => {
    if (Object.keys(query).length === 0) return "";
    return encodeURI(
        "?" +
            Object.keys(query)
                .map(key => `${key}=${query[key]}`)
                .join("&")
    );
};

//todo - need to figure out exactly what the shape of this data is...
const queryToPrettyString = (queryString: string): SavedQuery => {
    const pieces = queryString.substring(1).split("&");
    const params: any = {};
    pieces.forEach(param => {
        const subPieces = param
            .split("=")
            .map(str => str.substr(0, 1).toUpperCase() + str.substr(1));
        params[subPieces[0]] = subPieces[1];
    });

    let output: SavedQuery = {};

    if (params.MinDuration) {
        const min = indexToDuration(Number(params.MinDuration)) / 60.0;

        if (params.MaxDuration) {
            const max = indexToDuration(Number(params.MaxDuration)) / 60.0;
            params.Duration = min + " - " + max + " min";

            delete params.MaxDuration;
        } else {
            params.Duration = ">" + min + " min";
        }
        delete params.MinDuration;
    } else if (params.MaxDuration) {
        const max = indexToDuration(Number(params.MaxDuration)) / 60.0;
        params.Duration = "<" + max + " min";
        delete params.MaxDuration;
    }
    if (params.Search) {
        params.Search = `"${params.Search}"`;
        output.search = params.Search;
        delete params.Search;
    }
    if (params.Sorting) {
        const subPieces = params.Sorting.split("+");
        if (subPieces.length > 1) {
            if (subPieces[1] === "asc") subPieces[1] = "Ascending";
            else if (subPieces[1] === "desc") subPieces[1] = "Descending";
            params.Sorting = `${subPieces[0]} (${subPieces[1]})`;
        }
        output.sorting = params.Sorting;
        delete params.Sorting;
    }
    output = { ...output, params, queryString };

    return output;
};

const getScriptDifferences = (
    oldScript: ScriptFormDataOutput,
    newScript: ScriptFormDataOutput
): any => {
    console.warn("Diffing data");
    const output: any = {};

    //merge keys to get full list of properties on both objects
    const keys = Object.keys(oldScript);
    const newKeys = Object.keys(newScript);
    newKeys.forEach(key => {
        if (keys.findIndex(k => k === key) === -1) keys.push(key);
    });

    //find differences between an 'old' script and a 'new' script
    //used to update the database when editing a script
    keys.forEach(key => {
        const oldValue = oldScript[key];
        const newValue = newScript[key];
        if (oldValue && newValue) {
            if (Array.isArray(oldValue)) {
                if (!arraysIdentical(oldValue, newValue)) {
                    output[key] = newValue;
                }
            } else if (oldValue != newValue) {
                output[key] = newValue;
            }
        } else if (oldValue && !newValue) {
            output[key] = null;
        } else if (!oldValue && newValue) {
            output[key] = newValue;
        }
    });

    return output;
};

const tryFormatError = (error: string): string => {
    const searchString = "user_facing_error: Some(KnownError { message: ";

    try {
        const startIndex = error.indexOf(searchString);
        if (startIndex === -1) {
            console.log("Failed to find starting string, returning original error", error);
            return error;
        }
        const output = error.substr(startIndex + searchString.length + 1);
        const endIndex = output.indexOf('"');
        if (endIndex === -1) {
            console.log("Failed to find end quotation, returning original error", error);
            return error;
        }
        return output.substr(0, endIndex);
    } catch (e) {
        //console.log("Failed to format error", error, e);
        return "Unknown error";
    }
};

//used to generate JS object code for pasting into TestData.js as a backup
const getScriptObjectCode = (data: ScriptFormDataOutput): string => {
    const lines = [];
    lines.push("{");
    lines.push(`    name:           "${data.name}",`);
    lines.push(`    creator:        "${data.creator}",`);
    lines.push(`    sourceUrl:      "${data.sourceUrl}",`);
    if (data.streamingUrl && data.streamingUrl !== "")
        lines.push(`    streamingUrl:   "${data.streamingUrl}",`);
    lines.push(`    thumbnail:      "${data.thumbnail}",`);
    if (data.description && data.description !== "")
        lines.push(`    description:    "${data.description.replace(/\r?\n|\r/g, "\\n")}",`);
    if (data.funscript && data.funscript !== "")
        lines.push(`    funscript:    "${data.funscript}",`);
    if (data.averageSpeed) lines.push(`    averageSpeed:    "${data.averageSpeed}",`);
    lines.push(`    duration:       "${durationToString(data.duration)}",`);
    lines.push(`    category:       "${data.category}",`);
    lines.push("    tags: [");
    if (data.tags && data.tags.length > 0) {
        data.tags.forEach(tag => {
            lines.push(`        "${tag}",`);
        });
    }
    lines.push("    ],");
    if (data.studio && data.studio !== "") {
        lines.push(`    studio:         "${data.studio}",`);
    }
    if (data.talent && data.talent.length > 0) {
        lines.push("    talent: [");
        data.talent.forEach(talent => {
            lines.push(`        "${talent}",`);
        });
        lines.push("    ],");
    }

    lines.push("    likeCount:      0,");
    lines.push("    views:          0,");
    lines.push("    thumbsUp:       1,");
    lines.push("    thumbsDown:     0,");
    const created = new Date(data.created);
    lines.push(
        `    created:        new Date(${created.getFullYear()}, ${created.getMonth()}, ${created.getDate()}).valueOf(),`
    );
    lines.push("},");
    return lines.map(line => "    " + line).join("\n");
};

const longAcronyms = ["MILF", "DILF", "GILF", "CFNM", "BDSM"];
const shortNonacronyms = ["Gay"];
const formatTag = (tag: string): string => {
    const foundAcronym = longAcronyms.find(a => a === tag.toUpperCase());
    if (foundAcronym) return foundAcronym;

    const foundNonacronym = shortNonacronyms.find(a => a.toLowerCase() === tag.toLowerCase());
    if(foundNonacronym) return foundNonacronym;

    if (tag.length <= 3) return tag.toUpperCase();

    const pieces = tag.replace(/-/g, " ").split(" ");
    return pieces
        .map(piece => piece.substr(0, 1).toUpperCase() + piece.substr(1).toLowerCase())
        .join(" ");
};

const makeScriptSfw = (script: Script): any => {
    return {
        ...script,
        name: makeStringSfw(script.name),
        tags: !script.tags ? [] : script.tags.map((tag: string) => makeStringSfw(tag)),
        description: !script.description ? "" : makeStringSfw(script.description),
        thumbnail: "/img/placeholder-thumbnail.png",
        sourceUrl: "https://www.google.com",
        streamingUrl: "https://www.youtube.com",
        studio: !script.studio ? "" : makeStringSfw(script.studio),
        talent: !script.talent ? [] : script.talent.map((talent: string) => makeStringSfw(talent)),
        creatorName: makeStringSfw(script.creatorName),
        categoryName: makeStringSfw(script.categoryName),
    };
};

const makeScriptStubSfw = (script: ScriptVisualStub): any => {
    return {
        ...script,
        name: makeStringSfw(script.name),
        thumbnail: "/img/placeholder-thumbnail.png",
        creatorName: makeStringSfw(script.creatorName),
    };
};

const makeStringSfw = (str: string): string => {
    if (!str) return "";
    const reversed = str.split("").reverse().join("").toLowerCase();
    return reversed[0].toUpperCase() + reversed.slice(1);
};

const makeTagCategorySfw = (item: {
    name: string;
    count: number;
}): { name: string; count: number } => {
    if (!item || !item.name) return { name: "", count: 0 };
    return { ...item, name: makeStringSfw(item.name) };
};

const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
                resolve(String(e.target.result));
            };
            reader.readAsText(file);
        } catch (error) {
            reject(error);
        }
    });
};

const getSearchString = (data: {
    name?: string;
    talent?: string[];
    tags?: string[];
    studio?: string;
}): string => {
    let output: string = data.name || "";
    if (data.talent && data.talent.length > 0) {
        output += " " + data.talent.join(" ");
    }
    if (data.tags && data.tags.length > 0) {
        output += " " + data.tags.join(" ");
    }
    if (data.studio) {
        output += " " + data.studio;
    }
    return output.toLowerCase();
};

const ScriptUtils = {
    //parseScriptDocument,
    indexToDuration,
    indexToSpeed,
    parseDatabaseLists,
    parseDatabaseListsWithCount,
    removeCountFromLists,
    durationToString,
    stringToDuration,
    stringIsValidDuration,
    viewsToString,
    thumbsToPercentage,
    getSiteName,
    filtersEqual,
    queryToString,
    queryToUrlQuery,
    stringObjectToQuery,
    queryToPrettyString,
    getScriptDifferences,
    tryFormatError,
    getScriptObjectCode,
    formatTag,
    makeScriptSfw,
    makeStringSfw,
    makeTagCategorySfw,
    makeScriptStubSfw,
    readFile,
    getSearchString,
};

//module.exports = ScriptUtils;
export default ScriptUtils;
