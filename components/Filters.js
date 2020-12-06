import {useState, useEffect} from 'react'
import style from './Filters.module.css'
import ScriptUtils from '../utilities/ScriptUtils'

import dynamic from 'next/dynamic'
const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

import ReactSlider from 'react-slider'

const Filters = ({query, onFilter}) => {
    const [filters, setFilters] = useState({});
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
                setCategory(query.filters.category.name.equals);
            } else {
                clearCategory();
            }
        }, 100)
    }, [query])

    useEffect(() => {
        if(Object.keys(filters).length === 0) return;
        onFilter(filters);
    }, [filters])

    const setIncludedTags = tags => {
        setFilters(cur => {
            return {
                ...cur,
                include: tags
            }
        });
    }

    const setExcludedTags = tags => {
        setFilters(cur => {
            return {
                ...cur,
                exclude: tags
            }
        });
    }

    const setCategory = category => {
        const shouldToggleOff = (
            filters.category && 
            filters.category.name && 
            filters.category.name.equals && 
            filters.category.name.equals === category
        );
        console.log("Setting category", category, shouldToggleOff)
        setFilters(cur => {
            return {
                ...cur,
                category: shouldToggleOff ? undefined : { name: { equals: category }}
            }
        });
    }

    const clearCategory = () => {
        setFilters(cur => {
            return {
                ...cur,
                category: undefined
            }
        })
    }

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
        setFilters(cur => {
            return {
                ...cur,
                duration: { 
                    min: values[0] === 0 ? -1 : minDuration,
                    max: values[1] === 7 ? -1 : maxDuration
                }
            }
        })
    }

    console.log(filters);

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
                                            onClick={() => setCategory(category.name)}
                                        >
                                            {ScriptUtils.getPrettyCategory(category.name)} ({category.count})
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <label htmlFor="includeTags">Tags</label>
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
                        blacklist={categories}
                        onChange={e => {
                            e.persist();
                            if(!e.target.value || e.target.value.length === 0) {
                                setIncludedTags([]);
                                return;
                            }
                            if(!e.target.value || e.target.value === "") setIncludedTags([])
                            else {
                                const json = JSON.parse(e.target.value);
                                setIncludedTags(json.map(tag => tag.value.trim().toLowerCase().replace(" ", "-")));
                            }
                        }}
                    />
                </div>
                {/* Sadly, it seems that Firestore just can't do this :c
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
                        blacklist={categories}
                        onChange={e => {
                            e.persist();
                            if(!e.target.value || e.target.value.length === 0) {
                                setExcludedTags([]);
                                return;
                            }
                            const json = JSON.parse(e.target.value);
                            setExcludedTags(json.map(tag => tag.value.trim().toLowerCase().replace(" ", "-")));
                        }}
                    />
                </div>
                */}
                
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