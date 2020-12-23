import {useContext, useEffect} from 'react'
import Router from 'next/router'
import Head from 'next/head'

import Layout from '../../components/layout/Layout'
import EditScript from '../../components/forms/EditScript'

import ScriptUtils from '../../utilities/ScriptUtils'
import useUser from '../../utilities/auth/useUser'
import {FetchScript} from '../api/scripts/slug'
import {FetchLists} from '../api/loadlists'

const Script = ({script, tags, categories, talent, studios, creators}) => {

    //page is blocked if user is not signed in
    const {user} = useUser({redirectTo: "/"});
    useEffect(() => {
        //page is blocked if the user doesn't own this script!
        if(user && user.username !== script.owner) {
            Router.push("/");
        }
    }, [user])

    return (
        <Layout page="scripts">
            <Head>
                <title>ScriptAxis | Editing "{script.name}"</title>
            </Head>
            <h1>Edit Script</h1>
            <EditScript 
                script={script}
                tags={tags}
                categories={categories}
                talent={talent}
                studios={studios}
                creators={creators}
            />
        </Layout>
    )
}

export async function getServerSideProps({query,res}) {
    let script = null;
    let data = {};
    try {
        //the 'true' means that the view count won't be updated for this fetch
        script = await FetchScript(query.scriptslug, true);
        data = await FetchLists();
        data = ScriptUtils.parseDatabaseLists(data);
        script = ScriptUtils.parseScriptDocument(script);
        console.log(script);
    } catch(error) {
        console.error(error);
    } finally {
        return {
            props: {
                script,
                ...data
            }
        }
    }
}

export default Script;