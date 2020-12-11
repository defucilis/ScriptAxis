import {useState, useEffect} from 'react'
import Router from 'next/router';

import axios from 'axios'
import slugify from 'slugify'
import { FaCog } from 'react-icons/fa'

import FirebaseUtils from '../utilities/FirebaseUtils'
import ScriptUtils from '../utilities/ScriptUtils'
import ScriptForm from './ScriptForm';
import style from './AddScript.module.css'

const EditScript = ({script, tags, categories, talent, studios, creators}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [oldFormData, setOldFormData] = useState({});
    useEffect(() => {
        console.warn("Script changed");
        const data = {
            name: script.name || "",
            slug: script.slug,
            owner: script.owner.id,
            creator: script.creator || "",
            category: script.category || "",
            tags: script.tags || [],
            description: script.description || "",
            duration: ScriptUtils.durationToString(script.duration),
            thumbnail: [],
            sourceUrl: script.sourceUrl || "",
            streamingUrl: script.streamingUrl || "",
            studio: script.studio || "",
            talent: script.talent || [],
            created: new Date(script.created),
        };
        setFormData({...data});
        setOldFormData({...data})
    }, [script])

    const handleValidationPassed = data => {

        console.log("Validation passed for data", data);

        setSubmitting(true);
        updateScript({...data, id: script.id}, {...oldFormData, id: script.id}, response => {
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
            setFormData(data);
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
                submitLabel="Update Script"
            />
        )
    )
}

const updateScript = async (newPostData, oldPostData, onSuccess, onFail) => {

    let oldData = {...oldPostData};
    let newData = {...newPostData};

    //upload the thumbnail and add it to the database
    try {
        if(newData.thumbnail.length > 0 && false) {
            await FirebaseUtils.deleteFile(`thumbnails/thumbnail_${oldData.slug}`);
            const fileUrl = await FirebaseUtils.uploadFile(
                newData.thumbnail[0], 
                `thumbnails/thumbnail_${newData.slug}`, 
                progress => console.log("Thumbnail File uploading", progress * 100)
            );
            newData.thumbnail = fileUrl;
        }
    } catch(error) {
        onFail(error);
    }

    //Modify the form data to match what shoud be in the database
    newData.slug = slugify(newData.name, {lower: true});
    oldData.slug = slugify(oldData.name, {lower: true});

    newData.category = slugify(newData.category, {lower: true});
    oldData.category = slugify(oldData.category, {lower: true});

    newData.tags = newData.tags ? newData.tags.map(tag => slugify(tag, {lower: true})) : [];
    oldData.tags = oldData.tags ? oldData.tags.map(tag => slugify(tag, {lower: true})) : [];

    newData.duration = ScriptUtils.stringToDuration(newData.duration);
    oldData.duration = ScriptUtils.stringToDuration(oldData.duration);

    newData.created = newData.created.valueOf();
    oldData.created = oldData.created.valueOf();

    //remove any duplicate data
    const diffData = ScriptUtils.getScriptDifferences(oldData, newData);

    if(Object.keys(diffData).length === 0) {
        onFail("You didn't make any changes!")
        return;
    }

    let finalUpdateData = {
        id: newPostData.id, 
        set: {}, 
        remove: {}, 
        add: {}
    };
    Object.keys(diffData).forEach(key => {
        finalUpdateData.set[key] = diffData[key];
    })

    //these values refer to other tables, so they need fancier treatment
    if(diffData.creator) {
        finalUpdateData.remove.creator = oldPostData.creator;
        finalUpdateData.add.creator = newPostData.creator;
    }
    if(diffData.category) {
        finalUpdateData.remove.category = oldPostData.category;
        finalUpdateData.add.category = newPostData.creator;
    }
    if(diffData.tags) {
        finalUpdateData.remove.tags = oldPostData.tags.filter(tag => newPostData.findIndex(t => t === tag) === -1);
        finalUpdateData.add.tags = newPostData.tags.filter(tag => oldPostData.findIndex(t => t === tag) === -1);
    }
    if(diffData.talent) {
        finalUpdateData.remove.talent = oldPostData.talent.filter(talent => newPostData.findIndex(t => t === talent) === -1);
        finalUpdateData.add.talent = newPostData.talent.filter(talent => oldPostData.findIndex(t => t === talent) === -1);
    }

    console.warn("Final diff data", diffData);
    onFail("Skipping for now");
    return;

    try {
        const response = await axios.post("/api/scripts/update", finalUpdateData);
        onSuccess(response.data);
    } catch(error) {
        onFail(error);
    };
}

export default EditScript;