import {useState} from 'react'
import Router from 'next/router';

import axios from 'axios'
import slugify from 'slugify'
import { FaCog } from 'react-icons/fa'

import FirebaseUtils from '../utilities/FirebaseUtils'
import ScriptUtils from '../utilities/ScriptUtils'
import ScriptForm from './ScriptForm';
import style from './AddScript.module.css'

const defaultFormData = {
    name: "",
    creator: "",
    category: "",
    tags: [],
    description: "",
    duration: "",
    thumbnail: [],
    sourceUrl: "",
    streamingUrl: "",
    studio: "",
    talent: [],
    created: (new Date()),
};

const AddScript = ({tags, categories, talent, studios, creators}) => {
    const [submitting, setSubmitting] = useState(false);

    const handleValidationPassed = data => {
        setSubmitting(true);
        createScript(data, response => {
            console.log("Script created successfully", response);
            if(Router.pathname === "/add")
                Router.push(`/script/${response[0].slug}`);
            else {
                if(confirm("Your script has finished processing. Click OK to go to its page, or Cancel to stay where you are.\nIn the future I'll make this a little less annoying!")) {
                    Router.push(`/script/${response[0].slug}`);
                }
            }
        }, error => {
            console.log("Upload failed", error);
            setSubmitting(false);
        });
    }

    return (
        submitting ? (
            <div className={style.processing}>
                <p>
                    <span><FaCog /></span>
                    <span>Your script is processing - this may take up to a minute or two.</span>
                    <span>Feel free to leave this page, it will appear on the site when it's finished processing.</span>
                    <span>Alternatively, you can wait here - once your script is ready you will be automatically redirected.</span>
                </p>
            </div>
        ) : (
            <ScriptForm 
                tags={tags} categories={categories} 
                talent={talent} studios={studios} 
                creators={creators}
                onValidationPassed={handleValidationPassed}
                defaultFormData={defaultFormData}
                submitLabel="Add Script"
            />
        )
    )
}

const createScript = async (postData, onSuccess, onFail) => {

    const data = {...postData}

    //upload the thumbnail and add it to the database
    try {
        const fileUrl = await FirebaseUtils.uploadFile(
            data.thumbnail[0], 
            `thumbnails/thumbnail_${data.slug}`, 
            progress => console.log("Thumbnail File uploading", progress * 100)
        );
        data.thumbnail = fileUrl;
    } catch(error) {
        onFail(error);
    }

    //modify the form data into something useful for the database
    data.slug = slugify(data.name, {lower: true});
    data.category = slugify(data.category, {lower: true});
    data.tags = data.tags ? data.tags.map(tag => slugify(tag, {lower: true})) : null;
    data.duration = ScriptUtils.stringToDuration(data.duration);

    try {
        const response = await axios.post("/api/scripts/create", data);
        onSuccess(response.data);
    } catch(error) {
        onFail(error);
    };
}

export default AddScript;