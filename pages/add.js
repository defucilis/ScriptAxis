import {useEffect} from 'react'
import Head from 'next/head'
import Router from 'next/router'

import firebase from '../utilities/initFirebase'

import Layout from '../components/layout/Layout'
import AddScript from '../components/forms/AddScript'

import useUser from '../../utilities/auth/useUser'
import {FetchLists} from './api/loadlists'
import ScriptUtils from '../utilities/ScriptUtils'

const Add = ({tags, categories, talent, studios, creators}) => {

    //page is blocked if user is not signed in
    const {user} = useUser();
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
            console.error(error.message);
            alert("Failed to send verificationemail\n" + ScriptUtils.tryFormatError(error.message));
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
        data = ScriptUtils.parseDatabaseLists(data);
    } catch(error) {
        console.log("Failed to get scripts", error);        
    } finally {
        return {
            props: {
                ...data
            }
        }   
    }
}

export default Add;