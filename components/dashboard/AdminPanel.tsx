import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import axios from "axios";
import slugify from "slugify";
import * as imageConversion from "image-conversion";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";

import GetTestData, { PrepareTestData, TestDataScript } from "../../lib/TestData";
import ScriptUtils from "../../lib/ScriptUtils";
import FirebaseUtils from "../../lib/FirebaseUtils";
import { Dropzone } from "../forms/FormUtils";
import Checkbox from "../forms/Checkbox";

import style from "./AdminPanel.module.scss";
import { ScriptStub } from "lib/types";

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

const UploadFile = async (
    file: File,
    name: string,
    onMessage: (message: string) => void,
    onSuccess: (url: string) => void,
    onFail: (error: string) => void
) => {
    onMessage(`Uploading ${file.name} (${file.size} bytes)`);
    try {
        const compressedFile = await imageConversion.compressAccurately(file, {
            size: 100,
            type: imageConversion.EImageType.JPEG,
        });
        const url = await FirebaseUtils.uploadFile(compressedFile, "adminthumbnails/" + name, null);
        onSuccess(url);
    } catch (error) {
        console.error("error", error);

        onMessage("");
        onFail(error);
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
    scripts: ScriptStub[],
    subset: boolean,
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
    scripts = !subset
        ? response.data.filter(script => script.sourceUrl.includes("eroscripts"))
        : response.data.filter(script => {
              if (!script.sourceUrl.includes("eroscripts")) return false;
              return (
                  script.views < 100 ||
                  script.likeCount < 5 ||
                  dayjs().diff(dayjs(script.created), "day") < 7
              );
          });
    onMessage(
        `----Complete - found ${scripts.length} scripts${subset ? " (after filtering)" : ""}`
    );
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
                `----Success - set likes to ${response.data.likeCount}, views to ${response.data.views} and date to ${response.data.created}`
            );
        } catch (error) {
            onError(error.message || error);
        } finally {
            onProgress(i + 1, scripts.length);
        }
    }
    onComplete();
};

const AdminPanel = ({ existingScripts }: { existingScripts: ScriptStub[] }): JSX.Element => {
    const [running, setRunning] = useState(false);
    const [messages, setMessages] = useState({ list: [] });
    const [count, setCount] = useState(41);
    const [scripts, setScripts] = useState<ScriptStub[]>([]);

    useEffect(() => {
        setScripts(existingScripts);
    }, [existingScripts]);

    useEffect(() => {
        setCount(GetTestData().length);
    }, []);

    //page is blocked if user is not signed in
    /*
    const {user} = useContext(UserContext);
    /*
    useEffect(() => {
        if(user !== null && user.waiting) return;
        if(user === null) Router.push("/");
        else if(!user.isAdmin) Router.push("/");
    }, [user])
    */

    const addMessage = (message: string) => {
        setMessages(cur => ({ list: [...cur.list, message] }));
    };

    const StartClearData = () => {
        if (!confirm("Warning, this will irrecoverably wipe ALL data (except user data)!")) return;

        setRunning(true);
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

    const progressBarRef = useRef<HTMLDivElement>();
    const progressBarParentRef = useRef<HTMLDivElement>();
    const StartAddData = () => {
        setRunning(true);

        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        const scriptsToAdd = GetTestData()
            .slice(0, count)
            .filter(script => {
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

    const StartAggregation = () => {
        setRunning(true);

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

    const [thumbnailImage, setThumbnailImage] = useState(null);
    const StartUploadFile = () => {
        console.log("Thumbnail", thumbnailImage);
        if (!thumbnailImage) {
            addMessage("Error: No thumbnail image provided");
            return;
        }

        let name = prompt("Input thumbnail file name (will be slugified)");
        name = slugify(name, { lower: true, strict: true });

        setRunning(true);

        UploadFile(
            thumbnailImage.target.value[0],
            name,
            message => {
                addMessage(message);
            },
            url => {
                addMessage("File uploaded successfully:");
                addMessage(url);
                addMessage("");
                setRunning(false);
            },
            error => {
                addMessage("Error: " + error);
                addMessage("");
                setRunning(false);
            }
        );

        addMessage(
            `Uploading thumbnail image ${thumbnailImage.target.value[0].name} (${thumbnailImage.target.value[0].size} bytes)`
        );
    };

    const [jsonBackup, setJsonBackup] = useState(null);
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

    const [preparedDownload, setPreparedDownload] = useState("");
    const StartGetJsonBackup = () => {
        setPreparedDownload("");
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

    const [scrapeSubset, setScrapeSubset] = useState(true);
    const StartScrape = () => {
        setRunning(true);
        progressBarParentRef.current.style.setProperty("display", "block");
        progressBarRef.current.style.setProperty("width", "0%");

        RunScrape(
            existingScripts,
            scrapeSubset,
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

    //if(user === null || user.waiting) return <div></div>

    return (
        <>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <button onClick={ClearOutput}>Clear Output</button>
                <button onClick={StartClearData}>Wipe Database</button>
                <button onClick={StartAddData}>Add Test Data</button>
                <input
                    type="number"
                    id="count"
                    onChange={e => setCount(parseInt(e.target.value))}
                    value={count}
                ></input>
                <button onClick={StartAggregation}>Run Aggregation</button>
                <Dropzone
                    id="thumbnail"
                    name="thumbnail"
                    label=""
                    className={style.dropzone}
                    hoveringClassName={style.dropzoneon}
                    instruction="Drag + drop a thumbnail image, or click to select one"
                    options={{
                        accept: ["image/png", "image/jpeg"],
                        //maxSize: 2000000, //2MB
                        multiple: false,
                        noKeyboard: true,
                        preventDropOnDocument: true,
                        pasteable: true,
                    }}
                    onChange={setThumbnailImage}
                    onError={(error: string) => addMessage("Error: " + error)}
                    error={""}
                    value={thumbnailImage}
                />
                <button onClick={StartUploadFile}>Upload Image</button>
            </div>
            <div className={`${style.buttons} ${running ? style.hidden : ""}`}>
                <button onClick={StartGetJsonBackup}>Prepare JSON Backup</button>
                <Link href={preparedDownload}>
                    <a
                        style={preparedDownload !== "" ? null : { display: "none" }}
                        download={"ScriptAxisBackup.json"}
                    >
                        Download JSON Backup
                    </a>
                </Link>
                <div className={style.scrape}>
                    <label>
                        {"Scrape"}
                        <br />
                        {"Subset"}
                    </label>
                    <Checkbox
                        className={style.checkbox}
                        checked={scrapeSubset}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setScrapeSubset(e.target.checked)
                        }
                    >
                        <FaCheck />
                    </Checkbox>
                    <button onClick={StartScrape}>Scrape Views and Likes</button>
                </div>
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
                <button onClick={StartJsonRestore}>Restore from JSON Backup</button>
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
            <div className={`loader top ${running ? "loadingtop" : "notloadingtop"}`}></div>
            <div
                className={`loader bottom ${running ? "loadingbottom" : "notloadingbottom"}`}
            ></div>
        </>
    );
};

export default AdminPanel;
