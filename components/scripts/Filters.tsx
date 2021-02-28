import { useState, useEffect, useReducer } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { FaCheck } from "react-icons/fa";
import ReactSlider from "react-slider";
import axios from "axios";

import Checkbox from "../forms/Checkbox";

import ScriptUtils from "../../lib/ScriptUtils";
import useAuth from "../../lib/auth/useAuth";

import style from "./Filters.module.scss";
import { Filters, Query } from "lib/types";

interface FilterActions {
    name?: FilterAction;
    category?: FilterAction;
    include?: FilterActionArray;
    exclude?: FilterActionArray;
    minDuration?: FilterAction;
    maxDuration?: FilterAction;
    talent?: FilterAction;
    studio?: FilterAction;
    sourceUrl?: FilterAction;
    streamingUrl?: FilterAction;
}
interface FilterAction {
    operation?: "clear" | "set" | "toggle";
    stringValue?: string;
    booleanValue?: boolean;
    numberValue?: number;
}

interface FilterActionArray {
    operation?: "clear" | "set" | "toggle" | "add" | "remove";
    value?: string[];
    item?: string;
}

const reduceFilters = (currentFilters: Filters, action: FilterActions) => {
    const newFilters = { ...currentFilters };
    if (action.name) {
        if (action.name.operation === "clear") delete newFilters.name;
        else newFilters.name = { contains: action.name.stringValue };
    }
    if (action.category) {
        if (action.category.operation === "clear") {
            delete newFilters.category;
        } else if (action.category.operation === "set") {
            newFilters.category = { name: { equals: action.category.stringValue } };
        } else if (action.category.operation === "toggle") {
            if (
                action.category.stringValue &&
                newFilters.category &&
                newFilters.category.name.equals === action.category.stringValue
            )
                delete newFilters.category;
            else newFilters.category = { name: { equals: action.category.stringValue } };
        }
    }
    if (action.include) {
        if (action.include.operation === "add") {
            if (!newFilters.include) newFilters.include = [action.include.item];
            else if (newFilters.include.findIndex(f => f === action.include.item) === -1)
                newFilters.include.push(action.include.item);
        } else if (action.include.operation === "remove") {
            if (!newFilters.include || newFilters.include.length === 0) delete newFilters.include;
            newFilters.include = newFilters.include.filter(tag => tag !== action.include.item);
            if (newFilters.include.length === 0) delete newFilters.include;
        } else if (action.include.operation === "set") {
            if (!action.include.value || action.include.value.length === 0)
                delete newFilters.include;
            else newFilters.include = action.include.value;
        } else if (action.include.operation === "clear") {
            delete newFilters.include;
        } else {
            console.error(
                `Unexpected value ${action.include.operation} for reduceFilters operation`
            );
        }
    }
    if (action.exclude) {
        if (action.exclude.operation === "add") {
            if (!newFilters.exclude) newFilters.exclude = [action.exclude.item];
            else if (newFilters.exclude.findIndex(f => f === action.exclude.item) === -1)
                newFilters.exclude.push(action.exclude.item);
        } else if (action.exclude.operation === "remove") {
            if (!newFilters.exclude || newFilters.exclude.length === 0) delete newFilters.exclude;
            newFilters.exclude = newFilters.exclude.filter(tag => tag !== action.exclude.item);
            if (newFilters.exclude.length === 0) delete newFilters.exclude;
        } else if (action.exclude.operation === "clear") {
            delete newFilters.exclude;
        } else {
            console.error(
                `Unexpected value ${action.exclude.operation} for reduceFilters operation`
            );
        }
    }
    if (action.minDuration) {
        if (action.minDuration.operation === "clear") delete newFilters.minDuration;
        else newFilters.minDuration = action.minDuration.numberValue;
    }
    if (action.maxDuration) {
        if (action.maxDuration.operation === "clear") delete newFilters.maxDuration;
        else newFilters.maxDuration = action.maxDuration.numberValue;
    }
    if (action.talent) {
        if (action.talent.operation === "clear") delete newFilters.talent;
        else newFilters.talent = action.talent.stringValue;
    }
    if (action.studio) {
        if (action.studio.operation === "clear") delete newFilters.studio;
        else newFilters.studio = { contains: action.studio.stringValue };
    }
    if (action.sourceUrl) {
        if (!action.sourceUrl.booleanValue) delete newFilters.sourceUrl;
        else newFilters.sourceUrl = { not: null };
    }
    if (action.streamingUrl) {
        if (!action.streamingUrl.booleanValue) delete newFilters.streamingUrl;
        else newFilters.streamingUrl = { not: null };
    }

    console.log("Mutating filters", currentFilters, action, newFilters);
    return newFilters;
};

const FiltersElement = ({
    query,
    onFilter,
}: {
    query: Query;
    onFilter: (filters: Filters) => void;
}): JSX.Element => {
    const [filters, setFilters] = useReducer(reduceFilters, query.filters);
    const [initialIncludeTags, setInitialIncludeTags] = useState<string[]>([]);
    const [initialExcludeTags, setInitialExcludeTags] = useState<string[]>([]);
    const [durationValues, setDurationValues] = useState([0, 7]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [talentOptions, setTalentOptions] = useState([]);
    const [studioOptions, setStudioOptions] = useState([]);
    const [initialTalent, setInitialTalent] = useState([]);
    const [initialStudio, setInitialStudio] = useState([]);
    const [sourceUrl, setSourceUrl] = useState(false);
    const [streamingUrl, setStreamingUrl] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        window.setTimeout(() => {
            const storedTagCounts = window.localStorage.getItem("storedTagCounts");
            if (storedTagCounts) setTags(JSON.parse(storedTagCounts).map(tag => tag.name));

            const storedCategoryCounts = window.localStorage.getItem("storedCategoryCounts");
            if (storedCategoryCounts) setCategories(JSON.parse(storedCategoryCounts));

            const storedTalent = window.localStorage.getItem("storedTalent");
            if (storedTalent) setTalentOptions(JSON.parse(storedTalent));

            const storedStudios = window.localStorage.getItem("storedStudios");
            if (storedStudios) setStudioOptions(JSON.parse(storedStudios));
        }, 50);
    }, []);

    useEffect(() => {
        window.setTimeout(() => {
            const action: FilterActions = {};
            const clearOp: FilterAction = { operation: "clear" };
            action.name = !query.filters.name
                ? clearOp
                : {
                      stringValue: query.filters.name.contains,
                  };

            action.include = !query.filters.include
                ? clearOp
                : {
                      operation: "add",
                      item: query.filters.include[0],
                  };

            action.exclude = !query.filters.exclude
                ? clearOp
                : {
                      operation: "add",
                      item: query.filters.exclude[0],
                  };

            action.category = !query.filters.category
                ? clearOp
                : {
                      operation: "set",
                      stringValue: query.filters.category.name.equals,
                  };

            action.minDuration = !query.filters.minDuration
                ? clearOp
                : {
                      numberValue: query.filters.minDuration,
                  };

            action.maxDuration = !query.filters.maxDuration
                ? clearOp
                : {
                      numberValue: query.filters.maxDuration,
                  };

            action.talent = !query.filters.talent
                ? clearOp
                : {
                      stringValue: query.filters.talent,
                  };

            action.sourceUrl = !query.filters.sourceUrl
                ? clearOp
                : {
                      booleanValue: true,
                  };

            action.streamingUrl = !query.filters.streamingUrl
                ? clearOp
                : {
                      booleanValue: true,
                  };

            if (Object.keys(action).length > 0) setFilters(action);

            setSearch(query.filters.name ? query.filters.name.contains : "");
            setInitialIncludeTags(query.filters.include ? query.filters.include : []);
            setInitialExcludeTags(query.filters.exclude ? query.filters.exclude : []);
            setInitialTalent(query.filters.talent ? [query.filters.talent] : []);
            setInitialStudio(query.filters.studio ? [query.filters.studio.contains] : []);
            setDurationValues([
                query.filters.minDuration ? Number(query.filters.minDuration) : 0,
                query.filters.maxDuration ? Number(query.filters.maxDuration) : 7,
            ]);
            setSourceUrl(query.filters.sourceUrl ? true : false);
            setStreamingUrl(query.filters.streamingUrl ? true : false);
            setSaved(false);
        }, 100);
    }, [query]);

    useEffect(() => {
        console.log("Query vs New", query.filters, filters);
        if (ScriptUtils.filtersEqual(query.filters, filters)) {
            console.log("Filters: No change to filters");
            return;
        }
        console.log("Filters: Emitting new filter event", filters);
        onFilter(filters);
    }, [filters]);

    const handleSliderChange = values => {
        const action: FilterActions = {};
        if (values[0] !== 0) action.minDuration = { numberValue: values[0] };
        else action.minDuration = { operation: "clear" };
        if (values[1] !== 7) action.maxDuration = { numberValue: values[1] };
        else action.maxDuration = { operation: "clear" };
        if (Object.keys(action).length > 0) setFilters(action);
    };

    const updateSlider = values => {
        setDurationValues(values);
    };

    const handleSearch = () => {
        if (filters.name && search === filters.name.contains) return;

        setFilters({
            name: search && search !== "" ? { stringValue: search } : { operation: "clear" },
        });
    };

    const handleSearchKey = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        handleSearch();
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSourceUrl(e.target.checked);
        setFilters({
            sourceUrl: e.target.checked ? { booleanValue: true } : {},
        });
    };

    const handleStreamingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreamingUrl(e.target.checked);
        setFilters({
            streamingUrl: e.target.checked ? { booleanValue: true } : {},
        });
    };

    const [savingSearch, setSavingSearch] = useState(false);
    const saveSearch = async () => {
        if (!user) {
            console.error("No user logged in, how did you even call this method?");
            return;
        }

        const saveQuery = { ...query };
        delete saveQuery.page;
        const queryString = ScriptUtils.queryToString(ScriptUtils.queryToUrlQuery(saveQuery));
        if (queryString === "") {
            console.error("No queries applied");
            return;
        }

        console.log("Saving query", queryString);

        setSavingSearch(true);

        try {
            const response = await axios.post("/api/users/savesearch", {
                uid: user.id,
                searchString: queryString,
            });
            if (response.data.error) throw response.data.error;
        } catch (error) {
            console.error("Failed saving search", error);
        }

        setSavingSearch(false);
        setSaved(true);
    };

    return (
        <div className={style.filters}>
            <div className={style.filtersmain}>
                <label htmlFor="title">Search</label>
                <div className={style.field}>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onBlur={handleSearch}
                        onKeyDown={handleSearchKey}
                        className={style.search}
                    ></input>
                </div>

                <label htmlFor="category">Category</label>
                <div className={style.field}>
                    <ul className={style.categories}>
                        {categories.map(category => {
                            return (
                                <li key={category.name}>
                                    <a
                                        className={
                                            filters.category &&
                                            filters.category.name &&
                                            filters.category.name.equals === category.name
                                                ? style.selectedcategory
                                                : null
                                        }
                                        onClick={() =>
                                            setFilters({
                                                category: {
                                                    operation: "toggle",
                                                    stringValue: category.name,
                                                },
                                            })
                                        }
                                    >
                                        {category.name} ({category.count})
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <label htmlFor="includeTags">Include Tags</label>
                <div className={style.field}>
                    <Tags
                        className={style.tags}
                        settings={{
                            enforceWhitelist: true,
                            dropdown: {
                                highlightFirst: true,
                                enabled: 0,
                            },
                        }}
                        value={initialIncludeTags}
                        whitelist={tags}
                        onAdd={e => {
                            setFilters({
                                include: {
                                    operation: "add",
                                    item: ScriptUtils.formatTag(e.detail.data.value),
                                },
                            });
                        }}
                        onRemove={e => {
                            setFilters({
                                include: {
                                    operation: "remove",
                                    item: ScriptUtils.formatTag(e.detail.data.value),
                                },
                            });
                        }}
                    />
                </div>

                <label htmlFor="excludeTags">Exclude Tags</label>
                <div className={style.field}>
                    <Tags
                        className={style.tags}
                        settings={{
                            enforceWhitelist: true,
                            dropdown: {
                                highlightFirst: true,
                                enabled: 0,
                            },
                        }}
                        value={initialExcludeTags}
                        whitelist={tags}
                        onAdd={e => {
                            setFilters({
                                exclude: {
                                    operation: "add",
                                    item: ScriptUtils.formatTag(e.detail.data.value),
                                },
                            });
                        }}
                        onRemove={e => {
                            setFilters({
                                exclude: {
                                    operation: "remove",
                                    item: ScriptUtils.formatTag(e.detail.data.value),
                                },
                            });
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
                            marks={[0, 1, 2, 3, 4, 5, 6, 7]}
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
                        settings={{
                            enforceWhitelist: true,
                            dropdown: {
                                highlightFirst: true,
                                enabled: 0,
                            },
                            mode: "select",
                        }}
                        value={initialTalent}
                        whitelist={talentOptions}
                        onAdd={e => {
                            console.log("talent added ", e.detail.data);
                            setFilters({
                                talent: {
                                    stringValue: ScriptUtils.formatTag(e.detail.data.value),
                                },
                            });
                        }}
                        onRemove={e => {
                            console.log("talent removed", e.detail.data);
                            setFilters({
                                talent: {
                                    operation: "clear",
                                },
                            });
                        }}
                    />
                </div>

                <label htmlFor="talent">Studio</label>
                <div className={style.field}>
                    <Tags
                        className={style.tags}
                        settings={{
                            enforceWhitelist: true,
                            dropdown: {
                                highlightFirst: true,
                                enabled: 0,
                            },
                            mode: "select",
                        }}
                        value={initialStudio}
                        whitelist={studioOptions}
                        onAdd={e => {
                            console.log("studio added ", e.detail.data);
                            setFilters({
                                studio: {
                                    stringValue: e.detail.data.value,
                                },
                            });
                        }}
                        onRemove={e => {
                            console.log("studio removed", e.detail.data);
                            setFilters({
                                studio: {
                                    operation: "clear",
                                },
                            });
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

                {user ? (
                    <>
                        <label htmlFor="save">Save</label>
                        <div className={`${style.field} ${style.button}`}>
                            {savingSearch ? (
                                <p>Saving...</p>
                            ) : saved ? (
                                <p>Search parameters saved. Check your Dashboard!</p>
                            ) : (
                                <button onClick={() => saveSearch()}>
                                    Save Current Search Settings
                                </button>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default FiltersElement;
