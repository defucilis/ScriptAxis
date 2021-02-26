import { useState, useEffect } from "react";
import Link from "next/link";

import style from "./ScriptList.module.scss";
import { ScriptVisualStub } from "lib/types";

export interface ScriptListButton {
    text: string;
    function: (script: ScriptVisualStub) => void;
}

const ScriptList = ({
    scripts,
    buttons,
}: {
    scripts: ScriptVisualStub[];
    buttons?: ScriptListButton[];
}): JSX.Element => {
    const [scriptDom, setScriptDom] = useState([]);
    useEffect(() => {
        if (!scripts) return;

        setScriptDom(
            scripts.map(script => {
                console.log(script);
                return (
                    <li key={script.slug}>
                        <div>
                            <img src={script.thumbnail} />
                            <div className={style.overview}>
                                <Link href={`/script/${script.slug}`}>
                                    <a>{script.name}</a>
                                </Link>
                                <Link href={`/creator/${script.creatorName}`}>
                                    <a>{script.creatorName}</a>
                                </Link>
                            </div>
                        </div>
                        {!buttons
                            ? null
                            : buttons.map((button, index) => {
                                  return (
                                      <button
                                          key={button.text + "_" + index}
                                          onClick={() => button.function(script)}
                                      >
                                          {button.text}
                                      </button>
                                  );
                              })}
                    </li>
                );
            })
        );
    }, [scripts]);

    return <ul className={style.scriptlist}>{scriptDom}</ul>;
};

export default ScriptList;
