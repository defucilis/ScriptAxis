import Link from "next/link";
import axios from "axios";
import { Dropzone } from "components/forms/FormUtils";
import { addFunscriptMetadata } from "funscript-utils/lib/funConverter";
import FirebaseUtils from "lib/FirebaseUtils";
import ScriptUtils from "lib/ScriptUtils";
import { Script } from "lib/types";
import { useEffect, useState } from "react";

import style from "./ScriptNeedingFunscript.module.scss";

const ScriptNeedingFunscript = ({
    script,
    onComplete,
}: {
    script: Script;
    onComplete: (script: Script) => void;
}): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [funscriptFile, setFunscriptFile] = useState<File>(null);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [error, setError] = useState("");

    const handleChange = (e: {
        target: {
            id: string;
            value: any;
        };
    }) => {
        setFunscriptFile(e.target.value[0]);
    };

    const handleError = (e: {
        target: {
            id: string;
            error: string;
        };
    }) => {
        setError(e.target.error);
    };

    useEffect(() => {
        const loadSpeed = async (file: File) => {
            const fileData = await ScriptUtils.readFile(file);
            const newFunscript = addFunscriptMetadata(JSON.parse(fileData));
            setAverageSpeed(Math.round(newFunscript.metadata.average_speed));
        };

        if (!funscriptFile) return;

        loadSpeed(funscriptFile);
    }, [funscriptFile]);

    const tryUpload = async () => {
        setLoading(true);

        const fileUrl = await FirebaseUtils.uploadFile(
            funscriptFile,
            `funscripts/${script.slug}`,
            (progress: number) => console.log("Funscript File uploading", progress * 100)
        );

        const finalUpdateData: any = {
            id: script.id,
            set: {
                funscript: fileUrl,
                averageSpeed: averageSpeed,
            },
            remove: {},
            add: {},
        };

        const response = await axios.post("/api/scripts/update", finalUpdateData);
        if (response.data.error) throw response.data.error;
        if (onComplete) onComplete(script);

        setLoading(false);
    };

    return (
        <div className={style.scriptneedingfunscript}>
            <Link href={"/script/" + script.slug}>
                <a>{script.name}</a>
            </Link>
            <a href={script.sourceUrl}>[Source URL]</a>
            <Dropzone
                id="funscript"
                name="funscript"
                className={style.dropzone}
                hoveringClassName={style.dropzoneon}
                instruction="Drag + drop a .funscript, or click to select one"
                options={{
                    accept: [".funscript"],
                    maxSize: 1024000, //1MB
                    multiple: false,
                    noKeyboard: true,
                    preventDropOnDocument: true,
                    pasteable: true,
                }}
                onChange={handleChange}
                onError={handleError}
                error={error}
                value={funscriptFile}
            />
            {loading ? <p>Loading...</p> : <button onClick={tryUpload}>Upload</button>}
        </div>
    );
};

export default ScriptNeedingFunscript;
