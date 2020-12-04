import Router from 'next/router'
import axios from 'axios'
import slugify from 'slugify'

import style from './AddScriptForm.module.css'

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

const handleSubmit = e => {

    const doRequest = async postData => {
        const res = await axios.post("https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/scripts", postData);
        console.log(res);
        Router.push("/");
    }

    e.preventDefault();

    const postData = {
        fields: {
            name: { stringValue: e.target.name.value},
            source: { stringValue: e.target.source.value},
            author: { stringValue: e.target.author.value},
            slug: { stringValue: slugify(e.target.name.value).toLowerCase()},
            description: { stringValue: e.target.description.value},
            thumbnail: { stringValue: e.target.thumbnail.value},
            duration: { integerValue: stringToDuration(e.target.duration.value)},
            views: { integerValue: 0},
            thumbsup: { integerValue: 1},
            thumbsdown: { integerValue: 0},
            created: { timestampValue: new Date()} ,
            modified: { timestampValue: new Date()} ,
        }
    };

    //console.log(fields);
    doRequest(postData);
}

const AddScriptForm = () => {
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Script Name</label>
            <input type="text" id="name" />
            <label htmlFor="source">Source Link</label>
            <input type="text" id="source" />
            <label htmlFor="author">Script Author</label>
            <input type="text" id="author" />
            <label htmlFor="thumbnail">Thumbnail Image URL</label>
            <input type="text" id="thumbnail" />
            <label htmlFor="duration">Script Duration</label>
            <input type="text" id="duration" />
            <label htmlFor="description">Script Description</label>
            <textarea id="description"></textarea>
            <input type="submit" value="Add Script"></input>
        </form>
    )
}

export default AddScriptForm;