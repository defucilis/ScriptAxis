const ScriptUtils = {
    parseScriptDocument: scriptDocument => {
        console.log(scriptDocument);
        return {
            name: scriptDocument.name,
            slug: scriptDocument.slug,
            author: scriptDocument.author,
            duration: scriptDocument.duration,
            description: scriptDocument.description,
            source: scriptDocument.source,
            thumbnail: scriptDocument.thumbnail,
            created: scriptDocument.created.toMillis(),
            modified: scriptDocument.modified.toMillis(),
            likes: scriptDocument.likes,
            thumbsdown: scriptDocument.thumbsdown,
            thumbsup: scriptDocument.thumbsup,
            views: scriptDocument.views,
        }
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
    }
}

export default ScriptUtils;