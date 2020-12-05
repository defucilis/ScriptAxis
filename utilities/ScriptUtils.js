const ScriptUtils = {
    parseScriptDocument: scriptDocument => {
        const script = scriptDocument.data();
        return {
            id: scriptDocument.id,
            name: script.name,
            slug: script.slug,
            author: script.author,
            duration: script.duration,
            description: script.description,
            source: script.source,
            thumbnail: script.thumbnail,
            category: script.category || null,
            tags: script.tags || [],
            created: script.created.toMillis(),
            modified: script.modified.toMillis(),
            likes: script.likes,
            thumbsdown: script.thumbsdown,
            thumbsup: script.thumbsup,
            views: script.views,
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
    },
    getPrettyCategory: category => {
        let prettyName = category.replace("-", " ");
        if(prettyName.length < 4) return prettyName.toUpperCase();

        return prettyName
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}

export default ScriptUtils;