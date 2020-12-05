import {useState, useEffect} from 'react'
import style from './Filters.module.css'
import ScriptUtils from '../utilities/ScriptUtils'

import dynamic from 'next/dynamic'
const Tags = dynamic(() => import("@yaireo/tagify/dist/react.tagify"), { ssr: false });

import ReactSlider from 'react-slider'

const Filters = ({tags, categories, query, onFilter}) => {
    const [filters, setFilters] = useState(() => {
        if(query.category) return { category: query.category };
        return {};
    });
    const [initialIncludeTags, setInitialIncludeTags] = useState("");
    useEffect(() => {
        if(query.tag) {
            setInitialIncludeTags(query.tag)
        }
    }, [query])

    console.log(initialIncludeTags)

    useEffect(() => {
        onFilter(filters);
    }, [filters])

    const setIncludedTags = tags => {
        setFilters(cur => {
            return {
                ...cur,
                includedTags: tags
            }
        });
    }

    const setExcludedTags = tags => {
        setFilters(cur => {
            return {
                ...cur,
                excludedTags: tags
            }
        });
    }

    const setCategory = category => {
        setFilters(cur => {
            return {
                ...cur,
                category: category
            }
        });
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
                minDuration,
                maxDuration
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
                                    <li key={category}>
                                        <a 
                                            className={filters.category === category ? style.selectedcategory : null}
                                            onClick={() => setCategory(category)}
                                        >
                                            {ScriptUtils.getPrettyCategory(category)}
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
                        blacklist={categories}
                        onChange={e => {
                            e.persist();
                            if(!e.target.value || e.target.value.length === 0) {
                                setIncludedTags([]);
                                return;
                            }
                            const json = JSON.parse(e.target.value);
                            setIncludedTags(json.map(tag => tag.value.trim().toLowerCase().replace(" ", "-")));
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
                            onChange={handleSliderChange}
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