import {useRef, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import dynamic from 'next/dynamic'

const TagifyTags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });
import ReactDatepicker from 'react-datepicker'
import {BsCaretRightFill} from 'react-icons/bs'
import {BsCaretDownFill} from 'react-icons/bs'
import {Collapse} from 'react-collapse'

const Input = props => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input type="text" {...props} />
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const TextArea = props => {
    const textArea = useRef();

    useEffect(() => {
        textArea.current.style.setProperty("height", getNewHeight(textArea.current.scrollHeight));
    }, [textArea, props.value])

    const getNewHeight = scrollHeight => {
        if(!props.minheight && !props.maxheight) return (scrollHeight + 2) + "px";
        if(!props.minheight) return Math.min(props.maxheight, (scrollHeight + 2)) + "px";
        if(!props.maxheight) return Math.max(props.minheight, (scrollHeight + 2)) + "px";
        return Math.min(props.maxheight, Math.max(props.minheight, scrollHeight + 2)) + "px";
    }

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <textarea 
                {...props}
                ref={textArea}
                style={{resize:"none"}}
                onInput={() => {
                    textArea.current.style.setProperty("height", getNewHeight(textArea.current.scrollHeight));
                    console.log(textArea.current.style);
                }}
            >
            </textarea>
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const Select = props => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <select {...props} value={props.value}>
            {!props.options ? null : props.options.map(option => {
                return <option key={props.name + "_" + option.value} value={option.value}>{option.label}</option>
            })}
            </select>
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const Autocomplete = props => {

    const [value, setValue] = useState([]);
    useEffect(() => {
        setValue(props.value);
    }, [props.value])
    
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <TagifyTags
                {...props}
                {...props.tagProps}
                value={value}
                settings={{...props.tagProps.settings, mode: "select"}}
                onChange={e => {
                    try {
                        if(e.target.value[0].value === "")
                            props.onChange({target: {id: props.id, value: ""}});
                        else 
                            props.onChange({target: {id: props.id, value: JSON.parse(e.target.value)[0].value}});
                    } catch {}
                }}
                onBlur={e => {
                    props.onChange({target: {id: props.id, value: e.detail.tagify.state.inputText}});
                }}
            />
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const Tags = props => {

    const [value, setValue] = useState([]);
    useEffect(() => {
        setValue(props.value);
    }, [])

    const sendChange = val => {
        props.onChange({
            target: {
                id: props.id,
                value: val
            }
        });
    }

    const handleChange = e => {
        let newVal = e.target.value;
        if(newVal === "") newVal = [];
        else {
            try {
                newVal = JSON.parse(newVal);
                if(newVal.length > 0 && newVal[0].value) {
                    newVal = newVal.map(val => val.value);
                }
            } catch {
                newVal = [];
            }
        }
        sendChange(newVal);
    }
    
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <TagifyTags
                {...props}
                {...props.tagProps}
                value={value}
                onChange={handleChange}
            />
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const InnerDropzone = ({fieldName, className, hoveringClassName, instruction, options, onChange, onError}) => {

    const [files, setFiles] = useState([]);

    const validateFile = file => {
        let error = "";
        if(options.accept && options.accept.findIndex(type => file.type === type) === -1) {
            error = "File must be png or jpg";
            handleErrors([{errors: [{message: error}]}]);
            return false;
        }
        if(options.maxSize && file.size > options.maxSize) {
            error = "Max size is 2MB";
            handleErrors([{errors: [{message: error}]}]);
            return false;
        }
        return true;
    }

    const handlePasteEvent = e => {
        if(e.clipboardData == false || !e.clipboardData || !e.clipboardData.items) return;
        if(!e.clipboardData.files || e.clipboardData.files.length == 0) return;
        if(!validateFile(e.clipboardData.files[0])) return;
        handleFiles([e.clipboardData.files[0]]);
    }

    useEffect(() => {
        if(!options.pasteable) return () => window.removeEventListener("paste", handlePasteEvent);
        window.addEventListener("paste", handlePasteEvent);
        return () => window.removeEventListener("paste", handlePasteEvent);
    }, [options.pasteable])

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

const Dropzone = props => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <InnerDropzone 
                fieldName={props.name}
                className={props.className}
                hoveringClassName={props.hoveringClassName}
                instruction={props.instruction}
                options={props.options}
                onChange={files => {
                    props.onChange({
                        target: {
                            id: props.id,
                            value: files
                        }
                    })
                }}
                onError={error => {
                    props.onError({
                        target: {
                            id: props.id,
                            error
                        }
                    })
                }}
            />
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const Datepicker = props => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <ReactDatepicker
                {...props}
                selected={props.value}
                onChange={date => props.onChange({
                    target: {
                        id: props.id,
                        value: date
                    }
                })} 
            />
            {props.error ? <aside>{props.error}</aside> : null}
        </div>
    )
}

const Collapsible = props => {

    const [collapsed, setCollapsed] = useState(props.collapsed || false)

    const iconStyle = {
        position: "relative",
        top: "0.2em",
        fontSize: "1.5em",
        marginRight: "0.5em"
    }

    return (
        <div>
            <p onClick={() => setCollapsed(cur => !cur)}>
                {collapsed ? <BsCaretRightFill style={iconStyle} /> : <BsCaretDownFill style={iconStyle} />}
                {props.label}
            </p>
            <Collapse isOpened={!collapsed}>
                {props.children}
            </Collapse>
        </div>
    )
}




export {Input};
export {TextArea};
export {Select};
export {Autocomplete};
export {Tags};
export {Dropzone};
export {Datepicker};
export {Collapsible};