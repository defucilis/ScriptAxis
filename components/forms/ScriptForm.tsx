import { useState, useEffect, useRef } from "react";

import * as yup from "yup";
import ReactMarkdown from "react-markdown";

import {
    Input,
    TextArea,
    Select,
    Autocomplete,
    Tags,
    Dropzone,
    Datepicker,
    Collapsible,
} from "./FormUtils";
import NavigationPrompt from "../functional/NavigationPrompt";
import ScriptUtils from "../../lib/ScriptUtils";
import useAuth from "../../lib/auth/useAuth";

import style from "./ScriptForm.module.scss";
import { StringLists } from "lib/types";

export interface ScriptFormData {
    name?: string;
    creator?: string;
    owner?: string;
    category?: string;
    tags?: string[];
    thumbnail?: File[];
    description?: string;
    duration?: string;
    sourceUrl?: string;
    streamingUrl?: string;
    studio?: string;
    talent?: string[];
    created?: Date;
}

export interface EditScriptFormData {
    id?: number;
    slug?: string;
    name?: string;
    creator?: string;
    owner?: string;
    category?: string;
    tags?: string[];
    thumbnail?: File[];
    description?: string;
    duration?: string;
    sourceUrl?: string;
    streamingUrl?: string;
    studio?: string;
    talent?: string[];
    created?: Date;
}

export interface ScriptFormDataOutput {
    id?: number;
    slug?: string;
    name?: string;
    creator?: string;
    owner?: string;
    category?: string;
    tags?: string[];
    thumbnail?: string;
    description?: string;
    duration?: number;
    sourceUrl?: string;
    streamingUrl?: string;
    studio?: string;
    talent?: string[];
    created?: Date;
}

export interface ScriptErrorData {
    name?: string;
    creator?: string;
    owner?: string;
    category?: string;
    tags?: string;
    thumbnail?: string;
    description?: string;
    duration?: string;
    sourceUrl?: string;
    streamingUrl?: string;
    studio?: string;
    talent?: string;
    created?: string;
}

const ScriptForm = ({
    tags,
    categories,
    talent,
    studios,
    creators,
    onValidationPassed,
    defaultFormData,
    options,
    submitLabel,
    busy,
}: StringLists & {
    onValidationPassed: (data: ScriptFormData) => void;
    defaultFormData?: ScriptFormData;
    options?: {
        thumbnailOptional?: boolean;
    };
    submitLabel: string;
    busy: boolean;
}): JSX.Element => {
    const { user } = useAuth();

    const [formData, setFormData] = useState<ScriptFormData>({});

    const tagsRef = useRef<any>();
    const talentRef = useRef<any>();
    useEffect(() => {
        //console.log("Setting form data", defaultFormData);
        const newData = { ...defaultFormData };
        setFormData(newData);
        setTimeout(() => {
            if (newData.tags && newData.tags.length > 0) {
                tagsRef.current.removeAllTags();
                tagsRef.current.addTags(newData.tags);
            }
            if (newData.talent && newData.talent.length > 0) {
                talentRef.current.removeAllTags();
                talentRef.current.addTags(newData.talent);
            }
        }, 100);
    }, [defaultFormData, tagsRef, talentRef]);

    const [errors, setErrors] = useState<ScriptFormData>({});
    const [dirty, setDirty] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(`Form: Setting ${e.target.id} to`, e.target.value)
        setFormData(cur => ({ ...cur, [e.target.id]: e.target.value }));
        if (errors[e.target.id]) {
            setErrors(cur => {
                const newVal = { ...cur };
                delete newVal[e.target.id];
                return newVal;
            });
        }
        setDirty(true);
    };
    const setError = (e: { target: { id: string; error: string } }) => {
        setErrors(cur => ({
            ...cur,
            [e.target.id]: [e.target.error],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        const doValidation = async (data: ScriptFormData, onPass: any, onFail: any) => {
            try {
                const validation = await getSchema().validate(data, { abortEarly: false });
                if (!ScriptUtils.stringIsValidDuration(data.duration)) {
                    throw {
                        inner: [
                            {
                                path: "duration",
                                errors: ["Duration must be in the form hours:minutes:seconds"],
                            },
                        ],
                    };
                }
                onPass(validation);
            } catch (err) {
                const mappedErrors: any = {};
                //console.error(err);
                err.inner.forEach(error => {
                    mappedErrors[error.path] = error.errors[0];
                });
                if (!mappedErrors.duration && !ScriptUtils.stringIsValidDuration(data.duration)) {
                    mappedErrors.duration = "Duration must be in the form hours:minutes:seconds";
                }
                setErrors(cur => ({ ...cur, ...mappedErrors }));
                onFail(mappedErrors);
            }
        };

        e.preventDefault();
        //console.log("Submitting with values", formData);

        doValidation(
            formData,
            () => {
                onValidationPassed({
                    name: formData.name,
                    creator: formData.creator,
                    owner: user.id,
                    category: formData.category,
                    tags: formData.tags,
                    thumbnail: formData.thumbnail,
                    description: formData.description,
                    duration: formData.duration,
                    sourceUrl: formData.sourceUrl,
                    streamingUrl: formData.streamingUrl,
                    studio: formData.studio,
                    talent: formData.talent,
                    created: formData.created,
                });
            },
            null
        );
    };

    const getSchema = () => {
        return yup.object().shape({
            name: yup.string().required("A name is required"),
            creator: yup.string().required("A creator is required"),
            category: yup.string().required("A category is required"),
            tags: yup.array().notRequired(),
            description: yup.string().nullable().notRequired(),
            duration: yup.string().required("A duration is required"),
            thumbnail:
                options && options.thumbnailOptional
                    ? yup.array().notRequired()
                    : yup.array().when("category", {
                          is: "Audio Only",
                          then: yup.array().notRequired(),
                          otherwise: yup
                              .array()
                              .length(1, "A thumbnail is required for video-based scripts"),
                      }),
            sourceUrl: yup.string().nullable().notRequired().url("Source URL provided is invalid"),
            streamingUrl: yup
                .string()
                .nullable()
                .notRequired()
                .url("Streaming URL provided is invalid"),
            studio: yup.string().nullable().notRequired(),
            talent: yup.array().notRequired(),
            created: yup.date().notRequired().max(new Date(), "Cannot set a future date!"),
        });
    };

    const [categoryOptions, setCategoryOptions] = useState([]);
    useEffect(() => {
        if (!categories) return;

        setCategoryOptions([
            { label: "Select a Category", value: "" },
            ...categories.map(category => {
                return {
                    label: category,
                    value: category,
                };
            }),
        ]);
    }, [categories]);

    const [tagOptions, setTagOptions] = useState([]);
    useEffect(() => {
        if (!tags) return;
        setTagOptions(tags);
    }, [tags]);

    const [talentOptions, setTalentOptions] = useState([]);
    useEffect(() => {
        if (!talent) return;
        setTalentOptions(talent);
    }, [talent]);

    const [studioOptions, setStudioOptions] = useState([]);
    useEffect(() => {
        if (!studios) return;
        setStudioOptions(studios);
    }, [studios]);

    const [creatorOptions, setCreatorOptions] = useState([]);
    useEffect(() => {
        if (!creators) return;
        setCreatorOptions(creators);
    }, [creators]);

    const validateTags = (tags: any) => {
        return tags.map((tag: string) => ScriptUtils.formatTag(tag));
    };

    return (
        <div className={style.form}>
            <NavigationPrompt
                when={dirty}
                message={"You have unsaved changes, are you sure you'd like to leave?"}
            />
            <form onSubmit={handleSubmit}>
                <Input
                    id="name"
                    name="name"
                    label="Title"
                    placeholder="Script Title"
                    onChange={handleChange}
                    value={formData.name}
                    error={errors.name}
                />

                <Autocomplete
                    id="creator"
                    name="creator"
                    label="Creator"
                    tagProps={{
                        className: style.tags,
                        whitelist: creatorOptions,
                    }}
                    onChange={handleChange}
                    error={errors.creator}
                    value={formData.creator}
                />

                <Select
                    id="category"
                    name="category"
                    label="Category"
                    options={categoryOptions}
                    onChange={handleChange}
                    error={errors.category}
                    value={formData.category}
                />
                <Tags
                    name="tags"
                    id="tags"
                    label="Tags"
                    tagProps={{
                        settings: {
                            validate: (tag: { value: string }) => {
                                const transformedTag = tag.value.trim().toLowerCase();
                                const match = transformedTag.match("[a-z 0-9]+");
                                const success =
                                    match &&
                                    match.length === 1 &&
                                    match[0].length === transformedTag.length;
                                return success ? true : "Letters only!";
                            },
                        },
                        whitelist: tagOptions,
                        className: style.tags,
                        tagifyRef: tagsRef,
                    }}
                    onChange={handleChange}
                    error={errors.tags}
                    value={formData.tags}
                    validateTags={validateTags}
                />

                <div className={style.descriptionwrapper}>
                    <TextArea
                        name="description"
                        id="description"
                        label="Description"
                        placeholder="Uses Markdown syntax (like on EroScripts and Reddit)"
                        maxheight={400}
                        onChange={handleChange}
                        error={errors.description}
                        value={formData.description}
                    />
                    <Collapsible label="Preview" collapsed={false}>
                        <ReactMarkdown source={formData.description} />
                    </Collapsible>
                </div>
                <Input
                    id="duration"
                    name="duration"
                    label="Duration"
                    placeholder="hh:mm:ss"
                    onChange={handleChange}
                    error={errors.duration}
                    value={formData.duration}
                />

                <Dropzone
                    id="thumbnail"
                    name="thumbnail"
                    label="Thumbnail Image"
                    className={style.dropzone}
                    hoveringClassName={style.dropzoneon}
                    instruction="Drag + drop a thumbnail image, or click to select one"
                    options={{
                        accept: ["image/png", "image/jpeg"],
                        //maxSize: 2000000, //2MB
                        multiple: false,
                        noKeyboard: true,
                        preventDropOnDocument: true,
                        pasteable: true,
                    }}
                    onChange={handleChange}
                    onError={setError}
                    error={errors.thumbnail}
                    value={formData.thumbnail}
                />
                <Input
                    id="sourceUrl"
                    name="sourceUrl"
                    label="Source URL"
                    onChange={handleChange}
                    error={errors.sourceUrl}
                    value={formData.sourceUrl}
                />
                <Input
                    id="streamingUrl"
                    name="streamingUrl"
                    label="Streaming URL"
                    onChange={handleChange}
                    error={errors.streamingUrl}
                    value={formData.streamingUrl}
                />
                <Autocomplete
                    id="studio"
                    name="studio"
                    label="Studio"
                    tagProps={{
                        className: style.tags,
                        whitelist: studioOptions,
                    }}
                    onChange={handleChange}
                    error={errors.studio}
                    value={formData.studio}
                />
                <Tags
                    name="talent"
                    id="talent"
                    label="Talent"
                    tagProps={{
                        whitelist: talentOptions,
                        className: style.tags,
                        tagifyRef: talentRef,
                    }}
                    onChange={handleChange}
                    error={errors.talent}
                    value={formData.talent}
                />
                <Datepicker
                    name="created"
                    id="created"
                    label="Creation Date (if not today)"
                    wrapperClassName={style.datepicker}
                    popperClassName={style.datepickercalendar}
                    onChange={handleChange}
                    error={errors.created}
                    value={formData.created}
                />

                {busy ? <p>Please wait...</p> : <button type="submit">{submitLabel}</button>}
            </form>
        </div>
    );
};

export default ScriptForm;
