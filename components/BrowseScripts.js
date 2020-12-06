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
    const [cachedFilters, setFilters] = useState({});
    const [cachedSorting, setSorting] = useState({field: "created", direction: "desc"});
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

    const handleFilters = filters => {
        console.log(filters);
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