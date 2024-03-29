import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import axios from "axios";
import dayjs from "dayjs";

import { PrepareTestData, TestDataScript } from "../../lib/TestData";
import ScriptUtils from "../../lib/ScriptUtils";
import { Dropzone } from "../forms/FormUtils";

import style from "./AdminPanel.module.scss";
import { Script } from "lib/types";

const ClearData = async (onSuccess: (data: any) => void, onFail: (error: string) => void) => {
    try {
        const response = await axios("/api/admin/clear");
        if (response.data.error) throw response.data.error;
        console.log("data", response.data);
        onSuccess(response.data);
    } catch (error) {
        console.error("error", error);
        onFail("Error: " + ScriptUtils.tryFormatError(error.message));
    }
};

const AddData = async (
    scripts: TestDataScript[],
    onMessage: (message: string) => void,
    onProgress: (doneCount: number, totalCount: number) => void,
    onSuccess: (data: any) => void,
    onFail: (errorCount: number, totalCount: number) => void
) => {
    let errorCount = 0;

    onMessage(`Adding ${scripts.length} scripts to the database`);

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        try {
            onMessage(`Inserting ${script.name}`);

            const response = await axios.post("/api/scripts/create", script);
            if (response.data.error) throw response.data.error;
            console.log("data", response.data);

            onProgress(i + 1, scripts.length);
            onMessage(`${script.name} sucessfully inserted (${i + 1}/${scripts.length})`);
            onMessage("");
        } catch (error) {
            console.error("error", error);
            onProgress(i + 1, scripts.length);
            onMessage("Error: " + ScriptUtils.tryFormatError(error.message));
            onMessage("");
            errorCount++;
        }
    }

    if (errorCount === 0) onSuccess(scripts.length);
    else onFail(errorCount, scripts.length);
};

const Aggregate = async (
    onMessage: (message: string) => void,
    onSuccess: (totalCount: number) => void,
    onProgress: (doneCount: number, totalCount: number) => void,
    onFail: (errorCount: number, totalCount: number) => void
) => {
    onMessage(`Running data aggregation`);
    onMessage(`--Fetching creators`);
    try {
        const response = await axios.get("/api/creator/names");
        if (response.data.error) throw response.data.error;
        const names: string[] = [...response.data];
        onMessage(`----Done - found ${names.length} creators`);

        let errorCount = 0;
        for (let i = 0; i < names.length; i++) {
            try {
                onMessage(`--Updating creator ${names[i]}`);

                const response = await axios.get(`/api/admin/aggregate/${names[i]}`);
                if (response.data.error) throw response.data.error;
                console.log("data", response.data);

                onProgress(i + 1, names.length);
                onMessage(
                    `----${names[i]} sucessfully updated with ${
                        response.data.totalViews
                    } views and ${response.data.totalLikes} likes (${i + 1}/${names.length})`
                );
            } catch (error) {
                console.error("error", error);
                onProgress(i + 1, names.length);
                onMessage("Error: " + ScriptUtils.tryFormatError(error.message));
                onMessage("");
                errorCount++;
            }
        }
        if (errorCount === 0) onSuccess(names.length);
        else onFail(errorCount, names.length);
    } catch (error) {
        console.error("error", error);
        onMessage("Error: " + ScriptUtils.tryFormatError(error.message));
        onMessage("");
        onFail(0, 0);
    }
};

const GetJsonBackup = async (
    onMessage: (message: string) => void,
    onSuccess: (url: string) => void,
    onError: (error: string) => void
) => {
    onMessage("Fetching all scripts as JSON");
    try {
        const response = await axios({
            url: "/api/scripts/asJson",
            method: "GET",
            responseType: "blob",
        });
        if (response.data.error) throw response.data.error;
        const url = window.URL.createObjectURL(new Blob([response.data]));
        onSuccess(url);
    } catch (error) {
        console.error("error", error);
        onError(error);
    }
};

const RunScrape = async (
    scripts: Script[],
    onMessage: (message: string) => void,
    onProgress: (doneCount: number, totalCount: number) => void,
    onComplete: () => void,
    onError: (error: string) => void
) => {
    onMessage("Scraping all views and likes from EroScripts");
    onMessage("--Fetching all scripts from database");
    const response = await axios.post("/api/scripts");
    if (response.data.error) {
        onError(response.data.error);
        onComplete();
        return;
    }
    scripts = response.data.filter((script: Script) => {
        //don't scrape scripts that aren't from eroscripts
        if (!script.sourceUrl.includes("eroscripts")) return false;

        //don't scrape scripts that are less than a week old
        const creationToNow = dayjs().diff(dayjs(script.createdAt), "day");
        if (creationToNow < 7) return false;

        //don't scrape scripts that have been scraped recently (the time window increases with age)
        const creationToScrape = dayjs(script.lastScrape).diff(dayjs(script.createdAt), "day");
        const scrapeToNow = dayjs().diff(dayjs(script.lastScrape), "day");
        return scrapeToNow > creationToScrape;
    });
    onMessage(`----Complete - found ${scripts.length} scripts`);
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        try {
            onMessage("--Scraping data for " + script.slug);
            console.log(process.env);
            const response = await axios.post("/api/admin/scrape", {
                slug: script.slug,
                url: script.sourceUrl,
            });
            console.log(response.data);
            if (response.data.error) throw response.data.error.message;
            onMessage(
                `----Success - set likes to ${response.data.likeCount}, views to ${response.data.views} and date to ${response.data.createdAt}`
            );
        } catch (error) {
            onError(error.message || error);
        } finally {
            onProgress(i + 1, scripts.length);
        }
    }
    onComplete();
};

const GetScriptAxisViews = async (
    onMessage: (message: string) => void,
    onComplete: (
        scripts: { id: number; name: string; categoryName: string; scriptAxisViews: number }[]
    ) => void,
    onError: (error: string) => void
) => {
    onMessage("Getting all scripts by views...");
    try {
        const scripts = await axios("/api/admin/scriptViewCounts");
        if (scripts.data.error) throw scripts.data.error;
        onComplete(scripts.data.filter(script => script.scriptAxisViews > 0));
    } catch (error) {
        onError(error);
    }
};

const RunUpdateSearchString = async (
    scripts: Script[],
    onMessage: (message: string) => void,
    onProgress: (doneCount: number, totalCount: number) => void,
    onComplete: () => void,
    onError: (error: string) => void
) => {
    onMessage("Updating all script search strings");
    onMessage("--Fetching all scripts from database");
    const response = await axios.post("/api/scripts");
    if (response.data.error) {
        onError(response.data.error);
        onComplete();
        return;
    }
    onMessage(`----Complete - found ${scripts.length} scripts`);
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        try {
            onMessage("--Updating search string for for " + script.slug);
            console.log(process.env);
            const response = await axios("/api/admin/updateSearchString?slug=" + script.slug);
            console.log(response.data);
            if (response.data.error) throw response.data.error.message;
            onMessage(`----Success - search string is "${response.data.searchString}"`);
        } catch (error) {
            onError(error.message || error);
        } finally {
            onProgress(i + 1, scripts.length);
        }
    }
    onComplete();
};

const AdminPanel = ({ existingScripts }: { existingScripts: Script[] }): JSX.Element => {
    const [running, setRunning] = useState(false);
    const [messages, setMessages] = useState({ list: [] });
    const [scripts, setScripts] = useState<Script[]>([]);

    const progressBarRef = useRef<HTMLDivElement>();
    const progressBarParentRef = useRef<HTMLDivElement>();

    const [jsonBackup, setJsonBackup] = useState(null);

    const [preparedDownload, setPreparedDownload] = useState("");

    useEffect(() => {
        setScripts(existingScripts);
    }, [existingScripts]);

    const addMessage = (message: string) => {
        setMessages(cur => ({ list: [...cur.list, message] }));
    };

    const StartClearData = () => {
        if (!confirm("Warning, this will irrecoverably wipe ALL data (except user data)!")) return;

        setRunning(true);
        ClearOutput();
        addMessage("Wiping Database...");

        ClearData(
            () => {
                addMessage("Data cleared successfully");
                addMessage("");
                setRunning(false);
                setScripts([]);
            },
            error => {
                addMessage("Failed to clear data");
                addMessage(error);
                addMessage("");
                setRunning(false);
            }
        );
    };

    const StartAggregation = () => {
        setRunning(true);
        ClearOutput();

        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        Aggregate(
            addMessage,
            addedCount => {
                addMessage(`Successfully aggregated ${addedCount} creators`);
                addMessage("");
                progressBarParentRef.current.style.setProperty("display", "none");
                setRunning(false);
            },
            (count, total) => {
                progressBarRef.current.style.setProperty(
                    "width",
                    `${Math.round((count * 100) / total)}%`
                );
            },
            (failCount, total) => {
                addMessage("Finished aggregating creators");
                addMessage(`Error: failed ${failCount} out of ${total}`);
                addMessage("");
                progressBarParentRef.current.style.setProperty("display", "none");
                setRunning(false);
            }
        );
    };

    const ClearOutput = () => {
        setMessages({ list: [] });
    };

    const StartJsonRestore = async () => {
        if (!jsonBackup) {
            alert("Add a JSON backup file first");
            return;
        }
        console.log(jsonBackup);
        const extension = jsonBackup.name.split(".").slice(-1)[0];
        if (extension !== "json") {
            alert("JSON files only!");
            return;
        }

        setRunning(true);
        ClearOutput();

        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        const jsonString = await ScriptUtils.readFile(jsonBackup);
        const scriptsToAdd = PrepareTestData(JSON.parse(jsonString)).filter(script => {
            return scripts.findIndex(s => s.name === script.name) === -1;
        });

        AddData(
            scriptsToAdd,
            addMessage,
            (count, total) => {
                progressBarRef.current.style.setProperty(
                    "width",
                    `${Math.round((count * 100) / total)}%`
                );
            },
            addedCount => {
                addMessage(`Successfully added ${addedCount} scripts to database`);
                addMessage("");
                progressBarParentRef.current.style.setProperty("display", "none");
                setRunning(false);
            },
            (failCount, scriptCount) => {
                addMessage("Finished adding scripts");
                addMessage(`Error: failed ${failCount} out of ${scriptCount}`);
                addMessage("");
                progressBarParentRef.current.style.setProperty("display", "none");
                setRunning(false);
            }
        );
    };

    const StartGetJsonBackup = () => {
        setPreparedDownload("");
        addMessage("Getting JSON backup...");
        ClearOutput();
        GetJsonBackup(
            addMessage,
            url => {
                setPreparedDownload(url);
                addMessage(`Successfully fetched script data. Click Download to get JSON file`);
                addMessage("");
            },
            error => {
                addMessage("Error: " + error);
            }
        );
    };

    const StartScrape = () => {
        setRunning(true);
        ClearOutput();
        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        RunScrape(
            existingScripts,
            addMessage,
            (count, total) => {
                progressBarRef.current.style.setProperty(
                    "width",
                    `${Math.round((count * 100) / total)}%`
                );
            },
            () => {
                addMessage("Scrape completed successfully");
                addMessage("");
                setRunning(false);
                progressBarParentRef.current.style.setProperty("display", "none");
                window.localStorage.removeItem("recentScriptsTime");
                window.localStorage.removeItem("topScriptsTime");
            },
            error => {
                addMessage("Error: " + error);
            }
        );
    };

    const StartGetScriptAxisViews = () => {
        setRunning(true);
        ClearOutput();
        GetScriptAxisViews(
            addMessage,
            (
                scripts: {
                    id: number;
                    name: string;
                    categoryName: string;
                    scriptAxisViews: number;
                }[]
            ) => {
                const totalCount = scripts.reduce((acc, script) => acc + script.scriptAxisViews, 0);
                addMessage(`Found ${totalCount} views total`);
                const categoryCounts: { [key: string]: number } = {};
                scripts.forEach(script => {
                    if (!categoryCounts[script.categoryName])
                        categoryCounts[script.categoryName] = script.scriptAxisViews;
                    else categoryCounts[script.categoryName] += script.scriptAxisViews;
                });
                const sortedCategoryCounts = Object.keys(categoryCounts)
                    .map(category => ({
                        name: category,
                        count: categoryCounts[category],
                    }))
                    .sort((a, b) => b.count - a.count);
                addMessage(`-- Counts by Category:`);
                sortedCategoryCounts.forEach(category => {
                    addMessage(`---- ${category.count} - ${category.name}`);
                });
                addMessage("");
                addMessage(`-- Counts by Script:`);
                scripts.forEach(script =>
                    addMessage(`---- ${script.scriptAxisViews} - ${script.name}`)
                );
                axios.put(
                    `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/viewRecords/${dayjs().format(
                        "YYYY-MM-DD"
                    )}.json`,
                    {
                        timestamp: new Date().valueOf(),
                        totalCount,
                        categoryCounts,
                    }
                );
                axios(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/viewRecords.json`).then(
                    data => {
                        data = data.data;
                        console.log(data);
                        const lines: string[] = [];
                        let line = "";
                        Object.keys(data).forEach(key => {
                            if (!line) {
                                lines.push(
                                    "date,timestamp,total," +
                                        Object.keys(data[key].categoryCounts).join(",")
                                );
                            }
                            line = [key, data[key].timestamp, data[key].totalCount].join(",") + ",";
                            line += Object.keys(data[key].categoryCounts)
                                .map(category => {
                                    return data[key].categoryCounts[category];
                                })
                                .join(",");
                            lines.push(line);
                        });
                        console.log(lines.join("\n"));
                    }
                );

                setRunning(false);
            },
            error => {
                addMessage("Error: " + error);
                setRunning(false);
            }
        );
    };

    const UpdateSearchStrings = () => {
        setRunning(true);
        ClearOutput();
        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        RunUpdateSearchString(
            existingScripts,
            addMessage,
            (count, total) => {
                progressBarRef.current.style.setProperty(
                    "width",
                    `${Math.round((count * 100) / total)}%`
                );
            },
            () => {
                addMessage("Search string update completed successfully");
                addMessage("");
                setRunning(false);
                progressBarParentRef.current.style.setProperty("display", "none");
            },
            error => {
                addMessage("Error: " + error);
            }
        );
    };

    //if(user === null || user.waiting) return <div></div>

    return (
        <>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <button onClick={StartClearData}>Wipe Database</button>
                <button onClick={StartAggregation}>Run Aggregation</button>
                <button
                    onClick={() => {
                        localStorage.clear();
                        ClearOutput();
                        addMessage("Local storage cleared");
                    }}
                >
                    Clear local storage
                </button>
                <button onClick={UpdateSearchStrings}>Update Search Strings</button>
                <button onClick={StartGetScriptAxisViews}>Get ScriptAxis View Counts</button>
            </div>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <div className={style.scrape}>
                    <button onClick={StartScrape}>Scrape</button>
                </div>
                <button onClick={StartGetJsonBackup}>Prepare Backup</button>
                <Link href={preparedDownload}>
                    <a
                        style={preparedDownload !== "" ? null : { display: "none" }}
                        download={"ScriptAxisBackup.json"}
                    >
                        Download Backup
                    </a>
                </Link>
                <Dropzone
                    id="backup"
                    name="backup"
                    label=""
                    className={style.dropzone}
                    hoveringClassName={style.dropzoneon}
                    instruction="Drag + Drop JSON backup to restore"
                    options={{
                        accept: [".json"],
                        //maxSize: 2000000, //2MB
                        multiple: false,
                        noKeyboard: true,
                        preventDropOnDocument: true,
                        pasteable: true,
                    }}
                    onChange={e => setJsonBackup(e.target.value[0])}
                    onError={(error: string) => addMessage("Error: " + error)}
                    error={""}
                    value={jsonBackup}
                />
                <button onClick={StartJsonRestore}>Restore from Backup</button>
            </div>
            <div className={style.progressbg} ref={progressBarParentRef}>
                <div className={style.progressbar} ref={progressBarRef}></div>
            </div>
            <div className={style.output}>
                <ul>
                    {messages.list.map((message, index) => {
                        return message === "" ? (
                            <br key={index} />
                        ) : (
                            <li
                                key={index}
                                style={message.includes("Error") ? { color: "salmon" } : null}
                            >
                                {message}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default AdminPanel;
