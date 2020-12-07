import {useState, useEffect} from 'react'
import ScriptGrid from '../components/ScriptGrid'
import ScriptUtils from '../utilities/ScriptUtils'
import Head from 'next/head'
import Filters from './Filters'
import Sorting from './Sorting'
import style from './BrowseScripts.module.css'
import axios from 'axios'

const BrowseScripts = ({propScripts, tags, categories, query}) => {
    const [scripts, setScripts] = useState([]);
    const [cachedFilters, setFilters] = useState({...query.filters});
    const [cachedSorting, setSorting] = useState([{created:"desc"}]);
    const [customFilters, setCustomFilters] = useState(false);
    
    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts])

    const getHeadTitle = query => {
        if(customFilters) return "Filtered Scripts";
        if(query.filters.name) return `Results for '${query.filters.name.contains}'`;
        if(query.filters.category) return `Category: ${ScriptUtils.getPrettyCategory(query.filters.category.name.equals)}`;
        if(query.filters.include) return `Tag: ${ScriptUtils.getPrettyCategory(query.filters.include[0])}`;
        return "Scripts";
    }

    const getBodyTitle = query => {
        if(customFilters) return "Filtered Scripts";
        if(query.filters.name) return `Scripts matching "${query.filters.name.contains}"`;
        if(query.filters.category) return `${ScriptUtils.getPrettyCategory(query.filters.category.name.equals)} Scripts`;
        if(query.filters.include) return `Scripts tagged with "${ScriptUtils.getPrettyCategory(query.filters.include[0])}"`;
        return "All Scripts";
    }

    const filtersEqual = (filterA, filterB) => {
        const stringArrayEqual = (arrayA, arrayB) => {
            if(arrayA && !arrayB || !arrayA && arrayB) return false;
            if(arrayA.length !== arrayB.length) return false;
            for(var i = 0; i < arrayA.length; i++) {
                if(arrayA[i] !== arrayB[i]) return false;
            }
            return true;
        }
        
        if(filterA.name || filterB.name) {
            if(filterA.name && !filterB.name || !filterA.name && filterB.name) return false;
            else if(filterA.name.contains !== filterB.name.contains) return false;
        }

        if(filterA.category || filterB.category) {
            if(filterA.category && !filterB.category || !filterA.category && filterB.category) return false;
            else if(filterA.category.name.equals !== filterB.category.name.equals) return false;
        }

        if(filterA.include || filterB.include) {
            if(filterA.include && !filterB.include || !filterA.include && filterB.include) return false;
            else if(!stringArrayEqual(filterA.include, filterB.include)) return false;
        }

        if(filterA.exclude || filterB.exclude) {
            if(filterA.exclude && !filterB.exclude || !filterA.exclude && filterB.exclude) return false;
            else if(!stringArrayEqual(filterA.exclude, filterB.exclude)) return false;
        }

        if(filterA.duration || filterB.duration) {
            if(filterA.duration && !filterB.duration || !filterA.duration && filterB.duration) return false;
            if(filterA.duration.max !== filterB.duration.max) return false;
            if(filterA.duration.min !== filterB.duration.min) return false;
        }

        return true;
    }

    const handleFilters = filters => {
        console.log("New filters object", filters);
        let identical = filtersEqual(filters, cachedFilters);
        if(identical) {
            console.log("New filters identical to old filters, doing nothing");
            return;
        } else {
            console.log("Changed filters detected, fetching new scripts");
        }
        setFilters(filters);
        setCustomFilters(true);
        fetchNewScripts(filters, cachedSorting);
    }

    const handleSort = sorting => {
        console.log(sorting);
        setSorting(sorting);
        fetchNewScripts(customFilters ? cachedFilters : query.filters, sorting);
    }

    const [loading, setLoading] = useState(false);

    const fetchNewScripts = async(filters, sorting) => {
        setLoading(true);

        try {
            const res = await axios.post("/api/scripts/query", {filters, sorting});
            setScripts(res.data.map(script => ScriptUtils.parseScriptDocument(script)));
        } catch(error) {
            alert(error);
        } finally {
            setLoading(false);
        }

        // const db = firebase.firestore();
        // let dbQuery = db.collection("scripts");
        // //the order is important here
        // if(filters.minDuration) dbQuery = dbQuery.where("duration", ">=", filters.minDuration);
        // if(filters.maxDuration) dbQuery = dbQuery.where("duration", "<", filters.maxDuration);
        // if(filters.category) dbQuery = dbQuery.where("category", "==", filters.category);
        // if(filters.includedTags && filters.includedTags.length > 0) 
        //     dbQuery = dbQuery.where("tags", "array-contains-any", filters.includedTags);

        // if(filters.minDuration || filters.maxDuration) {
        //     dbQuery = dbQuery.orderBy("duration", "asc");
        // }

        // if(sorting) {
        //     dbQuery = dbQuery.orderBy(sorting.field, sorting.direction);
        // }
        // dbQuery = dbQuery.limit(12);
        // const results = await dbQuery.get();
        // setScripts(results.docs.map(doc => ScriptUtils.parseScriptDocument(doc)));

        //setLoading(false);
    }

    return (
        <div>
            <Head>
                <title>ScriptAxis | {getHeadTitle(query)}</title>
            </Head>
            <div className={style.browsescripts}>
                <Filters tags={tags} categories={categories} onFilter={handleFilters} query={query} />
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
                        <ScriptGrid scripts={scripts} customStyle={{
                            gridTemplateColumns: `repeat(3, 1fr)`
                        }} />
                    )}
                    
                </div>
            </div>
            <div className={`loader top ${loading ? "loadingtop" : "notloadingtop"}`}></div>
            <div className={`loader bottom ${loading ? "loadingbottom" : "notloadingbottom"}`}></div>
        </div>
    )
}

export default BrowseScripts;