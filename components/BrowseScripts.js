import {useState, useEffect} from 'react'
import ScriptGrid from '../components/ScriptGrid'
import ScriptUtils from '../utilities/ScriptUtils'
import firebase from '../utilities/Firebase'
import Head from 'next/head'
import Filters from './Filters'
import Sorting from './Sorting'
import style from './BrowseScripts.module.css'

const BrowseScripts = ({propScripts, tags, categories, query}) => {
    const [scripts, setScripts] = useState([]);
    const [cachedFilters, setFilters] = useState({});
    const [cachedSorting, setSorting] = useState({field: "created", direction: "desc"});
    
    useEffect(() => {
        setScripts(propScripts);
    }, [propScripts])

    const getHeadTitle = query => {
        return query.search || query.category || query.tag || "Scripts";
    }

    const getBodyTitle = query => {
        if(query.search) 
            return `Scripts matching "${query.search}"`
        if(query.category)
            return `${ScriptUtils.getPrettyCategory(query.category)} Scripts`;
        if(query.tag)
            return `Scripts tagged with ${ScriptUtils.getPrettyCategory(query.tag)}`;
        return "All Scripts";
    }

    const handleFilters = filters => {
        console.log(filters);
        setFilters(filters);
        fetchNewScripts(filters, cachedSorting);
    }

    const handleSort = sorting => {
        console.log(sorting);
        setSorting(sorting);
        fetchNewScripts(cachedFilters, sorting);
    }

    const [loading, setLoading] = useState(false);

    const fetchNewScripts = async(filters, sorting) => {
        setLoading(true);

        const db = firebase.firestore();
        let dbQuery = db.collection("scripts");
        //the order is important here
        if(filters.minDuration) dbQuery = dbQuery.where("duration", ">=", filters.minDuration);
        if(filters.maxDuration) dbQuery = dbQuery.where("duration", "<", filters.maxDuration);
        if(filters.category) dbQuery = dbQuery.where("category", "==", filters.category);
        if(filters.includedTags && filters.includedTags.length > 0) 
            dbQuery = dbQuery.where("tags", "array-contains-any", filters.includedTags);

        if(filters.minDuration || filters.maxDuration) {
            dbQuery = dbQuery.orderBy("duration", "asc");
        }

        if(sorting) {
            dbQuery = dbQuery.orderBy(sorting.field, sorting.direction);
        }
        dbQuery = dbQuery.limit(12);
        const results = await dbQuery.get();
        setScripts(results.docs.map(doc => ScriptUtils.parseScriptDocument(doc)));

        setLoading(false);
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
        </div>
    )
}

export default BrowseScripts;