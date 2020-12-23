import {useState, useEffect} from 'react'
import Link from 'next/link'

import axios from 'axios'

import ScriptList from '../scripts/ScriptList'
import useUser from '../../utilities/auth/useUser'

import style from './Dashboard.module.css'
import ScriptUtils from '../../utilities/ScriptUtils'

const Dashboard = () => {

    const {user, refreshUserDbValues, logoutAndRedirect} = useUser();

    const signOut = () => {
        logoutAndRedirect("/");
    }

    const [loading, setLoading] = useState(true);
    const [likedScripts, setLikedScripts] = useState(null);
    const [savedSearches, setSavedSearches] = useState(null);
    const [ownedScripts, setOwnedScripts] = useState(null);
    useEffect(() => {
        const loadAllUserData = async email => {
            setLoading(true);
            const response = await axios.post("/api/users/email", {email, lean: false});
            const userData = response.data;

            if(!userData) return;

            if(userData.likedScripts) setLikedScripts(userData.likedScripts.map(script => ScriptUtils.parseScriptDocument(script)));
            else setLikedScripts([]);

            if(userData.savedSearches) setSavedSearches(userData.savedSearches);
            else setSavedSearches([]);

            if(userData.ownedScripts) setOwnedScripts(userData.ownedScripts.map(script => ScriptUtils.parseScriptDocument(script)));
            else setOwnedScripts([]);

            setLoading(false);
        }

        if(user) loadAllUserData(user.email);
    }, [user])

    const unlike = async script => {
        const savedScripts = [likedScripts];

        console.log("Removing script from favorites", script, user);

        console.log("Scripts before", likedScripts, likedScripts.filter(s => s.slug !== script.slug));
        setLikedScripts(cur => cur.filter(s => s.slug !== script.slug));

        try {
            const response = await axios.post("/api/scripts/changelike", {
                slug: script.slug, 
                uid: user.id,
                creator: script.creator.name,
                isLiked: false
            });
            await refreshUserDbValues();
            if(response.data.error) throw response.data.error;
            console.log(response.data);
        } catch(error) {
            console.error(error);
            setLikedScripts(savedScripts);
        }
    }

    const edit = script => {

    }

    return (
        <div className={style.dashboard}>
            <div className={style.quickfunctions}>
                <h3>Quick Functions</h3>
                <button onClick={signOut}>Sign Out</button>
                {
                    !(user && user.isAdmin) ? null : (
                        <Link href="/admin">
                            <a>Go to Admin Controls</a>
                        </Link>
                    )
                }  
            </div>
            {
                loading ? <p>Loading...</p> : null
            }
            {
                loading ? null : (
                    <div style={{marginBottom: "2em"}}>
                    <h3>Your Favourite Scripts</h3>
                    {
                        likedScripts.length === 0
                            ? <p>You have no favorite scripts yet!</p>
                            : (
                                <ScriptList 
                                    scripts={likedScripts} 
                                    buttons={[
                                        { text: "Un-Favorite", function: unlike }
                                    ]}
                                />
                            )
                    }
                    </div>
                )
            }
            {
                loading ? null : (
                    <div style={{marginBottom: "2em"}}>
                    <h3>Your Saved Searches</h3>
                    {
                        savedSearches.length === 0
                            ? (<p>You have no saved searches yet!</p>)
                            : (
                                <ul>
                                    { savedSearches.map(search => {
                                        return (<ul key={search}>
                                            <Link href={`/scripts?${search}`}><a>{search}</a></Link>
                                        </ul>)
                                    })}
                                </ul>
                            )
                    }
                    </div>
                )
            }
            {
                loading ? null : (
                    <div style={{marginBottom: "2em"}}>
                    <h3>Your Added Scripts</h3>
                    {
                        ownedScripts.length === 0
                            ? <p>You haven't created any scripts yet! <a href="/add">Create your first one now!</a></p>
                            : <ScriptList 
                                scripts={ownedScripts} 
                                buttons={[
                                    { text: "Edit", function: edit }
                                ]}
                            />
                    }
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard;