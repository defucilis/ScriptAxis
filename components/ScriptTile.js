import Link from 'next/link'
import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

import style from './ScriptTile.module.css'

const durationToString = duration => {
    let output = "";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - (minutes * 60) - (hours * 3600);
    if(hours > 0) output += hours + ":";
    if(minutes > 0) output += minutes + ":";
    if(seconds >= 10) output += seconds;
    else if(seconds > 0) output += "0" + seconds;
    else output += "00";
    return output;
}

const viewsToString = views => {
    if(views > 1000000) {
        return (Math.round(views / 100000) / 10) + "M";
    }
    
    if(views > 10000) {
        return Math.round(views / 1000) + "k";
    }
    
    if(views > 1000) {
        return (Math.round(views / 100) / 10) + "k";
    }

    return Math.round(views) + "";
}

const thumbsToPercentage = (thumbsup, thumbsdown) => {
    const percentage = (thumbsup / (Number(thumbsup) + Number(thumbsdown)));
    return Math.round(percentage * 100.0);
}

const ScriptTile = ({script}) => {
    return (
        <div className={style.scripttile}>
            <Link href={`script/${script.slug}`}>
                <a className={style.thumbnail}>
                    <div className={style.imagewrapper}>
                        <img src={script.thumbnail} />
                    </div>
                    <div className={style.imageoverlay}></div>
                    <span>{durationToString(script.duration)}</span>
                </a>
            </Link>
            <div className={style.scriptname}>
                <Link href={script.source}>
                    <a target="_blank">{script.name}</a>
                </Link>
            </div>
            <div className={style.scriptauthor}>
                <Link href={`author/${script.author}`}>
                    <a>{script.author}</a>
                </Link>
            </div>
            <div className={style.bottomrow}>
                <p className={style.views}>{viewsToString(script.views)} Views</p>
                <div className={style.rating}>
                    <FaThumbsUp />
                    <p>{thumbsToPercentage(script.thumbsup, script.thumbsdown)}%</p>
                </div>
                { script.likes == 0 ? null : (
                <div className={style.likes}>
                    <FaHeart />
                    <p>{script.likes}</p>
                </div>
                )}
            </div>
            
        </div>
    )
}

export default ScriptTile;