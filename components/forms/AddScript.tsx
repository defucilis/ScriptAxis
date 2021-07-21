import { useState } from "react";
import Router from "next/router";

import axios from "axios";
import slugify from "slugify";
import { FaCog } from "react-icons/fa";
import * as imageConversion from "image-conversion";

import FirebaseUtils from "../../lib/FirebaseUtils";
import ScriptUtils from "../../lib/ScriptUtils";
import ScriptForm, { ScriptFormData, ScriptFormDataOutput } from "./ScriptForm";

import style from "./AddScript.module.scss";
import { StringLists, User } from "lib/types";

const defaultFormData: ScriptFormData = {
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
    createdAt: new Date(),
    funscript: [],
};

const AddScript = ({
    user,
    tags,
    categories,
    talent,
    studios,
    creators,
}: StringLists & { user?: User }): JSX.Element => {
    const [submitting, setSubmitting] = useState(false);
    const [clipboardWritten, setClipboardWritten] = useState(false);

    if (!user) return null;

    const handleValidationPassed = data => {
        setSubmitting(true);
        createScript(
            data,
            user,
            response => {
                console.log("Script created successfully", response);
                //ensure the homepage reloads properly
                window.localStorage.removeItem("recentScriptsTime");
                window.localStorage.removeItem("topScriptsTime");
                if (Router.pathname === "/add") Router.push(`/script/${response.slug}`);
                else {
                    if (
                        confirm(
                            "Your script has finished processing. Click OK to go to its page, or Cancel to stay where you are.\nIn the future I'll make this a little less annoying!"
                        )
                    ) {
                        Router.push(`/script/${response.slug}`);
                    }
                }
            },
            () => setClipboardWritten(true),
            error => {
                window.alert("Upload failed - " + ScriptUtils.tryFormatError(error.message));
                console.log("Upload failed", ScriptUtils.tryFormatError(error.message));
                setSubmitting(false);
                setClipboardWritten(false);
            }
        );
    };

    return submitting ? (
        <div className={style.processing}>
            <p>
                <span className={clipboardWritten ? style.clipboardWritten : null}>
                    <FaCog />
                </span>
                <span>Your script is processing - this may take up to a minute or two.</span>
                <span>
                    {`Please don't leave this page - once your script has finished processing you will
                    be automatically redirected.`}
                </span>
            </p>
        </div>
    ) : (
        <ScriptForm
            tags={tags}
            categories={categories}
            talent={talent}
            studios={studios}
            creators={creators}
            onValidationPassed={handleValidationPassed}
            defaultFormData={defaultFormData}
            submitLabel="Add Script"
            busy={submitting}
        />
    );
};

const createScript = async (
    postData: ScriptFormData,
    user: User,
    onSuccess: (data: any) => void,
    onClipboardWrite: () => void,
    onFail: (error: { message: string }) => void
) => {
    const data: ScriptFormDataOutput = { ...postData, duration: -1, thumbnail: "", funscript: "" };

    console.log(data);

    data.slug = slugify(data.name, { lower: true, strict: true });
    data.searchString = ScriptUtils.getSearchString(data);
    data.owner = user.id;

    if (postData.thumbnail.length > 0) {
        //upload the thumbnail and add it to the database
        try {
            const compressedFile = await imageConversion.compressAccurately(postData.thumbnail[0], {
                size: 100,
                type: imageConversion.EImageType.JPEG,
            });
            const fileUrl = await FirebaseUtils.uploadFile(
                compressedFile,
                `thumbnails/${data.slug}`,
                (progress: number) => console.log("Thumbnail File uploading", progress * 100)
            );
            data.thumbnail = fileUrl;
        } catch (error) {
            onFail(error);
            return;
        }
    } else {
        data.thumbnail = "/img/placeholder-thumbnail.png";
    }

    if (postData.funscript.length > 0) {
        //upload the thumbnail and add it to the database
        try {
            const fileUrl = await FirebaseUtils.uploadFile(
                postData.funscript[0],
                `funscripts/${data.slug}`,
                (progress: number) => console.log("Funscript File uploading", progress * 100)
            );
            data.funscript = fileUrl;
        } catch (error) {
            onFail(error);
            return;
        }
    } else {
        data.funscript = null;
    }

    //modify the form data into something useful for the database
    data.duration = ScriptUtils.stringToDuration(postData.duration);

    const testDataString = ScriptUtils.getScriptObjectCode(data);

    console.log("Final create data:", data);
    try {
        await navigator.clipboard.writeText(testDataString);
        console.log("Wrote data to clipboard", testDataString);
        onClipboardWrite();
    } catch (error) {
        console.error("Failed to write test data to clipboard", error);
    }

    try {
        const response = await axios.post("/api/scripts/create", data);
        if (response.data.error) throw response.data.error;
        onSuccess(response.data);
    } catch (error) {
        onFail(error);
    }
};

export default AddScript;
