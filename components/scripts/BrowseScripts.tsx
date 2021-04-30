import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

import ScriptGrid from "./ScriptGrid";
import FiltersElement from "./Filters";
import SortingElement from "./Sorting";
import Pagination from "./Pagination";

import ScriptUtils from "../../lib/ScriptUtils";

import style from "./BrowseScripts.module.scss";
import { Filters, Query, Script, Sorting } from "lib/types";

const BrowseScripts = ({
    propScripts,
    scriptCount,
    query,
}: {
    propScripts: Script[];
    scriptCount: number;
    query: Query;
}): JSX.Element => {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [cachedFilters, setCachedFilters] = useState<Filters>({ ...query.filters });
    const [cachedSorting, setCachedSorting] = useState<Sorting[]>([{ created: "desc" }]);

    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts]);

    console.log(query.filters);

    const getHeadTitle = (query: Query) => {
        const filterCount = query.filters ? Object.keys(query.filters).length : 0;
        if (filterCount === 0) return `All Scripts`;
        if (query.filters.name) return `Results for '${query.filters.name.contains}'`;
        if (query.filters.category) return `Category: ${query.filters.category.name.equals}`;
        if (query.filters.include) return `Tag: ${query.filters.include[0]}`;
        return `Filtered Scripts`;
    };

    const getBodyTitle = (query: Query) => {
        const filterCount = query.filters ? Object.keys(query.filters).length : 0;
        if (filterCount === 0) return `All Scripts (${scriptCount} total)`;
        if (query.filters.name)
            return `Scripts matching "${query.filters.name.contains}" (${scriptCount} total)`;
        if (query.filters.category)
            return `${query.filters.category.name.equals} Scripts (${scriptCount} total)`;
        if (query.filters.include)
            return `Scripts tagged with "${query.filters.include[0]}" (${scriptCount} total)`;
        return `Filtered Scripts (${scriptCount} total after ${filterCount} filter${
            filterCount === 1 ? "" : "s"
        })`;
    };

    const handleFilters = (filters: Filters) => {
        setCachedFilters(filters);
        const params = ScriptUtils.queryToUrlQuery({ filters, sorting: cachedSorting });
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

    const handleSort = (sorting: Sorting[]) => {
        setCachedSorting(sorting);
        const params = ScriptUtils.queryToUrlQuery({ filters: cachedFilters, sorting });
        const newParamString = ScriptUtils.queryToString(params);
        if (newParamString && newParamString !== "") {
            console.log("BrowseScripts: New params, navigating", newParamString);
            Router.push("/scripts" + newParamString);
        } else if (newParamString === "" && Object.keys(cachedFilters).length === 0) {
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
                <FiltersElement onFilter={handleFilters} query={query} />
                <div>
                    <div className={style.tileheader}>
                        <h1>{getBodyTitle(query)}</h1>
                        <SortingElement onSort={handleSort} />
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
