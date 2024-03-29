import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import { signIn } from "next-auth/client";

import { FaSearch } from "react-icons/fa";
import { FaSync } from "react-icons/fa";
import axios from "axios";

import styles from "./Header.module.scss";
import typedUseSession from "lib/typedUseSession";
import { roleIsAdmin, roleIsCreator } from "lib/types";

export type HeaderPage = "home" | "scripts" | "categories" | "tags" | "creators";

const Header = ({ page }: { page?: HeaderPage }): JSX.Element => {
    const [user, loading] = typedUseSession();

    const [scriptCount, setScriptCount] = useState(0);
    const [categoryCounts, setCategoryCounts] = useState([]);
    const [tagCounts, setTagCounts] = useState([]);
    const categoriesRef = useRef<HTMLDivElement>();
    const tagsRef = useRef<HTMLDivElement>();
    useEffect(() => {
        const loadScriptCount = async () => {
            try {
                const response = await axios.get("/api/loadlists");
                if (response.data.error) throw response.data.error;
                const { tags, categories, talent, studios } = response.data;
                const scriptCount = categories.reduce((acc, category) => acc + category.count, 0);
                setCategoryCounts(categories);
                setTagCounts(tags);
                setScriptCount(scriptCount);
                window.localStorage.setItem("scriptCount", scriptCount.toString());
                window.localStorage.setItem("storedTagCounts", JSON.stringify(tags));
                window.localStorage.setItem("storedCategoryCounts", JSON.stringify(categories));
                window.localStorage.setItem("storedTalent", JSON.stringify(talent));
                window.localStorage.setItem("storedStudios", JSON.stringify(studios));
                window.localStorage.setItem("lastListFetchTime", new Date().valueOf().toString());
            } catch (error) {
                console.error(error);
            }
        };
        const storedScriptCount = Number(window.localStorage.getItem("scriptCount"));
        const storedTagCounts = window.localStorage.getItem("storedTagCounts");
        const storedCategoryCounts = window.localStorage.getItem("storedCategoryCounts");
        let lastListFetchTime = Number(window.localStorage.getItem("lastListFetchTime"));
        if (process.env.NEXT_PUBLIC_SFW_MODE === "true") {
            lastListFetchTime = 0;
        }
        if (storedScriptCount) setScriptCount(storedScriptCount);
        if (storedTagCounts) setTagCounts(JSON.parse(storedTagCounts));
        if (storedCategoryCounts) setCategoryCounts(JSON.parse(storedCategoryCounts));

        if (
            !lastListFetchTime ||
            new Date(lastListFetchTime) < new Date(new Date().valueOf() - 1000 * 60 * 60)
        ) {
            loadScriptCount();
        }
    }, []);

    const doSearch = e => {
        e.preventDefault();
        if (!e.target.search.value) return;

        Router.push(`/scripts?search=${e.target.search.value}`);
    };

    const handleMouse = (item: "categories" | "tags", enter: boolean) => {
        if (item === "categories") {
            tagsRef.current.style.setProperty("display", "none");
            categoriesRef.current.style.setProperty("display", enter ? "block" : "none");
        } else if (item === "tags") {
            tagsRef.current.style.setProperty("display", enter ? "block" : "none");
            categoriesRef.current.style.setProperty("display", "none");
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.searchbar}>
                <div className="container">
                    <Link href="/">
                        <a className={styles.logo}>
                            <Image
                                src="/img/script-axis-512.png"
                                alt="Script Axis logo"
                                width="180"
                                height="45"
                            />
                        </a>
                    </Link>
                    <form onSubmit={doSearch}>
                        <input
                            id="search"
                            type="text"
                            placeholder={`Search ${
                                scriptCount > 0 ? scriptCount + " " : ""
                            }Scripts...`}
                        />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>
                    {loading ? (
                        <div className={styles.loadinguser}>
                            <FaSync />
                            <p>Loading...</p>
                        </div>
                    ) : !user ? (
                        <div className={styles.userbuttons}>
                            <button type="button" onClick={() => signIn()}>
                                Sign In / Sign Up
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link href="/dashboard">
                                <a className={styles.addscript}>Dashboard</a>
                            </Link>
                            {roleIsCreator(user.role) ? (
                                <>
                                    <Link href="/add">
                                        <a className={styles.addscript}>+ Add a Script</a>
                                    </Link>
                                    {roleIsAdmin(user.role) ? (
                                        <Link href="/admin">
                                            <a className={styles.addscript}>Admin</a>
                                        </Link>
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.navbar}>
                <div className="container">
                    <ul>
                        <li className={!page || page === "home" ? styles.currentnav : null}>
                            <Link href="/">
                                <a>HOME</a>
                            </Link>
                        </li>
                        <li className={page === "scripts" ? styles.currentnav : null}>
                            <Link href="/scripts">
                                <a>SCRIPTS</a>
                            </Link>
                        </li>
                        <li
                            className={page === "categories" ? styles.currentnav : null}
                            onMouseEnter={() => handleMouse("categories", true)}
                            onMouseLeave={() => handleMouse("categories", false)}
                        >
                            <a>CATEGORIES</a>
                        </li>
                        <li
                            className={page === "tags" ? styles.currentnav : null}
                            onMouseEnter={() => handleMouse("tags", true)}
                            onMouseLeave={() => handleMouse("tags", false)}
                        >
                            <a>TAGS</a>
                        </li>
                        <li className={page === "creators" ? styles.currentnav : null}>
                            <Link href="/creators">CREATORS</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className={styles.categories}
                ref={categoriesRef}
                onMouseEnter={() => handleMouse("categories", true)}
                onMouseLeave={() => handleMouse("categories", false)}
            >
                <div className="container">
                    <ul>
                        {categoryCounts
                            .filter(category => category.count > 0)
                            .map(category => {
                                return (
                                    <li key={category.name}>
                                        <Link href={`/scripts?category=${category.name}`}>
                                            <a>
                                                {category.name}
                                                <br />({category.count} Script
                                                {category.count > 1 ? "s" : ""})
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <div
                className={styles.tags}
                ref={tagsRef}
                onMouseEnter={() => handleMouse("tags", true)}
                onMouseLeave={() => handleMouse("tags", false)}
            >
                <div className="container">
                    <ul>
                        {tagCounts
                            .filter(tag => tag.count > 0)
                            .map(tag => {
                                return (
                                    <li key={tag.name}>
                                        <Link href={`/scripts?include=${tag.name}`}>
                                            <a>
                                                {tag.name}
                                                {` `}({tag.count} Script{tag.count > 1 ? "s" : ""})
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
