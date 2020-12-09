import {useRef, useState} from 'react'
import { Field, FieldArray } from 'formik'
import {useDropzone} from 'react-dropzone'

import dynamic from 'next/dynamic'
const TagifyTags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

const Input = ({...props}) => {
    return (
        <Field {...props}>
            {({field, form}) => (
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <input type="text" {...props} {...field} />
                    {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
                </div>
            )}
        </Field>
    )
}

const TextArea = ({...props}) => {
    const textArea = useRef();

    const getNewHeight = scrollHeight => {
        if(!props.minheight && !props.maxheight) return (scrollHeight + 2) + "px";
        if(!props.minheight) return Math.min(props.maxheight, (scrollHeight + 2)) + "px";
        if(!props.maxheight) return Math.max(props.minheight, (scrollHeight + 2)) + "px";
        return Math.min(props.maxheight, Math.max(props.minheight, scrollHeight + 2)) + "px";
    }

    return (
        <Field {...props}>
            {({field, form}) => (
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <textarea 
                        {...props} {...field}
                        ref={textArea}
                        onInput={e => {
                            textArea.current.style.setProperty("height", getNewHeight(textArea.current.scrollHeight));
                            console.log(textArea.current.style);
                        }}
                    >
                    </textarea>
                    {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
                </div>
            )}
        </Field>
    )
}

const Select = ({...props}) => {
    return (
        <Field {...props} as="select">
            {({field, form}) => (
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <select {...props} {...field}>
                    {!props.options ? null : props.options.map(option => {
                        return <option key={props.name + "_" + option.value} value={option.value}>{option.label}</option>
                    })}
                    </select>
                    {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
                </div>
            )}
        </Field>
    )
}

const Autocomplete = ({...props}) => {

    const tagify = useRef();

    return (
        <Field {...props}>
            {({field, form}) => (
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <TagifyTags
                        {...props} {...field}
                        value={form.initialValues[props.name]}
                        {...props.tagProps}
                        settings={{...props.tagProps.settings, mode: "select"}}
                        onChange={e => {
                            try {
                                e.target.value = JSON.parse(e.target.value)[0].value;
                                form.handleChange(e);
                                form.setFieldTouched(props.name);
                            } catch {
                                form.handleChange(e);
                            }
                        }}
                        ref={tagify}
                    />
                    {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
                    <pre>{JSON.stringify(props, null, 2)}</pre>
                </div>
            )}
        </Field>
    )
}

const Tags = ({...props}) => {
    return (
        <FieldArray {...props}>
            {({ push, remove, form }) => (
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <TagifyTags
                        value={form.initialValues[props.name]}
                        onAdd={e => {
                            push(e.detail.data.value);
                            form.setFieldTouched(props.name);
                        }}
                        onRemove={e => {
                            remove(e.detail.index)
                            form.setFieldTouched(props.name);
                        }}
                        {...props.tagProps}
                    />
                    {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
                </div>
            )}
        </FieldArray>
    )
}

const InnerDropzone = ({fieldName, className, hoveringClassName, instruction, options, onChange, onError}) => {
    const [files, setFiles] = useState([]);
    const [fileLabels, setFileLabels] = useState([]);
    const [over, setOver] = useState(false);
    const handleFiles = newFiles => {
        console.log(newFiles);
        setOver(false);
        setFiles(newFiles);
        setFileLabels(newFiles.map(file => {
            return <li key={`${fieldName}_${file.name}`}>
                {`${file.name} (${(file.size / (file.size > 1000000 ? 1000000 : 1000)).toFixed(1)} ${(file.size > 1000000 ? "MB" : "kB")})`}
            </li>
        }))
        onChange(newFiles);
    }
    const handleErrors = rejections => {
        console.log(rejections);
        setOver(false);
        handleFiles([]);
        onError(rejections[0].errors[0].message);
    }
    const {getRootProps, getInputProps} = useDropzone({
        ...options,
        onDropAccepted: handleFiles,
        onDropRejected: handleErrors,
        onDragEnter: () => setOver(true),
        onDragLeave: () => setOver(false)
    });

    return (
        <div {...getRootProps({className: `${className} ${over ? hoveringClassName : null}`})}>
            <input {...getInputProps()} />
            {files.length === 0 ? <p>{instruction || "Drag + drop and image, or click to select one"}</p> : <ul>{fileLabels}</ul>}
        </div>
    )
}

const Dropzone = ({...props}) => {
    return (
        <FieldArray {...props}>
            {({form}) => (
                <div>
                <label htmlFor={props.name}>{props.label}</label>
                <InnerDropzone 
                    fieldName={props.name}
                    className={props.className}
                    hoveringClassName={props.hoveringClassName}
                    instruction={props.instruction}
                    options={props.options}
                    onChange={files => {
                        form.setFieldValue(props.name, files);
                    }}
                    onError={error => {
                        form.setFieldError(props.name, error);
                    }}
                />
                {form.errors[props.name] ? <aside>{form.errors[props.name]}</aside> : null}
            </div>
            )}
        </FieldArray>
    )
}





export {Input};
export {TextArea};
export {Select};
export {Autocomplete};
export {Tags};
export {Dropzone};