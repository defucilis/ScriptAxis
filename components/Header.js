import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'
import {FaSearch} from 'react-icons/fa'
import ScriptUtils from '../utilities/ScriptUtils'
import axios from 'axios'

import styles from './Header.module.css'

const Header = ({page}) => {

    const [scriptCount, setScriptCount] = useState(0);
    const [categoryCounts, setCategoryCounts] = useState([]);
    const [tagCounts, setTagCounts] = useState([]);
    const categoriesRef = useRef();
    const tagsRef = useRef();
    useEffect(() => {
        const loadScriptCount = async () => {
            try {
                const res = await axios.get("/api/tagscategories");
                const {tags, categories} = res.data;
                console.log({tags, categories});
                const scriptCount = categories.reduce((acc, category) => acc + category.count, 0);
                setCategoryCounts(categories);
                setTagCounts(tags);
                setScriptCount(scriptCount);
                window.localStorage.setItem("scriptCount", scriptCount);
                window.localStorage.setItem("storedTagCounts", JSON.stringify(tags));
                window.localStorage.setItem("storedCategoryCounts", JSON.stringify(categories));
            } catch(error) {
                console.log(error);
            }
        }
        const storedScriptCount = window.localStorage.getItem("scriptCount");
        const storedTagCounts = window.localStorage.getItem("storedTagCounts");
        const storedCategoryCounts = window.localStorage.getItem("storedCategoryCounts");
        if(storedScriptCount) setScriptCount(storedScriptCount);
        if(storedTagCounts) setTagCounts(JSON.parse(storedTagCounts));
        if(storedCategoryCounts) setCategoryCounts(JSON.parse(storedCategoryCounts));
        loadScriptCount();
    }, [])

    const doSearch = e => {
        e.preventDefault();
        if(!e.target.search.value) return;

        Router.push(`/scripts?search=${e.target.search.value}`);
    }

    const handleMouse = (item, enter) => {
        if(item === "categories") {
            categoriesRef.current.style.setProperty("display", enter ? "block" : "none");
            tagsRef.current.style.setProperty("display", "none");
        } else if(item === "tags") {
            tagsRef.current.style.setProperty("display", enter ? "block" : "none");
            categoriesRef.current.style.setProperty("display", "none");
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.searchbar}>
                <div className="container">
                    <Link href="/">
                        <a className={styles.logo}>
                            <Image src="/img/script-axis-512.png" alt="Script Axis logo" width="180" height="45" />
                        </a>
                    </Link>
                    <form onSubmit={doSearch}>
                        <input id="search" type="text" placeholder={`Search ${scriptCount > 0 ? scriptCount + " " : ""}Scripts...`} />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>
                    <Link href="/add">
                        <a className={styles.addscript}>+ Add a Script</a>
                    </Link>
                </div>
            </div>
            <div className={styles.navbar}>
                <div className="container">
                    <ul>
                        <li className={!page || page === "home" 
                            ? styles.currentnav 
                            : null}
                        >
                            <Link href="/"><a>HOME</a></Link>
                        </li>
                        <li className={page === "scripts" 
                            ? styles.currentnav 
                            : null}
                        >
                            <Link href="/scripts"><a>SCRIPTS</a></Link>
                        </li>
                        <li className={page === "categories" 
                            ? styles.currentnav 
                            : null}
                            onMouseEnter={e => handleMouse("categories", true)}
                            onMouseLeave={e => handleMouse("categories", false)}
                        >
                            <a>CATEGORIES</a>
                        </li>
                        <li className={page === "tags" 
                            ? styles.currentnav 
                            : null}
                            onMouseEnter={e => handleMouse("tags", true)}
                            onMouseLeave={e => handleMouse("tags", false)}
                        >
                            <a>TAGS</a>
                        </li>
                        <li className={page === "creators" 
                            ? styles.currentnav 
                            : null} 
                            onClick={() => alert("Coming soon!")}
                        >
                            <Link href="/">CREATORS</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div 
                className={styles.categories} 
                ref={categoriesRef} 
                onMouseEnter={e => handleMouse("categories", true)}
                onMouseLeave={e => handleMouse("categories", false)}
            >
                <div className="container">
                    <ul>{
                        categoryCounts.filter(category => category.count > 0).map(category => {
                            return (
                                <li key={category.name}>
                                    <Link href={`/scripts?category=${category.name}`}>
                                        <a>
                                            {ScriptUtils.getPrettyCategory(category.name)}
                                            <br/>
                                            ({category.count} Script{category.count > 1 ? "s" : ""})
                                        </a>
                                    </Link>
                                </li>
                            )
                        })
                    }</ul>
                </div>
            </div>
            <div 
                className={styles.tags} 
                ref={tagsRef} 
                onMouseEnter={e => handleMouse("tags", true)}
                onMouseLeave={e => handleMouse("tags", false)}
            >
                <div className="container">
                    <ul>{
                        tagCounts.filter(tag => tag.count > 0).map(tag => {
                            return (
                                <li key={tag.name}>
                                    <Link href={`/scripts?tag=${tag.name}`}>
                                        <a>
                                            {ScriptUtils.getPrettyCategory(tag.name)}
                                            <br/>
                                            ({tag.count} Script{tag.count > 1 ? "s" : ""})
                                        </a>
                                    </Link>
                                </li>
                            )
                        })
                    }</ul>
                </div>
            </div>
        </div>
    )
}

export default Header;