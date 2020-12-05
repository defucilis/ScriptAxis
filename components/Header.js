import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'
import {FaSearch} from 'react-icons/fa'
import firebase from '../utilities/Firebase'
import ScriptUtils from '../utilities/ScriptUtils'

import styles from './Header.module.css'

const Header = ({page}) => {

    const [scriptCount, setScriptCount] = useState(0);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [tagCounts, setTagCounts] = useState({});
    const categoriesRef = useRef();
    const tagsRef = useRef();
    useEffect(() => {
        const loadScriptCount = async () => {
            const db = firebase.firestore();
            let dbQuery = db.collection("categories");
            let snapshot = await dbQuery.get();
            const scriptCount = snapshot.docs.reduce((acc, doc) => {
                const scripts = doc.data().scripts;
                if(!scripts || !scripts.length) return acc;
                return acc + scripts.length;
            }, 0);
            snapshot.docs.forEach(doc => {
                const scripts = doc.data().scripts;
                if(!scripts || !scripts.length) return;

                setCategoryCounts(curValue => {
                    return {
                        ...curValue, [doc.id] : scripts.length
                    }
                })
            });
            dbQuery = db.collection("tags");
            snapshot = await dbQuery.get();
            snapshot.docs.forEach(doc => {
                const scripts = doc.data().scripts;
                if(!scripts || !scripts.length) return;

                setTagCounts(curValue => {
                    return {
                        ...curValue, [doc.id] : scripts.length
                    }
                })
            });

            window.localStorage.setItem("scriptCount", scriptCount);
            setScriptCount(scriptCount);
        }
        const storedScriptCount = window.localStorage.getItem("scriptCount");
        if(storedScriptCount) setScriptCount(storedScriptCount);
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
                        <li className={page === "authors" 
                            ? styles.currentnav 
                            : null} 
                            onClick={() => alert("Coming soon!")}
                        >
                            <Link href="/">AUTHORS</Link>
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
                        Object.keys(categoryCounts).map(category => {
                            return (
                                <li key={category}>
                                    <Link href={`/scripts?category=${category}`}>
                                        <a>
                                            {ScriptUtils.getPrettyCategory(category)}
                                            <br/>
                                            ({categoryCounts[category]} Script{categoryCounts[category] > 1 ? "s" : ""})
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
                        Object.keys(tagCounts).map(tag => {
                            return (
                                <li key={tag}>
                                    <Link href={`/scripts?tag=${tag}`}>
                                        <a>
                                            {ScriptUtils.getPrettyCategory(tag)}
                                            <br/>
                                            ({tagCounts[tag]} Script{tagCounts[tag] > 1 ? "s" : ""})
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