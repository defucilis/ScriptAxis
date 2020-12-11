import {useState, useEffect, useContext} from 'react'
import Router from 'next/router'
import Head from 'next/head'

import axios from 'axios'

import Layout from '../components/Layout'

import {FetchSlugs} from './api/scripts/allslugs'
import GetTestData from '../utilities/TestData'
import UserContext from '../utilities/UserContext'
import ScriptUtils from '../utilities/ScriptUtils'

import style from './testdata.module.css'


const ClearData = async (onSuccess, onFail) => {
    try {
        const response = await axios("/api/admin/clear");
        if(response.data.error) throw response.data.error;
        console.log("data", response.data);
        onSuccess(response.data);
    } catch(error) {
        console.error("error", error);
        onFail(ScriptUtils.tryFormatError(error.message));
    }
}

const AddData = async(count, existingScripts, onProgress, onSuccess, onFail) => {
    const scripts = GetTestData().slice(0, count);
    let errorCount = 0;

    onProgress(`Adding ${scripts.length} scripts to the database`);

    for(let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        try {
            onProgress(`Inserting ${script.name}`)

            if(existingScripts.findIndex(s => s.name === script.name) !== -1) throw ({ message: "Script already exists!"});

            const response = await axios.post("/api/scripts/create", script);
            if(response.data.error) throw response.data.error;
            console.log("data", response.data);

            onProgress(`${script.name} sucessfully inserted (${i + 1}/${scripts.length})`);
            onProgress("");
        } catch(error) {
            console.error("error", error);
            onProgress("Error: " + ScriptUtils.tryFormatError(error.message));
            onProgress("");
            errorCount++;
        }
    }

    if(errorCount === 0) onSuccess(scripts.length);
    else onFail(errorCount, scripts.length);
}

const Aggregate = async(onProgress, onSuccess, onFail) => {
    onProgress(`Running data aggregation`);

    try {
        const response = await axios.get("/api/admin/aggregate");
        if(response.data.error) throw response.data.error;
        console.log("data", response.data);
        onProgress(`Finished aggregating creator data: ${JSON.stringify(response.data, null, 2)}`);
        onProgress("");
        onSuccess();
    } catch(error) {
        console.error("error", error);
        onProgress("Error: " + ScriptUtils.tryFormatError(error.message));
        onProgress("");
        onFail();
    }
}

const TestData = ({existingScripts}) => {
    
    const [running, setRunning] = useState(false);
    const [messages, setMessages] = useState({list: []});
    const [count, setCount] = useState(41);
    const [scripts, setScripts] = useState([]);

    useEffect(() => {
        setScripts(existingScripts);
    }, [existingScripts])

    useEffect(() => {
        setCount(GetTestData().length);
    }, [])

    //page is blocked if user is not signed in
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user !== null && user.waiting) return;
        if(user === null) Router.push("/");
        else if(!user.isAdmin) Router.push("/");
    }, [user])

    const addMessage = message => {
        setMessages(cur => ({list: [...cur.list, message]}));
    }

    const StartClearData = () => {
        setRunning(true);
        addMessage("Wiping Database...");

        ClearData(data => {
            addMessage("Data cleared successfully");
            addMessage("");
            setRunning(false);
            setScripts([]);
        }, error => {
            addMessage("Failed to clear data");
            addMessage(error);
            addMessage("");
            setRunning(false);
        })
    }

    const StartAddData = () => {
        setRunning(true);

        AddData(count, scripts, progressMessage => {
            addMessage(progressMessage);
        }, addedCount => {
            addMessage(`Successfully added ${addedCount} scripts to database`);
            addMessage("");
            setRunning(false);
        }, (failCount, scriptCount) => {
            addMessage("Finished adding scripts");
            addMessage(`Error: failed ${failCount} out of ${scriptCount}`);
            addMessage("");
            setRunning(false);
        })
    }

    const StartAggregation = () => {
        setRunning(true);

        Aggregate(addMessage, () => {
            addMessage("Finished aggregating data");
            addMessage("");
            setRunning(false);
        }, () => {
            addMessage("Error: Failed aggregating data");
            addMessage("");
            setRunning(false);
        });
    }

    const ClearOutput = () => {
        setMessages({list: []});
    }

    if(user === null || user.waiting) return <div></div>

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Admin Functions</title>
            </Head>
            <h1>Admin Functions</h1>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <button onClick={StartClearData}>Clear Data</button>
                <button onClick={StartAddData}>Add Test Data</button>
                <input type="number" id="count" onChange={e => setCount(parseInt(e.target.value))} value={count}></input>
                <button onClick={StartAggregation}>Run Aggregation</button>
                <button onClick={ClearOutput}>Clear Output</button>
            </div>
            <div className={style.output}>
                <ul>
                {
                    messages.list.map((message, index) => {
                        return message === "" 
                            ? <br key={index} /> 
                            : <li key={index} style={message.includes("Error") ? {color: "salmon"} : null}>{message}</li>
                    })
                }
                </ul>
            </div>
            <div className={`loader top ${running ? "loadingtop" : "notloadingtop"}`}></div>
            <div className={`loader bottom ${running ? "loadingbottom" : "notloadingbottom"}`}></div>
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    let scripts = [];
    try {
        scripts = await FetchSlugs();
    } catch(error) {
        console.log("Failed to load scripts", error);
    } finally {
        return {
            props: {
                existingScripts: scripts
            }
        }
    }
}

export default TestData;