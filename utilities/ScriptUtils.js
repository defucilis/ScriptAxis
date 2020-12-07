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
    }
}

export default ScriptUtils;