import {useState, useEffect, useRef} from 'react'
import Router from 'next/router'
import slugify from 'slugify'
import FirebaseUtils from '../utilities/FirebaseUtils'
import ScriptUtils from '../utilities/ScriptUtils'
import axios from 'axios'

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

            try {
                const response = await axios.post("/api/scripts/create", postData);
                console.log(response);
                Router.push("/");
            } catch(error) {
                console.log("Failed with error", error.response.data);
                alert("Failed with error:\n" + JSON.stringify(error.response.data));
            };
        }

        const postData = {
            name: e.target.name.value,
            slug: slugify(e.target.name.value).toLowerCase(),
            creator: e.target.creator.value,
            owner: "9cf9dc87-a8cf-4c17-bb95-1f5c05b8d791", //todo - use the currently signed in user once that's built
            sourceUrl: e.target.source.value,
            description: e.target.description.value,
            duration: stringToDuration(e.target.duration.value),
            category: e.target.category.value,
            tags: [e.target.category.value, ...chosenTags],
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
            <label htmlFor="creator">Creator</label>
            <input type="text" id="creator" />
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
                whitelist={tags}
                blacklist={categories}
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