import {useState, useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'

import axios from 'axios'

import ScriptList from '../scripts/ScriptList'
import useUser from '../../utilities/auth/useUser'

import style from './Dashboard.module.css'

const Dashboard = ({user}) => {

    const {logout} = useUser();

    const signOut = () => {
        logout("/");
    }

    const [likedScripts, setLikedScripts] = useState([]);
    useEffect(() => {
        if(!user || !user.likedScripts || user.likedScripts.length === 0) {
            setLikedScripts([]);
            return;
        }
        setLikedScripts(user.likedScripts);
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
                        <Link href="/testdata">
                            <a>Go to Admin Controls</a>
                        </Link>
                    )
                }  
            </div>
        </div>
    )

    return (
        <div className={style.dashboard}>
            <div className={style.quickfunctions}>
                <h3>Quick Functions</h3>
                <button onClick={signOut}>Sign Out</button>
                {
                    !(user && user.isAdmin) ? null : (
                        <Link href="/testdata">
                            <a>Go to Admin Controls</a>
                        </Link>
                    )
                }  
            </div>
            <div style={{marginBottom: "2em"}}>
                <h3>Your Favourite Scripts</h3>
                {
                    (likedScripts.length === 0)
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

            <div style={{marginBottom: "2em"}}>
                <h3>Your Saved Searches</h3>
                {
                    (!user || !user.savedSearches || user.savedSearches.length === 0)
                        ? (<p>You have no saved searches yet!</p>)
                        : (
                            <ul>
                                { user.savedSearches.map(search => {
                                    return (<ul key={search}>
                                        <Link href={`/scripts?${search}`}><a>{search}</a></Link>
                                    </ul>)
                                })}
                            </ul>
                        )
                }
            </div>

            <div>
                <h3>Your Added Scripts</h3>
                {
                    (!user || !user.ownedScripts || user.ownedScripts.length === 0)
                        ? <p>You haven't created any scripts yet! <a href="/add">Create your first one now!</a></p>
                        : <ScriptList 
                            scripts={user.ownedScripts} 
                            buttons={[
                                { text: "Edit", function: edit }
                            ]}
                        />
                }
            </div>
        </div>
    )
}

export default Dashboard;