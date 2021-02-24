import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

import ScriptGrid from "./ScriptGrid";
import Filters from "./Filters";
import Sorting from "./Sorting";
import Pagination from "./Pagination";

import ScriptUtils from "../../utilities/ScriptUtils";

import style from "./BrowseScripts.module.css";

const BrowseScripts = ({ propScripts, scriptCount, tags, categories, query }) => {
    const [scripts, setScripts] = useState([]);
    const [cachedFilters, setCachedFilters] = useState({ ...query.filters });
    const [cachedSorting, setCachedSorting] = useState([{ created: "desc" }]);

    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts]);

    console.log(query.filters);

    const getHeadTitle = query => {
        if (query.filters === {}) return `All Scripts (${scriptCount} total)`;
        if (query.filters.name)
            return `Results for '${query.filters.name.contains}' (${scriptCount} total)`;
        if (query.filters.category)
            return `Category: ${query.filters.category.name.equals} (${scriptCount} total)`;
        if (query.filters.include) return `Tag: ${query.filters.include[0]} (${scriptCount} total)`;
        return "Filtered Scripts (${scriptCount} total)";
    };

    const getBodyTitle = query => {
        if (query.filters === {}) return `All Scripts (${scriptCount} total)`;
        if (query.filters.name)
            return `Scripts matching "${query.filters.name.contains}" (${scriptCount} total)`;
        if (query.filters.category)
            return `${query.filters.category.name.equals} Scripts (${scriptCount} total)`;
        if (query.filters.include)
            return `Scripts tagged with "${query.filters.include[0]}" (${scriptCount} total)`;
        return `Filtered Scripts (${scriptCount} total after ${
            Object.keys(query.filters).length
        } filter${Object.keys(query.filters).length === 1 ? "" : "s"})`;
    };

    const handleFilters = filters => {
        setCachedFilters(filters);
        const params = ScriptUtils.objectToQuery({ filters, sorting: cachedSorting });
        const newParamString = ScriptUtils.queryToString(params);
        if (newParamString && newParamString !== "") {
            console.log("BrowseScripts: New params, navigating", newParamString);
            Router.push("/scripts" + newParamString);
        } else if (newParamString === "" && Object.keys(filters).length === 0) {
            console.log("BrowseScripts: No params, navigating to /scripts");
            Router.push("/scripts");
        } else {
            console.log("BrowseScripts: No change to params");
        }
    };

    const handleSort = sorting => {
        setCachedSorting(sorting);
        const params = ScriptUtils.objectToQuery({ filters: cachedFilters, sorting });
        const newParamString = ScriptUtils.queryToString(params);
        if (newParamString && newParamString !== "") {
            console.log("BrowseScripts: New params, navigating", newParamString);
            Router.push("/scripts" + newParamString);
        } else if (newParamString === "" && Object.keys(filters).length === 0) {
            console.log("BrowseScripts: No params, navigating to /scripts");
            Router.push("/scripts");
        } else {
            console.log("BrowseScripts: No change to params");
        }
    };

    return (
        <div>
            <Head>
                <title>ScriptAxis | {getHeadTitle(query)}</title>
            </Head>
            <div className={style.browsescripts}>
                <Filters
                    tags={tags}
                    categories={categories}
                    onFilter={handleFilters}
                    query={query}
                />
                <div>
                    <div className={style.tileheader}>
                        <h1>{getBodyTitle(query)}</h1>
                        <Sorting onSort={handleSort} />
                    </div>
                    {!scripts || scripts.length === 0 ? (
                        <div className={style.noscripts}>
                            <p>No scripts match your selected filters</p>
                        </div>
                    ) : (
                        <>
                            <ScriptGrid
                                scripts={scripts}
                                customStyle={{
                                    gridTemplateColumns: `repeat(3, 1fr)`,
                                }}
                            />
                            {scriptCount < 18 ? null : (
                                <Pagination
                                    curPage={Number(query.page) || 1}
                                    totalPages={Math.ceil(scriptCount / 18.0)}
                                    query={query}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowseScripts;
