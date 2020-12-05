import Router from 'next/router'
import slugify from 'slugify'
import firebase from '../utilities/Firebase'

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
        const db = firebase.firestore();
        const dbQuery = db.collection("scripts");
        const data = await dbQuery.add(postData);
        Router.push("/");
    }

    e.preventDefault();

    const postData = {
        name: e.target.name.value,
        source: e.target.source.value,
        author: e.target.author.value,
        slug: slugify(e.target.name.value).toLowerCase(),
        description: e.target.description.value,
        thumbnail: e.target.thumbnail.value,
        duration: stringToDuration(e.target.duration.value),
        views: 0,
        thumbsup: 1,
        thumbsdown: 0,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        modified: firebase.firestore.Timestamp.fromDate(new Date()),
        likes: 0,
    };

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