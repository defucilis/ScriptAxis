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
    }

    const handleSort = sort => {
        console.log(sort);
    }

    const [loading, setLoading] = useState(false);

    const fetchNewScripts = async() => {
        setLoading(true);



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
                    <ScriptGrid scripts={scripts} customStyle={{
                        gridTemplateColumns: `repeat(3, 1fr)`
                    }} />
                </div>
            </div>
        </div>
    )
}

export default BrowseScripts;