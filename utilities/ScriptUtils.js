const durationToIndex = duration => {

}

const indexToDuration = index => {
    switch(index) {
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
}

const arraysIdentical = (a, b) => {
    if(!a && !b) return true;
    if(!a && b || a && !b) return false;
    if(a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) return false;
    }
    return true;
}

const parseScriptDocument = script => {

    const category = script.category ? script.category.name : script.categoryName || "Category";
    const creator = script.creator ? script.creator.name : script.creatorName || "Creator";
    const owner = script.owner ? script.owner.username : script.ownerName || "Owner";

    const output =  {
        id: script.id,
        name: script.name,
        slug: script.slug,
        creator,
        owner,
        category,
        tags: !script.tags ? [] : script.tags,
        description: script.description,
        duration: script.duration,
        thumbnail: script.thumbnail,
        sourceUrl: script.sourceUrl,
        streamingUrl: script.streamingUrl,
        studio: script.studio || "",
        talent: script.talent || [],
        active: script.active,
        created: script.created ? script.created.valueOf() : null,
        modified: script.modified ? script.modified.valueOf() : null,
        likes: script.likeCount,
        thumbsUp: script.thumbsUp,
        thumbsDown: script.thumbsDown,
        views: script.views,
        
        //SFW Overrides
        // name: !script.name ? "Script" : script.name.split("").reverse().join(""),
        // thumbnail: "https://planethifi.com/wp-content/uploads/2020/06/720p-696x448.jpg",
        // studio: !script.studio ? null : script.studio.split("").reverse().join(""),
        // category: !script.categoryName ? "Category" : script.categoryName.split("").reverse().join(""),
        // tags: !script.tags ? [] : script.tags.map(tag => tag.split("").reverse().join("")),
        // streamingUrl: "https://www.google.com",
        // sourceurl: "https://www.google.com"
    };
    return output;
}

const parseDatabaseLists = data => {
    console.log("Parsing Data", data);
    return {
        tags:       !data.tags       ? [] : data.tags.map(t => t.name),
        categories: !data.categories ? [] : data.categories.map(c => c.name),
        talent:     !data.talent     ? [] : data.talent.map(t => t.name),
        studios:    !data.studios    ? [] : data.studios.map(s => s.name),
        creators:   !data.creators   ? [] : data.creators.map(c => c.name),
    }
}

const parseDatabaseListsWithCount = data => {
    return {
        tags:       !data.tags       ? [] : data.tags.map(t => ({ name: t.name, count: t.count })),
        categories: !data.categories ? [] : data.categories.map(c => ({ name: c.name, count: c.count })),
        talent:     !data.talent     ? [] : data.talent.map(t => t.name),
        studios:    !data.studios    ? [] : data.studios.map(s => s.name),
        creators:   !data.creators   ? [] : data.creators.map(c => c.name),
    }
}

const durationToString = duration => {
    let output = "";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - (minutes * 60) - (hours * 3600);
    if(hours > 0) output += hours + ":";
    if(minutes > 0) output += minutes + ":";
    if(seconds >= 10) output += seconds;
    else if(seconds > 0) output += "0" + seconds;
    else output += "00";
    return output;
}

const stringToDuration = str => {
    const pieces = str.split(":");
    if(pieces.length === 1) {
        return parseInt(str);
    } else if(pieces.length === 2) {
        return 60 * parseInt(pieces[0]) + parseInt(pieces[1]);
    } else if(pieces.length === 3) {
        return 3600 * parseInt(pieces[0]) + 60 * parseInt(pieces[1]) + parseInt(pieces[0]);
    }

    return -1;
}

const stringIsValidDuration = str => {
    let pieces = str.split(":");
    //no more than three items (e.g. 3:55:22)
    if(pieces.length > 3) return false;

    //each pieces can only be two digits, and no decimals
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i].length > 2) return false;
        if(!pieces[i].match(/^[0-9]*$/)) return false;
    }

    //make sure that everything is a number, and for minutes/seconds, under 60
    pieces = pieces.map(s => parseInt(s));
    for(let i = 0; i < pieces.length; i++) {
        if(Number.isNaN(pieces[i])) return false;
        if(pieces[i] < 0) return false;
        if(i !== 0 && pieces[i] > 59) return false;
    }

    return true;
}

const viewsToString = views => {
    if(views > 1000000) {
        return (Math.round(views / 100000) / 10) + "M";
    }
    
    if(views > 10000) {
        return Math.round(views / 1000) + "k";
    }
    
    if(views > 1000) {
        return (Math.round(views / 100) / 10) + "k";
    }

    return Math.round(views) + "";
}

const thumbsToPercentage = (thumbsup, thumbsdown) => {
    const percentage = (thumbsup / (Number(thumbsup) + Number(thumbsdown)));
    return Math.round(percentage * 100.0);
}

const getSiteName = url => {
    return url.replace("http://", "").replace("https://", "").replace("www.", "").split("/")[0].toLowerCase();
}

const filtersEqual = (filterA, filterB) => {
    const stringArrayEqual = (arrayA, arrayB) => {
        if(arrayA && !arrayB || !arrayA && arrayB) return false;
        if(arrayA.length !== arrayB.length) return false;
        for(var i = 0; i < arrayA.length; i++) {
            if(arrayA[i] !== arrayB[i]) return false;
        }
        return true;
    }
    
    if(filterA.name || filterB.name) {
        if(filterA.name && !filterB.name || !filterA.name && filterB.name) return false;
        else if(filterA.name.contains !== filterB.name.contains) return false;
    }

    if(filterA.category || filterB.category) {
        if(filterA.category && !filterB.category || !filterA.category && filterB.category) return false;
        else if(filterA.category.name.equals !== filterB.category.name.equals) return false;
    }

    if(filterA.include || filterB.include) {
        if(filterA.include && !filterB.include || !filterA.include && filterB.include) return false;
        else if(!stringArrayEqual(filterA.include, filterB.include)) return false;
    }

    if(filterA.exclude || filterB.exclude) {
        if(filterA.exclude && !filterB.exclude || !filterA.exclude && filterB.exclude) return false;
        else if(!stringArrayEqual(filterA.exclude, filterB.exclude)) return false;
    }

    if(filterA.minDuration || filterB.minDuration) {
        if(filterA.minDuration && !filterB.minDuration || !filterA.minDuration && filterB.minDuration) return false;
        if(filterA.minDuration!== filterB.minDuration) return false;
    }

    if(filterA.maxDuration || filterB.maxDuration) {
        if(filterA.maxDuration && !filterB.maxDuration || !filterA.maxDuration && filterB.maxDuration) return false;
        if(filterA.maxDuration!== filterB.maxDuration) return false;
    }

    if(filterA.talent || filterB.talent) {
        if(filterA.talent && !filterB.talent || !filterA.talent && filterB.talent) return false;
        else if(filterA.talent.contains !== filterB.talent.contains) return false;
    }

    if(filterA.studio || filterB.studio) {
        if(filterA.studio && !filterB.studio || !filterA.studio && filterB.studio) return false;
        else if(filterA.studio.contains !== filterB.studio.contains) return false;
    }

    if(filterA.sourceUrl || filterB.sourceUrl) {
        if(filterA.sourceUrl && !filterB.sourceUrl || !filterA.sourceUrl && filterB.sourceUrl) return false;
    }
    if(filterA.streamingUrl || filterB.streamingUrl) {
        if(filterA.streamingUrl && !filterB.streamingUrl || !filterA.streamingUrl && filterB.streamingUrl) return false;
    }

    return true;
}

//goes from a filters object applied to the database and turns it into a query object to be turned into a URL query strin
const objectToQuery = input => {
    if(!input) return "";
    
    const filters = input.filters;
    const sorting = input.sorting;
    const page = input.page;
    const defaultSorting = (sorting && sorting.length > 0 && sorting[0].created && sorting[0].created === "desc");
    const defaultPage = page && page == 1;
    if(defaultSorting && defaultPage && (!filters || Object.keys(filters).length === 0)) return "";

    let output = {};
    if(filters.name) output.search = filters.name.contains;
    if(filters.category) output.category = filters.category.name.equals;
    if(filters.include) output.include = filters.include.join("+");
    if(filters.exclude) output.exclude = filters.exclude.join("+");
    if(filters.minDuration) output.minDuration = filters.minDuration;
    if(filters.maxDuration) output.maxDuration = filters.maxDuration;
    if(filters.talent) output.talent = filters.talent.contains;
    if(filters.studio) output.studio = filters.studio.contains;
    if(filters.sourceUrl) output.sourceUrl = "true";
    if(filters.streamingUrl) output.streamingUrl = "true";

    if(!defaultSorting && sorting && sorting.length > 0) {
        output.sorting = `${Object.keys(sorting[0])[0]}+${sorting[0][Object.keys(sorting[0])[0]]}`;
    }
    if(!defaultPage && page) {
        output.page = page;
    }

    return output;
}
//goes from a query object parsed from a URL string and turns it into a filter object to be applied to the databas
const queryToObject = query => {
    let output = {filters: {}, sorting: {created: "desc"}, page: 1};

    if(query.search) output.filters.name = { contains: query.search, mode: "insensitive" };
    if(query.category) output.filters.category = {name: {equals: query.category}};
    if(query.include) output.filters.include = query.include.split(" ");
    if(query.exclude) output.filters.exclude = query.exclude.split(" ");
    if(query.minDuration) output.filters.minDuration = query.minDuration;
    if(query.maxDuration) output.filters.maxDuration = query.maxDuration;
    if(query.talent) output.filters.talent = { contains: query.talent, mode: "insensitive" };
    if(query.studio) output.filters.studio = { contains: query.studio, mode: "insensitive" };
    if(query.sourceUrl) output.filters.sourceUrl = { not: null };
    if(query.streamingUrl) output.filters.streamingUrl = { not: null };
    if(query.sorting) {
        const pieces = query.sorting.split(" ");
        output.sorting = [{[pieces[0]]: pieces[1]}];
    }
    if(query.page) {
        output.page = query.page;
    }

    return output;
}

const queryToString = query => {
    let finalQuery = {...query};
    if(Object.keys(finalQuery).length === 0) return "";
    return "?" + Object.keys(finalQuery).map(key => `${key}=${finalQuery[key]}`).join("&");
}

const queryToPrettyString = queryString => {
    let pieces = queryString.substring(1).split("&");
    let params = {};
    pieces.forEach(param => {
        const subPieces = param.split("=").map(str => str.substr(0, 1).toUpperCase() + str.substr(1));
        params[subPieces[0]] = subPieces[1];
    })

    let output = {};

    if(params.MinDuration) {
        const min = indexToDuration(Number(params.MinDuration)) / 60.0;

        if(params.MaxDuration) {
            const max = indexToDuration(Number(params.MaxDuration)) / 60.0;
            params.Duration = min + " - " + max + " min";

            delete params.MaxDuration;
        } else {
            params.Duration = ">" + min + " min";
        }
        delete params.MinDuration;
    } else if(params.MaxDuration) {
        const max = indexToDuration(Number(params.MaxDuration)) / 60.0;
        params.Duration = "<" + max + " min";
        delete params.MaxDuration;
    }
    if(params.Search) {
        params.Search = `"${params.Search}"`;
        output.search = params.Search;
        delete params.Search;
    }
    if(params.Sorting) {
        let subPieces = params.Sorting.split("+");
        if(subPieces.length > 1) {
            if(subPieces[1] === "asc") subPieces[1] = "Ascending";
            else if(subPieces[1] === "desc") subPieces[1] = "Descending";
            params.Sorting = `${subPieces[0]} (${subPieces[1]})`;
        }
        output.sorting = params.Sorting;
        delete params.Sorting;
    }
    output = {...output, params, queryString};

    return output;
}

const getScriptDifferences = (oldScript, newScript) => {
    console.warn("Diffing data");
    let output = {};

    //merge keys to get full list of properties on both objects
    let keys = Object.keys(oldScript);
    let newKeys = Object.keys(newScript);
    newKeys.forEach(key => {
        if(keys.findIndex(k => k === key) === -1) keys.push(key);
    })

    //find differences between an 'old' script and a 'new' script
    //used to update the database when editing a script
    keys.forEach(key => {
        const oldValue = oldScript[key];
        const newValue = newScript[key];
        if(oldValue && newValue) {
            if(Array.isArray(oldValue)) {
                if(!arraysIdentical(oldValue, newValue)) {
                    output[key] = newValue;
                }
            } else if(oldValue != newValue) {
                output[key] = newValue;
            }
        } else if(oldValue && !newValue) {
            output[key] = null;
        } else if(!oldValue && newValue) {
            output[key] = newValue;
        }
    })

    return output;
}

const tryFormatError = error => {
    const searchString = "user_facing_error: Some(KnownError { message: ";

    try {
        const startIndex = error.indexOf(searchString);
        if(startIndex === -1) {
            console.log("Failed to find starting string, returning original error", error)
            return error;
        }
        let output = error.substr(startIndex + searchString.length + 1);
        const endIndex = output.indexOf("\"");
        if(endIndex === -1) {
            console.log("Failed to find end quotation, returning original error", error)
            return error;
        }
        return output.substr(0, endIndex);
    } catch(e) {
        //console.log("Failed to format error", error, e);
    }
}

const ScriptUtils = {
    parseScriptDocument,
    indexToDuration,
    parseDatabaseLists,
    parseDatabaseListsWithCount,
    durationToString,
    stringToDuration,
    stringIsValidDuration,
    viewsToString,
    thumbsToPercentage,
    getSiteName,
    filtersEqual,
    queryToString,
    objectToQuery,
    queryToObject,
    queryToPrettyString,
    getScriptDifferences,
    tryFormatError
}

export default ScriptUtils;