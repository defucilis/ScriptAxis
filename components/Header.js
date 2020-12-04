import Link from 'next/Link'

import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.searchbar}>
                <div className="container">
                    <h1>Logo!</h1>
                    <form>
                        <input type="text" placeholder="Search 2,298 Scripts..." />
                        <input type="submit" value="@" />
                    </form>
                    <a href="/add">+ Add a Script</a>
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