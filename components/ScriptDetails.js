import style from './ScriptDetails.module.css'
import Link from 'next/link'
import ScriptUtils from '../utilities/ScriptUtils'
import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

const ScriptDetails = ({script}) => {
    return (
        <div className={style.script}>
            <h1 className={style.name}>{script.name}</h1>
            <div className={style.author}>
                <Link href={`/author/${script.author}`}>
                    <span>By <a>{script.author}</a></span>
                </Link>
            </div>
            <div className={style.sidebyside}>
                <div className={style.imagewrapper}>
                    <img src={script.thumbnail} />
                </div>
                <div className={style.details}>
                    <div className={style.duration}>
                        <p>Duration: {ScriptUtils.durationToString(script.duration)}</p>
                    </div>
                    <Link href={script.source}>
                        <a className={style.source} target="_blank">Go to source webpage</a>
                    </Link>
                    <ul className={style.stats}>
                        <li>
                            <FaRegEye />
                            <span>{ScriptUtils.viewsToString(script.views)}</span>
                        </li>
                        <li>
                            <FaThumbsUp />
                            <span>{ScriptUtils.thumbsToPercentage(script.thumbsup, script.thumbsdown)}%</span>
                        </li>
                        <li>
                            <FaHeart />
                            <span>{script.likes}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ReactMarkdown source={script.description} />
        </div>
    )
}

export default ScriptDetails;