import {useState, useEffect} from 'react'
import Router from 'next/router';

import axios from 'axios'
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

const EditScript = ({script, tags, categories, talent, studios, creators}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        setFormData({
            name: script.name,
            creator: script.creator,
            category: script.category,
            tags: script.tags,
            description: script.description,
            duration: ScriptUtils.durationToString(script.duration),
            thumbnail: [],
            sourceUrl: script.sourceUrl,
            streamingUrl: script.streamingUrl,
            studio: script.studio,
            talent: script.talent,
            created: new Date(script.created),
        })
    }, [script])

    const handleValidationPassed = data => {

        console.log("Validation passed for data", data);
        setSubmitting(true);
        setTimeout(() => {
            alert("Todo - actually update the script with data\n" + JSON.stringify(data));
            setSubmitting(false);
        }, 1000);
        return;

        setSubmitting(true);
        updateScript(data, response => {
            console.log("Script updated successfully", response);
            if(Router.pathname.includes("/edit"))
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
                    <span>Feel free to leave this page, its information will be updated once it's finished processing.</span>
                    <span>Alternatively, you can wait here - once your script has been updated you will be automatically redirected.</span>
                </p>
            </div>
        ) : (
            <ScriptForm 
                tags={tags} categories={categories} 
                talent={talent} studios={studios} 
                creators={creators}
                onValidationPassed={handleValidationPassed}
                defaultFormData={formData}
                options={{
                    thumbnailOptional: true
                }}
            />
        )
    )
}

const updateScript = async (postData, onSuccess, onFail) => {
    //upload the thumbnail and add it to the database
    try {
        const fileUrl = await FirebaseUtils.uploadFile(
            postData.thumbnail[0], 
            `thumbnails/thumbnail_${postData.slug}`, 
            progress => console.log("Thumbnail File uploading", progress * 100)
        );
        postData.thumbnail = fileUrl;
    } catch(error) {
        onFail(error);
    }

    postData.duration = ScriptUtils.stringToDuration(postData.duration);

    try {
        const response = await axios.post("/api/scripts/create", postData);
        onSuccess(response.data);
    } catch(error) {
        onFail(error);
    };
}

export default EditScript;