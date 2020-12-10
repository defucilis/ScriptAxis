import Layout from '../components/Layout'
import AddScript from '../components/AddScript'
import firebase from '../utilities/Firebase'
import Head from 'next/head'
import Router from 'next/router'
import {useContext, useEffect} from 'react'
import UserContext from '../utilities/UserContext'
import {FetchLists} from './api/loadlists'
import ScriptUtils from '../utilities/ScriptUtils'

const Add = ({tags, categories, talent, studios, creators}) => {

    //page is blocked if user is not signed in
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user && user.waiting) return;
        if(user === null) Router.push("/");
    }, [user])

    const signOut = () => {
        firebase.auth().signOut();
        Router.push("/");
    }

    const resend = async () => {
        try {
            await firebase.auth().currentUser.sendEmailVerification();
        } catch(error) {
            console.log(error.message);
            alert("Failed to send verificationemail\n" + error.message);
        }
    }

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Add Script</title>
            </Head>
            <h1>Add a Script</h1>
            {
                user && user.emailVerified
                ? <AddScript tags={tags} categories={categories} talent={talent} studios={studios} creators={creators}/>
                : (
                    <div>
                        <p>Please verify your email address to create scripts</p>
                        <button onClick={resend}>Resend Verification Email</button>
                    </div>
                )
            }
            
        </Layout>
    )
}

export async function getServerSideProps() {
    let data = {};
    try {
        data = await FetchLists();
        console.log(data);
    } catch(error) {
        console.log("Failed to get scripts", error);        
    } finally {
        return {
            props: {
                tags:       !data.tags       ? [] : data.tags.map(t => ScriptUtils.getPrettyCategory(t.name)),
                categories: !data.categories ? [] : data.categories.map(c => ScriptUtils.getPrettyCategory(c.name)),
                talent:     !data.talent     ? [] : data.talent.map(t => t.name),
                studios:    !data.studios    ? [] : data.studios.map(s => s.name),
                creators:   !data.creators   ? [] : data.creators.map(c => c.name),
            }
        }   
    }
}

export default Add;