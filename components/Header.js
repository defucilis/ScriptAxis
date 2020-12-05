import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {FaSearch} from 'react-icons/fa'
import firebase from '../utilities/Firebase'

import styles from './Header.module.css'

const Header = ({page}) => {

    const [scriptCount, setScriptCount] = useState(0);
    useEffect(() => {
        const loadScriptCount = async () => {
            const db = firebase.firestore();
            const dbQuery = db.collection("categories");
            const snapshot = await dbQuery.get();
            const scriptCount = snapshot.docs.reduce((acc, doc) => {
                const scripts = doc.data().scripts;
                if(!scripts || !scripts.length) return acc;
                return acc + scripts.length;
            }, 0);
            window.localStorage.setItem("scriptCount", scriptCount);
            setScriptCount(scriptCount);
        }
        const storedScriptCount = window.localStorage.getItem("scriptCount");
        if(storedScriptCount) setScriptCount(storedScriptCount);
        loadScriptCount();
    }, [])

    return (
        <div className={styles.header}>
            <div className={styles.searchbar}>
                <div className="container">
                    <Link href="/">
                        <a className={styles.logo}>
                            <Image src="/img/script-axis-512.png" alt="Script Axis logo" width="180" height="45" />
                        </a>
                    </Link>
                    <form>
                        <input type="text" placeholder={`Search ${scriptCount > 0 ? scriptCount + " " : ""}Scripts...`} />
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
                        <li className={!page || page === "home" ? styles.currentnav : null}><Link href="/">HOME</Link></li>
                        <li className={page === "scripts" ? styles.currentnav : null}><Link href="/scripts">SCRIPTS</Link></li>
                        <li className={page === "categories" ? styles.currentnav : null} onClick={() => alert("Coming soon!")}><Link href="/">CATEGORIES</Link></li>
                        <li className={page === "tags" ? styles.currentnav : null} onClick={() => alert("Coming soon!")}><Link href="/">TAGS</Link></li>
                        <li className={page === "authors" ? styles.currentnav : null}><Link href="/">AUTHORS</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;