import {useState, useEffect, useReducer} from 'react'
import style from './Filters.module.css'
import ScriptUtils from '../utilities/ScriptUtils'

import dynamic from 'next/dynamic'
const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

import ReactSlider from 'react-slider'

const reduceFilters = (currentFilters, action) => {
    let newFilters = {...currentFilters};
    switch(action.type) {
        case "name":
            if(!action.value || action.value === "") delete(newFilters.name);
            else newFilters.name = {include: newFilters.name}
            break;
        case "category":
            if(!action.value || action.value === "") delete(newFilters.category);
            else if(action.value && newFilters.category && newFilters.category.name.equals === action.value) delete(newFilters.category);
            else newFilters.category = {name: {equals: action.value}};
            break;
        case "include":
            if(action.operation === "add") {
                if(!newFilters.include) newFilters.include = [action.value];
                else newFilters.include.push(action.value);
            } else if(action.operation === "remove") {
                if(!newFilters.include || newFilters.include.length === 0) delete(newFilters.include);
                newFilters.include = newFilters.include.filter(tag => tag !== action.value);
                if(newFilters.include.length === 0) delete(newFilters.include);
            } else {
                console.error(`Unexpected value ${action.operation} for reduceFilters operation`)
            }
            break;
        case "exclude":
            if(action.operation === "add") {
                if(!newFilters.exclude) newFilters.exclude = [action.value];
                else newFilters.exclude.push(action.value);
            } else if(action.operation === "remove") {
                if(!newFilters.exclude || newFilters.exclude.length === 0) delete(newFilters.exclude);
                newFilters.exclude = newFilters.exclude.filter(tag => tag !== action.value);
                if(newFilters.exclude.length === 0) delete(newFilters.exclude);
            } else {
                console.error(`Unexpected value ${action.operation} for reduceFilters operation`)
            }
            break;
        case "duration":
            if(!action.value) delete(newFilters.duration);
            else newFilters.duration = action.value;
            break;
        default:
            console.error(`Unexpected value ${action.type} for reduceFilters action`);
    }
    return newFilters;
}

const Filters = ({query, onFilter}) => {
    const [filters, setFilters] = useReducer(reduceFilters, {});
    const [initialIncludeTags, setInitialIncludeTags] = useState("");
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        window.setTimeout(() => {
            const storedTagCounts = window.localStorage.getItem("storedTagCounts");
            const storedCategoryCounts = window.localStorage.getItem("storedCategoryCounts");
            if(storedTagCounts) setTags(JSON.parse(storedTagCounts).map(tag => tag.name));
            if(storedCategoryCounts) setCategories(JSON.parse(storedCategoryCounts));
        }, 50)
    }, []);
    useEffect(() => {
        window.setTimeout(() => {
            if(query.filters.include) {
                setInitialIncludeTags(query.filters.include[0])
            } else {
                setInitialIncludeTags([]);
            }
            if(query.filters.category) {
                setFilters({
                    type: "category",
                    value: query.filters.category.name.equals
                });
            } else {
                setFilters({
                    type: "category",
                    value: ""
                });
            }
        }, 100)
    }, [query])

    useEffect(() => {
        onFilter(filters);
    }, [filters])

    const transformDuration = index => {
        switch(index) {
            case 0:
                return 0;
            case 1:
                return 300; //5 minutes
            case 2:
                return 600; //10 minutes
            case 3:
                return 900; //15 minutes
            case 4:
                return 1200; //20 minutes
            case 5:
                return 1800; //30 minutes
            case 6:
                return 3600; //60 minutes
            case 7:
                return 7200; //120 minutes
        }
    }

    const handleSliderChange = values => {
        const minDuration = transformDuration(values[0]);
        let maxDuration = transformDuration(values[1]);
        //maximum duration is actually 120 minutes and above
        if(maxDuration === 7200) maxDuration = 999999999;
        setFilters({
            type: "duration",
            value: { 
                min: values[0] === 0 ? -1 : minDuration,
                max: values[1] === 7 ? -1 : maxDuration
            }
        })
    }

    return (
        <div className={style.filters}>
            <div className={style.filtersmain}>
                <label htmlFor="category">Category</label>
                <div className={style.field}>
                    <ul className={style.categories}>
                        {
                            categories.map(category => {
                                return (
                                    <li key={category.name}>
                                        <a 
                                            className={filters.category && filters.category.name && filters.category.name.equals === category.name ? style.selectedcategory : null}
                                            onClick={() => setFilters({
                                                        type: "category",
                                                        value: category.name
                                                    })}
                                        >
                                            {ScriptUtils.getPrettyCategory(category.name)} ({category.count})
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <label htmlFor="includeTags">Include Tags</label>
                <div className={style.field}>
                    <Tags 
                        className={style.tags}
                        settings = {
                            {
                                enforceWhitelist: true,
                                dropdown: {
                                    highlightFirst: true,
                                    enabled: 0
                                }
                            }
                        }
                        value={initialIncludeTags}
                        whitelist={tags}
                        onAdd={e => {
                            console.log("tag added ", e.detail.data)
                            setFilters({
                                type: "include",
                                operation: "add",
                                value: e.detail.data.value
                            })
                        }}
                        onRemove={e => {
                            console.log("tag removed", e.detail.data);
                            setFilters({
                                type: "include",
                                operation: "remove",
                                value: e.detail.data.value
                            })
                        }}
                    />
                </div>
                <label htmlFor="excludeTags">Exclude Tags</label>
                <div className={style.field}>
                    <Tags 
                        className={style.tags}
                        settings = {
                            {
                                enforceWhitelist: true,
                                dropdown: {
                                    highlightFirst: true,
                                    enabled: 0
                                }
                            }
                        }
                        whitelist={tags}
                        onAdd={e => {
                            console.log("tag added ", e.detail.data)
                            setFilters({
                                type: "exclude",
                                operation: "add",
                                value: e.detail.data.value
                            })
                        }}
                        onRemove={e => {
                            setFilters({
                                type: "exclude",
                                operation: "remove",
                                value: e.detail.data.value
                            })
                        }}
                    />
                </div>
                
                <label htmlFor="duration">Duration (minutes)</label>
                <div className={style.field}>
                    <div className={style.slidercontainer}>
                        <ReactSlider 
                            className={style.slider}
                            thumbClassName={style.sliderthumb}
                            trackClassName={style.slidertrack}
                            markClassName={style.slidermark}
                            defaultValue={[0,7]}
                            marks={[
                                0, 1, 2, 3, 4, 5, 6, 7
                            ]}
                            min={0}
                            max={7}
                            onAfterChange={handleSliderChange}
                        />
                    </div>
                    <div className={style.slidermarks}>
                        <ul>
                            <li>0</li>
                            <li>5</li>
                            <li>10</li>
                            <li>15</li>
                            <li>20</li>
                            <li>30</li>
                            <li>60</li>
                            <li>120+</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters;