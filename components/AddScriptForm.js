import {useState} from 'react'
import Router from 'next/router'
import slugify from 'slugify'
import firebase from '../utilities/Firebase'
import FirebaseUtils from '../utilities/FirebaseUtils'

import {useDropzone} from 'react-dropzone'

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

const AddScriptForm = () => {
    const getFile = files => {
        setThumbnailFile(files[0]);
    }

    const reportFileError = rejections => {
        alert(rejections[0].errors[0].message);
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: [
            "image/png",
            "image/jpeg"
        ],
        maxSize: 2000000, //2MB
        multiple: false,
        noKeyboard: true,
        preventDropOnDocument: true,
        onDropAccepted: getFile,
        onDropRejected: reportFileError
    });

    const [thumbnailFile, setThumbnailFile] = useState(null);

    const handleSubmit = e => {

        e.preventDefault();

        if(thumbnailFile === null) {
            alert("No thumbnail provided!");
            return;
        }

        const doRequest = async postData => {
            const fileUrl = await FirebaseUtils.uploadFile(thumbnailFile, `thumbnails/thumbnail_${postData.slug}`, progress => console.log(progress));
            postData.thumbnail = fileUrl;

            const db = firebase.firestore();
            const dbQuery = db.collection("scripts");
            const data = await dbQuery.add(postData);
            Router.push("/");
        }
    
    
        const postData = {
            name: e.target.name.value,
            source: e.target.source.value,
            author: e.target.author.value,
            slug: slugify(e.target.name.value).toLowerCase(),
            description: e.target.description.value,
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

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Script Name</label>
            <input type="text" id="name" />
            <label htmlFor="source">Source Link</label>
            <input type="text" id="source" />
            <label htmlFor="author">Script Author</label>
            <input type="text" id="author" />
            <div {...getRootProps({className: style.dropzone})}>
                <input {...getInputProps()} />
                {
                <p>{!thumbnailFile || thumbnailFile.name === "" 
                    ? "Drag + drop a thumbnail image, or click to select one" 
                    : `${thumbnailFile.name} (${(thumbnailFile.size / (thumbnailFile.size > 1000000 ? 1000000 : 1000)).toFixed(1)} ${(thumbnailFile.size > 1000000 ? "MB" : "kB")})`}
                </p>
                }
            </div>
            <label htmlFor="duration">Script Duration</label>
            <input type="text" id="duration" />
            <label htmlFor="description">Script Description</label>
            <textarea id="description"></textarea>
            <input type="submit" value="Add Script"></input>
        </form>
    )
}

export default AddScriptForm;