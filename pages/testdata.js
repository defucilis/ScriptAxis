import {useState, useEffect, useContext} from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import axios from 'axios'
import GetTestData from '../utilities/TestData'
import style from './testdata.module.css'
import UserContext from '../utilities/UserContext'
import Router from 'next/router'

const ClearData = async (onSuccess, onFail) => {
    try {
        const response = await axios("/api/admin/clear");
        console.log("data", response.data);
        onSuccess(response.data);
    } catch(error) {
        console.log("error", error.message);
        onFail(error.message);
    }
}

const AddData = async(count, onProgress, onSuccess, onFail) => {
    const scripts = GetTestData().slice(0, count);
    let errorCount = 0;

    onProgress(`Adding ${scripts.length} scripts to the database`);

    for(let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        try {
            onProgress(`Inserting ${script.name}`)
            const response = await axios.post("/api/scripts/create", script);
            console.log("data", response.data);
            onProgress(`${script.name} sucessfully inserted (${i + 1}/${scripts.length})`);
            onProgress("");
        } catch(error) {
            console.log("error", error.message, error.data);
            onProgress({...error.data, errorMessage: error.message});
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
        console.log("data", response.data);
        onProgress(`Finished aggregating creator data: ${JSON.stringify(response.data, null, 2)}`);
        onSuccess();
    } catch(error) {
        console.log("error", error.message, error.data);
        onProgress({...error.data, errorMessage: error.message});
        onFail();
    }
}

const TestData = () => {
    
    const [running, setRunning] = useState(false);
    const [messages, setMessages] = useState({list: []});
    const [count, setCount] = useState(41);

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
        }, error => {
            addMessage("Failed to clear data");
            addMessage(error);
            addMessage("");
            setRunning(false);
        })
    }

    const StartAddData = () => {
        setRunning(true);

        AddData(count, progressMessage => {
            addMessage(progressMessage);
        }, addedCount => {
            addMessage(`Successfully added ${addedCount} scripts to database`);
            addMessage("");
            setRunning(false);
        }, (failCount, scriptCount) => {
            addMessage(`Finished adding scripts - failed ${failCount} out of ${scriptCount}`);
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
            addMessage("Failed aggregating data");
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
                        return <li key={index}>{JSON.stringify(message, null, 2)}</li>
                    })
                }
                </ul>
            </div>
            <div className={`loader top ${running ? "loadingtop" : "notloadingtop"}`}></div>
            <div className={`loader bottom ${running ? "loadingbottom" : "notloadingbottom"}`}></div>
        </Layout>
    )
}

export default TestData;