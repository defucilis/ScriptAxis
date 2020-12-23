import {useState, useEffect, useReducer} from 'react'
import dynamic from 'next/dynamic'

const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });
import { FaCheck } from 'react-icons/fa'
import ReactSlider from 'react-slider'
import axios from 'axios'

import Checkbox from '../forms/Checkbox'

import ScriptUtils from '../../utilities/ScriptUtils'
import useUser from '../../utilities/auth/useUser'

import style from './Filters.module.css'

const reduceFilters = (currentFilters, action) => {
    let newFilters = {...currentFilters};
    if(action.name) {
        if(action.name.operation === "clear") delete(newFilters.name);
        else newFilters.name = {contains: action.name.value}
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
    if(action.talent) {
        if(action.talent.operation === "clear") delete(newFilters.talent);
        else newFilters.talent = {contains: action.talent.value}
    }
    if(action.studio) {
        if(action.studio.operation === "clear") delete(newFilters.studio);
        else newFilters.studio = {contains: action.studio.value}
    }
    if(action.sourceUrl) {
        if(!action.sourceUrl.value) delete(newFilters.sourceUrl);
        else newFilters.sourceUrl = {not: null};
    }
    if(action.streamingUrl) {
        if(!action.streamingUrl.value) delete(newFilters.streamingUrl);
        else newFilters.streamingUrl = {not: null};
    }

    console.log("Mutating filters", currentFilters, action, newFilters);
    return newFilters;
}

const Filters = ({query, onFilter}) => {
    const [filters, setFilters] = useReducer(reduceFilters, query.filters);
    const [initialIncludeTags, setInitialIncludeTags] = useState("");
    const [initialExcludeTags, setInitialExcludeTags] = useState("");
    const [durationValues, setDurationValues] = useState([0, 7]);
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [talentOptions, setTalentOptions] = useState([]);
    const [studioOptions, setStudioOptions] = useState([]);
    const [initialTalent, setInitialTalent] = useState([]);
    const [initialStudio, setInitialStudio] = useState([]);
    const [sourceUrl, setSourceUrl] = useState("");
    const [streamingUrl, setStreamingUrl] = useState("");
    const {user} = useUser();
    useEffect(() => {
        window.setTimeout(() => {
            const storedTagCounts = window.localStorage.getItem("storedTagCounts");
            if(storedTagCounts) setTags(JSON.parse(storedTagCounts).map(tag => tag.name));

            const storedCategoryCounts = window.localStorage.getItem("storedCategoryCounts");
            if(storedCategoryCounts) setCategories(JSON.parse(storedCategoryCounts));

            const storedTalent = window.localStorage.getItem("storedTalent");
            if(storedTalent) setTalentOptions(JSON.parse(storedTalent));

            const storedStudios = window.localStorage.getItem("storedStudios");
            if(storedStudios) setStudioOptions(JSON.parse(storedStudios));
        }, 50)
    }, []);

    
    useEffect(() => {
        window.setTimeout(() => {
            let action = {};
            const clearOp = {operation: "clear"};
            action.name = !query.filters.name ? clearOp : {
                value: query.filters.name.contains
            }

            action.include = !query.filters.include ? clearOp : {
                operation: "add",
                value: query.filters.include[0],
            };

            action.exclude = !query.filters.exclude ? clearOp : {
                operation: "add",
                value: query.filters.exclude[0],
            };
            
            action.category = !query.filters.category ? clearOp : {
                operation: "set",
                value: query.filters.category.name.equals,
            }

            action.minDuration = !query.filters.minDuration ? clearOp : {
                value: query.filters.minDuration
            }

            action.maxDuration = !query.filters.maxDuration ? clearOp : {
                value: query.filters.maxDuration
            }

            action.talent = !query.filters.talent ? clearOp : {
                value: query.filters.talent.contains
            }

            action.sourceUrl = !query.filters.sourceUrl ? clearOp : {
                value: true
            }

            action.streamingUrl = !query.filters.streamingUrl ? clearOp : {
                value: true
            }

            if(Object.keys(action).length > 0) setFilters(action);

            setSearch(query.filters.name ? query.filters.name.contains : "");
            setInitialIncludeTags(query.filters.include ? [query.filters.include] : []);
            setInitialExcludeTags(query.filters.exclude ? [query.filters.exclude] : []);
            setInitialTalent(query.filters.talent ? [query.filters.talent.contains] : []);
            setInitialStudio(query.filters.studio ? [query.filters.studio.contains] : []);
            setDurationValues([
                query.filters.minDuration ? Number(query.filters.minDuration) : 0,
                query.filters.maxDuration ? Number(query.filters.maxDuration) : 7
            ]);
            setSourceUrl(query.filters.sourceUrl ? true : false);
            setStreamingUrl(query.filters.streamingUrl ? true : false);
            
        }, 100);
    }, [query])

    useEffect(() => {
        console.log("Query vs New", query.filters, filters);
        if(ScriptUtils.filtersEqual(query.filters, filters)) {
            console.log("Filters: No change to filters");
            return;
        }
        console.log("Filters: Emitting new filter event", filters);
        onFilter(filters);
    }, [filters])

    const handleSliderChange = values => {
        let action = {};
        if(values[0] !== 0) action.minDuration = {value: values[0]}
        else action.minDuration = {"operation" : "clear"}
        if(values[1] !== 7) action.maxDuration = {value: values[1]}
        else action.maxDuration = {"operation" : "clear"}
        if(Object.keys(action).length > 0) setFilters(action);
    }

    const updateSlider = values => {
        setDurationValues(values);
    }

    const handleSearch = e => {
        if(e.key && e.key !== "Enter") return;
        if(filters.name && search === filters.name.contains) return;

        setFilters({
            name: search && search !== ""
                ? { value: search }
                : { operation : "clear" }
        })
    }

    const handleSourceChange = e => {
        setSourceUrl(e.target.checked);
        setFilters({
            sourceUrl: e.target.checked ? {value: true} : {}
        })
    }

    const handleStreamingChange = e => {
        setStreamingUrl(e.target.checked);
        setFilters({
            streamingUrl: e.target.checked ? {value: true} : {}
        })
    }

    const [savingSearch, setSavingSearch] = useState(false);
    const saveSearch = async () => {
        if(!user) {
            console.error("No user logged in, how did you even call this method?")
            return;
        }

        const queryString = ScriptUtils.queryToString(ScriptUtils.objectToQuery(query));
        if(queryString === "") {
            console.error("No queries applied");
            return;
        }

        console.log("Saving query", queryString);

        setSavingSearch(true);

        try {
            const response = await axios.post("/api/users/savesearch", {uid: user.id, searchString: queryString});

        } catch(error) {
            console.error("Failed saving search", error);
        }

        setSavingSearch(false);
    }

    return (
        <div className={style.filters}>
            <div className={style.filtersmain}>
                <label htmlFor="title">Search</label>
                <div className={style.field}>
                    <input 
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        onBlur={handleSearch}
                        onKeyDown={handleSearch}
                        className={style.search}
                    >
                    </input>
                </div>

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
                                            {category.name} ({category.count})
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
                            value={durationValues}
                            marks={[
                                0, 1, 2, 3, 4, 5, 6, 7
                            ]}
                            min={0}
                            max={7}
                            onChange={updateSlider}
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

                <label htmlFor="talent">Talent</label>
                <div className={style.field}>
                    <Tags 
                        className={style.tags}
                        settings = {
                            {
                                enforceWhitelist: true,
                                dropdown: {
                                    highlightFirst: true,
                                    enabled: 0
                                },
                                mode: "select"
                            }
                        }
                        value={initialTalent}
                        whitelist={talentOptions}
                        onAdd={e => {
                            console.log("talent added ", e.detail.data)
                            setFilters({talent: {
                                value: e.detail.data.value
                            }})
                        }}
                        onRemove={e => {
                            console.log("talent removed", e.detail.data);
                            setFilters({talent: {
                                operation: "clear"
                            }})
                        }}
                    />
                </div>

                <label htmlFor="talent">Studio</label>
                <div className={style.field}>
                    <Tags 
                        className={style.tags}
                        settings = {
                            {
                                enforceWhitelist: true,
                                dropdown: {
                                    highlightFirst: true,
                                    enabled: 0
                                },
                                mode: "select"
                            }
                        }
                        value={initialStudio}
                        whitelist={studioOptions}
                        onAdd={e => {
                            console.log("studio added ", e.detail.data)
                            setFilters({studio: {
                                value: e.detail.data.value
                            }})
                        }}
                        onRemove={e => {
                            console.log("studio removed", e.detail.data);
                            setFilters({studio: {
                                operation: "clear"
                            }})
                        }}
                    />
                </div>

                <label htmlFor="source">Has Source Link</label>
                <div className={`${style.field} ${style.checkbox}`}>
                    <Checkbox checked={sourceUrl} onChange={handleSourceChange}>
                        <FaCheck />
                    </Checkbox>
                </div>

                <label htmlFor="source">Has Streaming Link</label>
                <div className={`${style.field} ${style.checkbox}`}>
                    <Checkbox checked={streamingUrl} onChange={handleStreamingChange}>
                        <FaCheck />
                    </Checkbox>
                </div>

                { user ? (
                    <>
                        <label htmlFor="save">Save</label>
                        <div className={`${style.field} ${style.button}`}>
                            { savingSearch 
                                ? <p>Saving...</p>
                                : <button onClick={() => saveSearch()}>Save Current Search Settings</button>
                            }
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Filters;