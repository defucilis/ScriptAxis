import Link from 'next/link'
import Image from 'next/image'
import {FaSearch} from 'react-icons/fa'

import styles from './Header.module.css'

const Header = () => {
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
                        <input type="text" placeholder="Search 2,298 Scripts..." />
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
                        <li className={styles.currentnav}><Link href="/">HOME</Link></li>
                        <li><Link href="/">SCRIPTS</Link></li>
                        <li><Link href="/">CATEGORIES</Link></li>
                        <li><Link href="/">TAGS</Link></li>
                        <li><Link href="/">LINKS</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;