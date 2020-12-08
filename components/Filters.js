import {useState, useEffect, useReducer} from 'react'
import style from './Filters.module.css'
import ScriptUtils from '../utilities/ScriptUtils'

import dynamic from 'next/dynamic'
const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

import ReactSlider from 'react-slider'

const reduceFilters = (currentFilters, action) => {
    let newFilters = {...currentFilters};
    console.log("Filters: Mutating filters", currentFilters, action);
    if(action.name) {
        if(!action.name.value || action.name.value === "") delete(newFilters.name);
        else newFilters.name = {include: newFilters.name}
    }
    if(action.category) {
        if(action.category.operation === "clear") {
            delete(newFilters.category);
        } else if(action.category.operation === "set") {
            newFilters.category = {name: {equals: action.category.value}};
        } else if(action.category.operation === "toggle") {
            if(action.category.value && newFilters.category && newFilters.category.name.equals === action.category.value) 
                delete(newFilters.category);
            else 
                newFilters.category = {name: {equals: action.category.value}};
        }
    }
    if(action.include) {
        if(action.include.operation === "add") {
            if(!newFilters.include) 
                newFilters.include = [action.include.value];
            else if(newFilters.include.findIndex(f => f === action.include.value) === -1) 
                newFilters.include.push(action.include.value);
        } else if(action.include.operation === "remove") {
            if(!newFilters.include || newFilters.include.length === 0) 
                delete(newFilters.include);
            newFilters.include = newFilters.include.filter(tag => tag !== action.include.value);
            if(newFilters.include.length === 0) 
                delete(newFilters.include);
        } else if(action.include.operation === "set" ) {
            if(!action.include.value || action.include.value.length === 0)
                delete(newFilters.include);
            else newFilters.include = action.include.value;  
        } else if(action.include.operation === "clear") {
            delete(newFilters.include);   
        } else {
            console.error(`Unexpected value ${action.include.operation} for reduceFilters operation`)
        }
    }
    if(action.exclude) {
        if(action.exclude.operation === "add") {
            if(!newFilters.exclude) 
                newFilters.exclude = [action.exclude.value];
            else if(newFilters.exclude.findIndex(f => f === action.exclude.value) === -1) 
                newFilters.exclude.push(action.exclude.value);
        } else if(action.exclude.operation === "remove") {
            if(!newFilters.exclude || newFilters.exclude.length === 0) 
                delete(newFilters.exclude);
            newFilters.exclude = newFilters.exclude.filter(tag => tag !== action.exclude.value);
            if(newFilters.exclude.length === 0) 
                delete(newFilters.exclude);
        } else if(action.exclude.operation === "clear") {
            delete(newFilters.exclude);   
        }else {
            console.error(`Unexpected value ${action.exclude.operation} for reduceFilters operation`)
        }
    }
    if(action.minDuration) {
        if(action.minDuration.operation === "clear") delete(newFilters.minDuration);
        else newFilters.minDuration = action.minDuration.value;
    }
    if(action.maxDuration) {
        if(action.maxDuration.operation === "clear") delete(newFilters.maxDuration);
        else newFilters.maxDuration = action.maxDuration.value;
    }
    console.log("Filters: Filter mutation complete", newFilters);
    return newFilters;
}

const Filters = ({query, onFilter}) => {
    const [filters, setFilters] = useReducer(reduceFilters, {});
    const [initialIncludeTags, setInitialIncludeTags] = useState("");
    const [initialExcludeTags, setInitialExcludeTags] = useState("");
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
            console.log("Filters: Updating Filters from Query:", query.filters);
            let action = {};
            if(query.filters.include) {
                action.include = {
                    operation: "add",
                    value: query.filters.include[0],
                };
            } else {
                action.include = {
                    operation: "clear"
                }
            }
            if(query.filters.category) {
                action.category = {
                    operation: "set",
                    value: query.filters.category.name.equals
                }
            } else {
                action.category = {
                    operation: "clear"
                }
            }

            console.log("Set Filter Action:", action);
            if(Object.keys(action).length > 0) setFilters(action);

            setInitialIncludeTags(query.filters.include ? [query.filters.include] : []);
            setInitialIncludeTags(query.filters.include ? [query.filters.include] : []);
            
        }, 100);
    }, [query])

    useEffect(() => {
        console.log("Filters: Detected filter change")
        if(!ScriptUtils.filtersEqual(query.filters, filters)) {
            console.log("Filters: New filters was different from query filters:", filters, query.filters);
            onFilter(filters);
        } else {
            console.log("Filters: New filters identical to query, skipping")
        }
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
        let action = {};
        if(values[0] !== 0) action.minDuration = {value: transformDuration(values[0])}
        else action.minDuration = {"operation" : "clear"}
        if(values[1] !== 7) action.maxDuration = {value: transformDuration(values[1])}
        else action.maxDuration = {"operation" : "clear"}
        if(Object.keys(action).length > 0) setFilters(action);
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
                                            onClick={() => setFilters({category: {
                                                        operation: "toggle",
                                                        value: category.name
                                                    }})}
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
                            setFilters({include: {
                                operation: "add",
                                value: e.detail.data.value
                            }})
                        }}
                        onRemove={e => {
                            console.log("tag removed", e.detail.data);
                            setFilters({include: {
                                operation: "remove",
                                value: e.detail.data.value
                            }})
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
                        value={initialExcludeTags}
                        whitelist={tags}
                        onAdd={e => {
                            console.log("tag added ", e.detail.data)
                            setFilters({exclude: {
                                operation: "add",
                                value: e.detail.data.value
                            }})
                        }}
                        onRemove={e => {
                            setFilters({exclude: {
                                operation: "remove",
                                value: e.detail.data.value
                            }})
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