import {useState} from 'react'
import Router from 'next/router';

import axios from 'axios'
import slugify from 'slugify'
import { FaCog } from 'react-icons/fa'
import * as imageConversion from 'image-conversion'

import FirebaseUtils from '../../utilities/FirebaseUtils'
import ScriptUtils from '../../utilities/ScriptUtils'
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
            //ensure the homepage reloads properly
            window.localStorage.removeItem("recentScriptsTime");
            if(Router.pathname === "/add")
                Router.push(`/script/${response[0].slug}`);
            else {
                if(confirm("Your script has finished processing. Click OK to go to its page, or Cancel to stay where you are.\nIn the future I'll make this a little less annoying!")) {
                    Router.push(`/script/${response[0].slug}`);
                }
            }
        }, error => {
            window.alert("Upload failed - " + ScriptUtils.tryFormatError(error.message));
            console.log("Upload failed", ScriptUtils.tryFormatError(error.message));
            setSubmitting(false);
        });
    }

    return (
        submitting ? (
            <div className={style.processing}>
                <p>
                    <span><FaCog /></span>
                    <span>Your script is processing - this may take up to a minute or two.</span>
                    <span>Please don't leave this page - once your script has finished processing you will be automatically redirected.</span>
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
                busy={submitting}
            />
        )
    )
}

const createScript = async (postData, onSuccess, onFail) => {

    const data = {...postData}

    console.log(data);
    
    data.slug = slugify(data.name, {lower: true, strict: true});

    if(data.thumbnail.length > 0) {
        //upload the thumbnail and add it to the database
        try {
            const compressedFile = await imageConversion.compressAccurately(data.thumbnail[0], {
                size: 100,
                type: "image/jpeg"
            });
            const fileUrl = await FirebaseUtils.uploadFile(
                compressedFile, 
                `thumbnails/${data.slug}`, 
                progress => console.log("Thumbnail File uploading", progress * 100)
            );
            data.thumbnail = fileUrl;
        } catch(error) {
            onFail(error);
            return;
        }
    } else {
        data.thumbnail = "/img/placeholder-thumbnail.png";
    }

    const testDataString = ScriptUtils.getScriptObjectCode(data);
    try {
        await navigator.clipboard.writeText(testDataString);
        console.log("Wrote data to clipboard");
    } catch(error) {
        console.error("Failed to write test data to clipboard", error);
    }

    //modify the form data into something useful for the database
    data.duration = ScriptUtils.stringToDuration(data.duration);

    try {
        const response = await axios.post("/api/scripts/create", data);
        if(response.data.error) throw response.data.error;
        onSuccess(response.data);
    } catch(error) {
        onFail(error);
    };
}

export default AddScript;