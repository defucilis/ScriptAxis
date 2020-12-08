import {useState, useEffect} from 'react'

const Checkbox = (props) => {
    const [checked, setChecked] = useState(props.defaultValue);

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked])

    const handleClick = () => {
        if(props.onChange) {
            props.onChange({target: {checked: !checked}});
        }
    }

    return (
        <div {...props} onClick={handleClick}>
            {checked ? props.children : null}
        </div>
    )
}

export default Checkbox;