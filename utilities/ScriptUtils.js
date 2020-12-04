const ScriptUtils = {
    parseScriptDocument: scriptDocument => {
        return {
            name: scriptDocument.fields.name.stringValue,
            slug: scriptDocument.fields.slug.stringValue,
            author: scriptDocument.fields.author.stringValue,
            duration: scriptDocument.fields.duration.integerValue,
            description: scriptDocument.fields.description.stringValue,
            source: scriptDocument.fields.source.stringValue,
            thumbnail: scriptDocument.fields.thumbnail.stringValue,
            created: scriptDocument.fields.created.timestampValue,
            modified: scriptDocument.fields.modified.timestampValue,
            likes: scriptDocument.fields.likes.integerValue,
            thumbsdown: scriptDocument.fields.thumbsdown.integerValue,
            thumbsup: scriptDocument.fields.thumbsup.integerValue,
            views: scriptDocument.fields.views.integerValue,
        }
    }
}

export default ScriptUtils;