const ScriptUtils = {
    parseScriptDocument: script => {
        const output =  {
            id: script.id,
            name: script.name,
            //name: "Debug Name",
            slug: script.slug,
            creator: script.creatorName,
            owner: script.owner,
            category: script.categoryName || null,
            tags: !script.tags ? [] : script.tags,
            description: script.description,
            duration: script.duration,
            thumbnail: script.thumbnail,
            //thumbnail: "https://planethifi.com/wp-content/uploads/2020/06/720p-696x448.jpg",
            sourceUrl: script.sourceUrl,
            streamingUrl: script.streamingUrl,
            studio: script.studio,
            talent: script.talent || [],
            active: script.active,
            created: script.created.valueOf(),
            modified: script.modified.valueOf(),
            likes: script.likeCount,
            thumbsUp: script.thumbsUp,
            thumbsDown: script.thumbsDown,
            views: script.views,
        };
        return output;
    },
    durationToString: duration => {
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
    },
    stringToDuration: str => {
        const pieces = str.split(":");
        if(pieces.length === 1) {
            return parseInt(str);
        } else if(pieces.length === 2) {
            return 60 * parseInt(pieces[0]) + parseInt(pieces[1]);
        } else if(pieces.length === 3) {
            return 3600 * parseInt(pieces[0]) + 60 * parseInt(pieces[1]) + parseInt(pieces[0]);
        }
    
        return -1;
    },
    viewsToString: views => {
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
    },
    thumbsToPercentage: (thumbsup, thumbsdown) => {
        const percentage = (thumbsup / (Number(thumbsup) + Number(thumbsdown)));
        return Math.round(percentage * 100.0);
    },
    getPrettyCategory: category => {
        //return category.substr(0, 2).toUpperCase() + Math.round(Math.random() * 100);

        let prettyName = category.replace("-", " ");
        if(prettyName.length < 4) return prettyName.toUpperCase();

        return prettyName
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    },
    getSiteName: url => {
        return url.replace("http://", "").replace("https://", "").replace("www.", "").split("/")[0].toLowerCase();
    }, 
    filtersEqual: (filterA, filterB) => {
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

        return true;
    },
    objectToQuery: input => {
        if(!input) return "";
        
        const filters = input.filters;
        const sorting = input.sorting;
        const defaultSorting = (sorting && sorting.length > 0 && sorting[0].created && sorting[0].created === "desc");
        if(defaultSorting && (!filters || Object.keys(filters).length === 0)) return "";

        let output = {};
        if(filters.name) output.search = filters.name.contains;
        if(filters.category) output.category = filters.category.name.equals;
        if(filters.include) output.include = filters.include.join("+");
        if(filters.exclude) output.exclude = filters.exclude.join("+");
        if(filters.minDuration) output.minDuration = filters.minDuration;
        if(filters.maxDuration) output.maxDuration = filters.maxDuration;
        if(filters.talent) output.talent = filters.talent.contains;
        if(filters.studio) output.studio = filters.studio.contains;

        if(!defaultSorting && sorting && sorting.length > 0) {
            output.sorting = `${Object.keys(sorting[0])[0]}+${sorting[0][Object.keys(sorting[0])[0]]}`;
        }

        return output;
    },
    queryToObject: query => {
        let output = {filters: {}, sorting: {created: "desc"}};

        if(query.search) output.filters.name = { contains: query.search, mode: "insensitive" };
        if(query.category) output.filters.category = {name: {equals: query.category}};
        if(query.include) output.filters.include = query.include.split(" ");
        if(query.exclude) output.filters.exclude = query.exclude.split(" ");
        if(query.minDuration) output.filters.minDuration = query.minDuration;
        if(query.maxDuration) output.filters.maxDuration = query.maxDuration;
        if(query.talent) output.filters.talent = { contains: query.talent, mode: "insensitive" };
        if(query.studio) output.filters.studio = { contains: query.studio, mode: "insensitive" };
        if(query.sorting) {
            const pieces = query.sorting.split(" ");
            output.sorting = [{[pieces[0]]: pieces[1]}];
        }

        return output;
    },
    queryToString: query => {
        if(Object.keys(query).length === 0) return "";
        return "?" + Object.keys(query).map(key => `${key}=${query[key]}`).join("&");
    }
}

export default ScriptUtils;