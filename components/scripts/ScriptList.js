import {useState, useEffect} from 'react'
import Link from 'next/link'

import style from './ScriptList.module.css'

const ScriptList = ({scripts, buttons}) => {

    const [scriptDom, setScriptDom] = useState([]);
    useEffect(() => {
        if(!scripts) return;

        console.log(scripts);

        setScriptDom(scripts.map(script => {
            return (
                <li key={script.slug}>
                    <div>
                        <img src={script.thumbnail} />
                        <div className={style.overview}>
                            <Link href={`/script/${script.slug}`}>
                                <a>{script.name}</a>
                            </Link>
                            <Link href={`/creator/${script.creator.name}`}>
                                <a>{script.creator.name}</a>
                            </Link>
                        </div>
                    </div>
                    { !buttons ? null
                        : buttons.map((button, index) => {
                            return <button key={button.text + "_" + index} onClick={() => button.function(script)}>{button.text}</button>
                        })
                    }
                </li>
            )
        }))
    }, [scripts])

    return (
        <ul className={style.scriptlist}>
            {scriptDom}
        </ul>
    )
}

export default ScriptList;