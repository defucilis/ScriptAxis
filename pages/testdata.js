import {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import axios from 'axios'
import GetTestData from '../utilities/TestData'
import style from './testdata.module.css'

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

const AddData = async(onProgress, onSuccess, onFail) => {
    const scripts = GetTestData();
    let errorCount = 0;

    onProgress(`Adding ${scripts.length} scripts to the database`);

    for(let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        try {
            onProgress(`Inserting ${script.name}`)
            const response = await axios.post("/api/scripts/create", script);
            console.log("data", response.data);
            onProgress(`${script.name} sucessfully inserted`);
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

const TestData = () => {
    
    const [running, setRunning] = useState(false);
    const [messages, setMessages] = useState({list: []});

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

        AddData(progressMessage => {
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

    const ClearOutput = () => {
        setMessages({list: []});
    }

    return (
        <Layout>
            <Head>
                <title>ScriptAxis | Admin Functions</title>
            </Head>
            <h1>Admin Functions</h1>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <button onClick={StartClearData}>Clear Data</button>
                <button onClick={StartAddData}>Add Test Data</button>
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