import {useState, useEffect} from 'react'
import Router from 'next/router';

import axios from 'axios'
import slugify from 'slugify'
import { FaCog } from 'react-icons/fa'

import FirebaseUtils from '../../utilities/FirebaseUtils'
import ScriptUtils from '../../utilities/ScriptUtils'
import ScriptForm from './ScriptForm';
import style from './AddScript.module.css'

const EditScript = ({script, tags, categories, talent, studios, creators}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [oldFormData, setOldFormData] = useState({});
    const [formError, setFormError] = useState("");
    useEffect(() => {
        console.warn("Script changed");

        //don't show the category in the tag list
        let trimmedTags = script.tags || [];
        trimmedTags = trimmedTags.filter(t => t !== script.category);

        const data = {
            name: script.name || "",
            slug: script.slug,
            owner: script.owner.id,
            creator: script.creator || "",
            category: script.category || "",
            tags: trimmedTags,
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
            setFormError(ScriptUtils.tryFormatError(error.message));
            setSubmitting(false);
        });
    }

    return (
        submitting ? (
            <div className={style.processing}>
                <p>
                    <span><FaCog /></span>
                    <span>Your script is processing - this may take up to a minute or two.</span>
                    <span>Please don't leave this page - once your script has been updated you will be automatically redirected.</span>
                </p>
            </div>
        ) : (
            <>
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
                busy={submitting}
            />
            {formError ? <pre style={{color: "salmon"}}>{formError}</pre> : null}
            </> //
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

    //the values that can just be straight set
    if(diffData.name) finalUpdateData.set.name = diffData.name;
    if(diffData.slug) finalUpdateData.set.slug = diffData.slug;
    if(diffData.description) finalUpdateData.set.description = diffData.description;
    if(diffData.duration) finalUpdateData.set.duration = diffData.duration;
    if(diffData.thumbnail) finalUpdateData.set.thumbnail = diffData.thumbnail;
    if(diffData.sourceUrl) finalUpdateData.set.sourceUrl = diffData.sourceUrl;
    if(diffData.streamingUrl) finalUpdateData.set.streamingUrl = diffData.streamingUrl;
    if(diffData.studio) finalUpdateData.set.studio = diffData.studio;
    if(diffData.created) finalUpdateData.set.created = diffData.created;

    //lists of strings need to be handled slightly differently...
    if(diffData.tags) finalUpdateData.set.tags = newData.tags;
    if(diffData.talent) finalUpdateData.set.talent = newData.talent;

    //these values refer to other tables, so they need fancier treatment
    if(diffData.creator) {
        finalUpdateData.remove.creator = oldPostData.creator;
        finalUpdateData.add.creator = newPostData.creator;
    }
    if(diffData.category) {
        finalUpdateData.remove.category = oldPostData.category;
        finalUpdateData.add.category = newPostData.category;

        //we also need to remove the 'category tag' from the script and add the new category as a tag
        //this is actually done in the next if block, but this flag ensures that the new tag list contains the new category
        diffData.tags = true;
        newPostData.tags = [...newPostData.tags.filter(t => t !== oldPostData.category), newPostData.category];
        if(finalUpdateData.set.tags) finalUpdateData.set.tags.push(newData.category);
        else finalUpdateData.set.tags = [...newData.tags, newData.category];
    }
    if(diffData.tags) {
        finalUpdateData.remove.tags = oldPostData.tags.filter(tag => newPostData.tags.findIndex(t => t === tag) === -1);
        finalUpdateData.add.tags = newPostData.tags.filter(tag => oldPostData.tags.findIndex(t => t === tag) === -1);
    }
    if(diffData.talent) {
        finalUpdateData.remove.talent = oldPostData.talent.filter(talent => newPostData.talent.findIndex(t => t === talent) === -1);
        finalUpdateData.add.talent = newPostData.talent.filter(talent => oldPostData.talent.findIndex(t => t === talent) === -1);
    }

    console.warn("Final Data", finalUpdateData);
    //onFail("Skipping for now");
    //return;

    try {
        const response = await axios.post("/api/scripts/update", finalUpdateData);
        if(response.data.error) throw response.data.error;
        onSuccess(response.data);
    } catch(error) {
        onFail(error);
    };
}

export default EditScript;