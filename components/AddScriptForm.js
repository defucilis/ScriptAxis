import {useState, useEffect, useContext, useRef} from 'react'

import {Formik, Form} from 'formik'
import moment from 'moment'
import * as yup from 'yup';
import axios from 'axios';
import slugify from 'slugify'
import ReactMarkdown from 'react-markdown'

import {Input, TextArea, Select, Autocomplete, Tags, Dropzone} from './FormUtils';
import NavigationPrompt from './NavigationPrompt'
import FirebaseUtils from '../utilities/FirebaseUtils'
import ScriptUtils from '../utilities/ScriptUtils'

import style from './AddScriptForm.module.css'

const AddScriptForm = ({tags, categories, talent, studios, creators}) => {
    const handleSubmit = (values, {setSubmitting}) => {

        setSubmitting(true);
        console.log("Submitting with values", values);
        setTimeout(() => setSubmitting(false), 2000);
    
        //doRequest(postData);
    }

    const getSchema = () => {
        return yup.object().shape({
            name: yup.string().required("A name is required"),
            creator: yup.string().required("A creator is required"),
            category: yup.string().required("A category is required"),
            tags: yup.array().notRequired(),
            description: yup.string().notRequired(""),
            thumbnail: yup.array().length(1, "A thumbnail is required"),
            sourceUrl: yup.string().notRequired().url("Source URL provided is invalid"),
            streamingUrl: yup.string().notRequired().url("Streaming URL provided is invalid"),
            studio: yup.string().notRequired(),
            talent: yup.array().notRequired(),
            created: yup.date().notRequired(),
        });
    }

    const [categoryOptions, setCategoryOptions] = useState([]);
    useEffect(() => {
        if(!categories) return;
        
        setCategoryOptions([{label: "Select a Category", value: ""}, ...categories.map(category => {
            return {
                label: ScriptUtils.getPrettyCategory(category),
                value: category
            }
        })]);
    }, [categories])

    const [tagOptions, setTagOptions] = useState([]);
    useEffect(() => {
        if(!tags) return;
        setTagOptions(tags);
    }, [tags])

    const [talentOptions, setTalentOptions] = useState([]);
    useEffect(() => {
        if(!talent) return;
        setTalentOptions(talent);
    }, [talent])

    const [studioOptions, setStudioOptions] = useState([]);
    useEffect(() => {
        if(!studios) return;
        setStudioOptions(studios);
    }, [studios])

    const [creatorOptions, setCreatorOptions] = useState([]);
    useEffect(() => {
        if(!creators) return;
        setCreatorOptions(creators);
    }, [creators])

    return (
        <div className={style.form}>
        <NavigationPrompt when={false} message={"Test Message!"} />
        <Formik
            initialValues={{
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
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={getSchema}
            onSubmit={handleSubmit}
        >
            {props => props.isSubmitting ? (
                <div>
                    <p>Your new script is processing - this may take a minute or so. Feel free to leave this page.</p>
                </div>    
            ) : (
                <Form>
                    <Input id="name" name="name" label="Title" placeholder="Script Title" />
                    <Autocomplete id="creator" name="creator" label="Creator" tagProps={{
                        className: style.tags,
                        whitelist: creatorOptions,
                    }} />
                    <Select id="category" name="category" label="Category" options={categoryOptions}/>
                    <Tags 
                        name="tags"
                        id="tags"
                        label="Tags"
                        tagProps={{
                            settings: {
                                validate: tag => {
                                    const transformedTag = tag.value.trim().toLowerCase();
                                    const match = transformedTag.match("[a-z ]+");
                                    const success = match && match.length === 1 && match[0].length === transformedTag.length;
                                    return success 
                                        ? true 
                                        : "Letters only!";
                                }
                            },
                            whitelist: tagOptions,
                            className: style.tags
                        }}
                    />
                    <TextArea name="description" id="description" label="Description" maxheight={400} style={{resize:"none"}} />
                    <Input id="duration" name="duration" label="Duration" placeholder="hh:mm:ss" />
                    <Dropzone id="thumbnail" name="thumbnail" label="Thumbnail Image" 
                        className={style.dropzone}
                        hoveringClassName={style.dropzoneon}
                        instruction="Drag + drop a thumbnail image, or click to select one"
                        options={{
                            accept: [
                                "image/png",
                                "image/jpeg",
                            ],
                            maxSize: 2000000, //2MB
                            multiple: false,
                            noKeyboard: true,
                            preventDropOnDocument: true,
                        }}
                    />
                    <Input id="sourceUrl" name="sourceUrl" label="Source URL" />
                    <Input id="streamingUrl" name="streamingUrl" label="Streaming URL" />
                    <Autocomplete id="studio" name="studio" label="Studio" tagProps={{
                        className: style.tags,
                        whitelist: studioOptions,
                    }} />
                    <Tags 
                        name="talent"
                        id="talent"
                        label="Talent"
                        tagProps={{
                            whitelist: talentOptions,
                            className: style.tags
                        }}
                    />

                    <button type="submit">Add Script</button>
                    <pre style={{position: "fixed", right: "1em", top: "100px"}}>{JSON.stringify(props, null, 2)}</pre>
                </Form>
            )}
            
        </Formik>
        </div>
    );
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


export default AddScriptForm;