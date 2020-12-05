import {useState, useEffect, useRef} from 'react'
import Router from 'next/router'
import slugify from 'slugify'
import firebase from '../utilities/Firebase'
import FirebaseUtils from '../utilities/FirebaseUtils'
import ScriptUtils from '../utilities/ScriptUtils'

import {useDropzone} from 'react-dropzone'

import dynamic from 'next/dynamic'
const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

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

const AddScriptForm = ({tags, categories}) => {
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
            //upload the thumbnail and add it to the database
            const fileUrl = await FirebaseUtils.uploadFile(thumbnailFile, `thumbnails/thumbnail_${postData.slug}`, progress => console.log((progress * 100) + "%"));
            postData.thumbnail = fileUrl;

            //Get the ID of the new record, and create it
            const db = firebase.firestore();
            let dbQuery = db.collection("scripts").doc();
            const newId = dbQuery.id;
            let dbData = await dbQuery.set(postData);
            

            //Operate on tags
            postData.tags.forEach(async tag => {
                dbQuery = db.collection("tags").doc(tag);

                if(tags.findIndex(t => t === tag) === -1) {
                    //If the tag is new, add it to the database
                    await dbQuery.set({
                        scripts: [newId]
                    });
                } else {
                    //Otherwise, add the new script to it
                    await dbQuery.update({
                        scripts: firebase.firestore.FieldValue.arrayUnion(newId)
                    });
                }
            })

            //Add the new script to the chosen category
            dbQuery = db.collection("categories").doc(postData.category);
            await dbQuery.update({
                scripts: firebase.firestore.FieldValue.arrayUnion(newId)
            });

            Router.push("/");
        }

        const postData = {
            name: e.target.name.value,
            source: e.target.source.value,
            author: e.target.author.value,
            slug: slugify(e.target.name.value).toLowerCase(),
            description: e.target.description.value,
            duration: stringToDuration(e.target.duration.value),
            category: e.target.category.value,
            tags: [e.target.category.value, ...chosenTags],
            views: 0,
            thumbsup: 1,
            thumbsdown: 0,
            created: firebase.firestore.Timestamp.fromDate(new Date()),
            modified: firebase.firestore.Timestamp.fromDate(new Date()),
            likes: 0,
        };
    
        doRequest(postData);
    }

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [chosenTags, setChosenTags] = useState([]);
    useEffect(() => {
        if(!categories) return;

        setCategoryOptions(categories.map(category => {
            const prettyName = ScriptUtils.getPrettyCategory(category);
            return <option key={category} value={category}>{prettyName}</option>
        }));
    }, [categories])

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="source">Link to Source</label>
            <input type="text" id="source" />
            <label htmlFor="author">Author</label>
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
            <label htmlFor="category">Category</label>
            <select id="category">
                {categoryOptions}
            </select>
            <label htmlFor="tags">Tags</label>
            <Tags 
                className={style.tags}
                settings = {
                    {
                        whitelist: tags,
                        blacklist: categories,
                        validate: tag => {
                            const transformedTag = tag.value.trim().toLowerCase();
                            const match = transformedTag.match("[a-z ]+");
                            const success = match && match.length === 1 && match[0].length === transformedTag.length;
                            return success 
                                ? true 
                                : "Letters only!";
                        }
                    }
                }
                onChange={e => {
                    e.persist();
                    if(!e.target.value || e.target.value.length === 0) {
                        setChosenTags([]);
                        return;
                    }
                    const json = JSON.parse(e.target.value);
                    setChosenTags(json.map(tag => tag.value.trim().toLowerCase().replace(" ", "-")));
                }}
            />
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" />
            <label htmlFor="description">Description</label>
            <textarea id="description"></textarea>
            <input type="submit" value="Add Script"></input>
        </form>
    )
}

export default AddScriptForm;