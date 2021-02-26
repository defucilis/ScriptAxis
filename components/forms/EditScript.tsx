import { useState, useEffect } from "react";
import Router from "next/router";

import axios from "axios";
import slugify from "slugify";
import { FaCog } from "react-icons/fa";
import * as imageConversion from "image-conversion";

import FirebaseUtils from "../../lib/FirebaseUtils";
import ScriptUtils from "../../lib/ScriptUtils";
import ScriptForm, { EditScriptFormData, ScriptFormDataOutput } from "./ScriptForm";
import style from "./AddScript.module.css";
import { Script, StringLists } from "lib/types";

const EditScript = ({
    script,
    tags,
    categories,
    talent,
    studios,
    creators,
}: StringLists & {
    script: Script;
}): JSX.Element => {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<EditScriptFormData>({});
    const [oldFormData, setOldFormData] = useState<EditScriptFormData>({});
    const [formError, setFormError] = useState("");
    useEffect(() => {
        console.warn("Script changed");

        //don't show the category in the tag list
        let trimmedTags = script.tags || [];
        trimmedTags = trimmedTags.filter(t => t !== script.categoryName);

        const data = {
            name: script.name || "",
            slug: script.slug,
            owner: script.userId,
            creator: script.creatorName || "",
            category: script.categoryName || "",
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
        setFormData({ ...data });
        setOldFormData({ ...data });
    }, [script]);

    const handleValidationPassed = data => {
        console.log("Validation passed for data", data);

        setSubmitting(true);
        updateScript(
            { ...data, id: script.id },
            { ...oldFormData, id: script.id },
            response => {
                console.log("Script updated successfully", response);
                //ensure the homepage reloads properly
                window.localStorage.removeItem("recentScriptsTime");
                if (Router.pathname.includes("/edit")) Router.push(`/script/${response[0].slug}`);
                else {
                    if (
                        confirm(
                            "Your script has finished processing. Click OK to go to its page, or Cancel to stay where you are.\nIn the future I'll make this a little less annoying!"
                        )
                    ) {
                        Router.push(`/script/${response[0].slug}`);
                    }
                }
            },
            error => {
                console.log("Upload failed", error);
                setFormData(data);
                setFormError(ScriptUtils.tryFormatError(error.message));
                setSubmitting(false);
            }
        );
    };

    return submitting ? (
        <div className={style.processing}>
            <p>
                <span>
                    <FaCog />
                </span>
                <span>{`Your script is processing - this may take up to a minute or two.`}</span>
                <span>
                    {`Please don't leave this page - once your script has been updated you will be
                    automatically redirected.`}
                </span>
            </p>
        </div>
    ) : (
        <>
            <ScriptForm
                tags={tags}
                categories={categories}
                talent={talent}
                studios={studios}
                creators={creators}
                onValidationPassed={handleValidationPassed}
                defaultFormData={formData}
                options={{
                    thumbnailOptional: true,
                }}
                submitLabel="Update Script"
                busy={submitting}
            />
            {formError ? <pre style={{ color: "salmon" }}>{formError}</pre> : null}
        </> //
    );
};

const updateScript = async (
    newPostData: EditScriptFormData,
    oldPostData: EditScriptFormData,
    onSuccess: (response: any) => void,
    onFail: (error: { message: string }) => void
) => {
    const oldData: ScriptFormDataOutput = { ...oldPostData, thumbnail: "", duration: 0 };
    const newData: ScriptFormDataOutput = { ...newPostData, thumbnail: "", duration: 0 };

    console.log({ oldData, newData });

    //upload the thumbnail and add it to the database
    try {
        if (newData.thumbnail.length > 0) {
            try {
                await FirebaseUtils.deleteFile(`thumbnails/${oldData.slug}`);
            } catch (err) {
                console.warn(
                    `Failed to delete file at thumbnails/${oldData.slug}, continuing with upload`
                );
            }
            const compressedFile = await imageConversion.compressAccurately(
                newPostData.thumbnail[0],
                {
                    size: 100,
                    type: imageConversion.EImageType.JPEG,
                }
            );
            const fileUrl = await FirebaseUtils.uploadFile(
                compressedFile,
                `thumbnails/${newData.slug}`,
                (progress: number) => console.log("Thumbnail File uploading", progress * 100)
            );
            newData.thumbnail = fileUrl;
        }
    } catch (error) {
        onFail(error);
    }

    //Modify the form data to match what shoud be in the database
    newData.slug = slugify(newData.name, { lower: true, strict: true });
    oldData.slug = slugify(oldData.name, { lower: true, strict: true });

    newData.duration = ScriptUtils.stringToDuration(newPostData.duration);
    oldData.duration = ScriptUtils.stringToDuration(oldPostData.duration);

    //remove any duplicate data
    const diffData = ScriptUtils.getScriptDifferences(oldData, newData);

    if (Object.keys(diffData).length === 0) {
        onFail({ message: "You didn't make any changes!" });
        return;
    }

    const finalUpdateData: any = {
        id: newPostData.id,
        set: {},
        remove: {},
        add: {},
    };

    //the values that can just be straight set
    if (diffData.name !== undefined) finalUpdateData.set.name = diffData.name;
    if (diffData.slug !== undefined) finalUpdateData.set.slug = diffData.slug;
    if (diffData.description !== undefined) finalUpdateData.set.description = diffData.description;
    if (diffData.duration !== undefined) finalUpdateData.set.duration = diffData.duration;
    if (diffData.thumbnail !== undefined) finalUpdateData.set.thumbnail = diffData.thumbnail;
    if (diffData.sourceUrl !== undefined) finalUpdateData.set.sourceUrl = diffData.sourceUrl;
    if (diffData.streamingUrl !== undefined)
        finalUpdateData.set.streamingUrl = diffData.streamingUrl;
    if (diffData.studio !== undefined) finalUpdateData.set.studio = diffData.studio;
    if (diffData.created !== undefined) finalUpdateData.set.created = new Date(diffData.created);

    //lists of strings need to be handled slightly differently...
    if (diffData.tags !== undefined) finalUpdateData.set.tags = newData.tags;
    if (diffData.talent !== undefined) finalUpdateData.set.talent = newData.talent;

    //these values refer to other tables, so they need fancier treatment
    if (diffData.creator !== undefined) {
        finalUpdateData.remove.creator = oldPostData.creator;
        finalUpdateData.add.creator = newPostData.creator;
    }
    if (diffData.category !== undefined) {
        finalUpdateData.remove.category = oldPostData.category;
        finalUpdateData.add.category = newPostData.category;

        //we also need to remove the 'category tag' from the script and add the new category as a tag
        //this is actually done in the next if block, but this flag ensures that the new tag list contains the new category
        diffData.tags = true;
        newPostData.tags = [
            ...newPostData.tags.filter(t => t !== oldPostData.category),
            newPostData.category,
        ];
        if (finalUpdateData.set.tags) finalUpdateData.set.tags.push(newData.category);
        else finalUpdateData.set.tags = [...newData.tags, newData.category];
    }
    if (diffData.tags) {
        finalUpdateData.remove.tags = oldPostData.tags.filter(
            tag => newPostData.tags.findIndex(t => t === tag) === -1
        );
        finalUpdateData.add.tags = newPostData.tags.filter(
            tag => oldPostData.tags.findIndex(t => t === tag) === -1
        );
    }
    if (diffData.talent) {
        finalUpdateData.remove.talent = oldPostData.talent.filter(
            talent => newPostData.talent.findIndex(t => t === talent) === -1
        );
        finalUpdateData.add.talent = newPostData.talent.filter(
            talent => oldPostData.talent.findIndex(t => t === talent) === -1
        );
    }

    console.warn("Final Data", { oldData, newData, diffData, finalUpdateData });

    try {
        const response = await axios.post("/api/scripts/update", finalUpdateData);
        if (response.data.error) throw response.data.error;
        onSuccess(response.data);
    } catch (error) {
        onFail(error);
    }
};

export default EditScript;
