import style from './ScriptDetails.module.css'
import Link from 'next/link'
import ScriptUtils from '../utilities/ScriptUtils'
import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'

const ScriptDetails = ({script}) => {
    return (
        <div className={style.script}>
            <h1 className={style.name}>{script.name}</h1>
            <div className={style.creator}>
                <Link href={`/creator/${script.creator}`}>
                    <span>By <a>{script.creator}</a></span>
                </Link>
            </div>
            <p className={style.created}>{moment(script.created, "x").format("Do MMMM YYYY")}</p>
            <div className={style.sidebyside}>
                <div className={style.imagewrapper}>
                    <img src={script.thumbnail} />
                </div>
                <div className={style.details}>
                    <p className={style.category}>{!script.category ? "No Category" : ScriptUtils.getPrettyCategory(script.category)}</p>
                    <ul className={style.tags}>
                        {!script.tags 
                            ? null 
                            : script.tags.map(tag => <li key={tag}>{ScriptUtils.getPrettyCategory(tag)}</li>)
                        }
                    </ul>
                    <div className={style.duration}>
                        <p>Duration: {ScriptUtils.durationToString(script.duration)}</p>
                    </div>
                    <Link href={script.sourceUrl}>
                        <a className={style.source} target="_blank">Go to source webpage</a>
                    </Link>
                    <ul className={style.stats}>
                        <li>
                            <FaRegEye />
                            <span>{ScriptUtils.viewsToString(script.views)}</span>
                        </li>
                        <li>
                            <FaThumbsUp />
                            <span>{ScriptUtils.thumbsToPercentage(script.thumbsUp, script.thumbsDown)}%</span>
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