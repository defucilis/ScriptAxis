import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

import { signOut } from "next-auth/client";

import axios from "axios";

import ScriptList from "../scripts/ScriptList";
import SavedSearch from "./SavedSearch";

import ScriptUtils from "../../lib/ScriptUtils";

import style from "./Dashboard.module.scss";
import { roleIsAdmin, User } from "lib/types";

type LoadingState = "initial" | true | false;

const Dashboard = ({ user }: { user: User }): JSX.Element => {
    const [loading, setLoading] = useState<LoadingState>("initial");
    const [likedScripts, setLikedScripts] = useState(null);
    const [savedSearches, setSavedSearches] = useState(null);
    const [ownedScripts, setOwnedScripts] = useState(null);
    useEffect(() => {
        const loadAllUserData = async email => {
            console.warn("Loading user data", user.email, loading);
            setLoading(true);
            const response = await axios.get(`/api/users/${email}`);
            const userData = response.data;

            console.log(userData);

            if (!userData) return;

            if (userData.likedScripts) setLikedScripts(userData.likedScripts);
            else setLikedScripts([]);

            if (userData.savedFilters)
                setSavedSearches(
                    userData.savedFilters.map(filter => ScriptUtils.queryToPrettyString(filter))
                );
            else setSavedSearches([]);

            if (userData.ownedScripts) setOwnedScripts(userData.ownedScripts);
            else setOwnedScripts([]);

            setLoading(false);
        };

        if (user && likedScripts === null && (!loading || loading === "initial"))
            loadAllUserData(user.email);
    }, [user, likedScripts]);

    const unlike = async script => {
        const savedScripts = [...likedScripts];

        console.log("Removing script from favorites", script, user);

        console.log(
            "Scripts before",
            likedScripts,
            likedScripts.filter(s => s.slug !== script.slug)
        );
        setLikedScripts(cur => cur.filter(s => s.slug !== script.slug));

        try {
            const response = await axios.post("/api/scripts/changelike", {
                slug: script.slug,
                uid: user.id,
                creator: script.creatorName,
                isLiked: false,
            });
            //await refreshUserDbValues();
            if (response.data.error) throw response.data.error;
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setLikedScripts(savedScripts);
        }
    };

    const edit = script => {
        Router.push("/edit/" + script.slug);
    };

    const deleteSavedFilter = async filter => {
        const savedFilters = [...savedSearches];
        console.log("Removing filter from ", savedSearches, filter);

        const newFilters = savedSearches.filter(f => f.queryString !== filter.queryString);
        setSavedSearches(newFilters);

        try {
            const response = await axios.post("/api/users/unsavesearch", {
                uid: user.id,
                filters: newFilters.map(f => f.queryString),
            });
            if (response.data.error) throw response.data.error;
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setSavedSearches(savedFilters);
        }
    };

    return (
        <div className={style.dashboard}>
            <div className={style.quickfunctions}>
                <h3>Quick Functions</h3>
                <button onClick={() => signOut()}>Sign Out</button>
                {!(user && roleIsAdmin(user.role)) ? null : (
                    <Link href="/admin">
                        <a>Go to Admin Controls</a>
                    </Link>
                )}
            </div>
            {loading ? <p>Loading...</p> : null}
            {loading ? null : (
                <div style={{ marginBottom: "2em" }}>
                    <h3>Your Favourite Scripts</h3>
                    {likedScripts.length === 0 ? (
                        <p>You have no favorite scripts yet!</p>
                    ) : (
                        <ScriptList
                            scripts={likedScripts}
                            buttons={[{ text: "Un-Favorite", function: unlike }]}
                        />
                    )}
                </div>
            )}
            {loading ? null : (
                <div style={{ marginBottom: "2em" }}>
                    <h3>Your Saved Searches</h3>
                    {savedSearches.length === 0 ? (
                        <p>You have no saved searches yet!</p>
                    ) : (
                        <ul className={style.savedSearches}>
                            {savedSearches.map((query, index) => {
                                return (
                                    <SavedSearch
                                        key={"user-saved-search-" + index}
                                        query={query}
                                        onDeleteClicked={deleteSavedFilter}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
            {loading ? null : (
                <div style={{ marginBottom: "2em" }}>
                    <h3>Your Added Scripts</h3>
                    {ownedScripts.length === 0 ? (
                        <p>
                            {`You haven't created any scripts yet!`}{" "}
                            <a href="/add">Create your first one now!</a>
                        </p>
                    ) : (
                        <ScriptList
                            scripts={ownedScripts}
                            buttons={[{ text: "Edit", function: edit }]}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
