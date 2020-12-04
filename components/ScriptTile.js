import Link from 'next/link'

import style from './ScriptTile.module.css'

const durationToString = duration => {
    let output = "";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - (minutes * 60) - (hours * 3600);
    if(hours > 0) output += hours + ":";
    if(minutes > 0) output += minutes + ":";
    if(seconds > 10) output += seconds;
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

    return Math.round(views) + " Views";
}

const thumbsToPercentage = (thumbsup, thumbsdown) => {
    const percentage = (thumbsup / (Number(thumbsup) + Number(thumbsdown)));
    return Math.round(percentage * 100.0);
}

const ScriptTile = ({script}) => {
    return (
        <div className={style.scripttile}>
            <Link href={`script/${script.slug.stringValue}`}>
                <a className={style.thumbnail}>
                    <div className={style.imagewrapper}>
                        <img src={script.thumbnail.stringValue} />
                    </div>
                    <span>{durationToString(script.duration.integerValue)}</span>
                </a>
            </Link>
            <div className={style.scriptname}>
                <Link href={`script/${script.slug.stringValue}`}>
                    <a>{script.name.stringValue}</a>
                </Link>
            </div>
            <div className={style.scriptauthor}>
                <Link href={`author/${script.author.stringValue}`}>
                    <a>{script.author.stringValue}</a>
                </Link>
            </div>
            <div className={style.bottomrow}>
                <p>{viewsToString(script.views.integerValue)} Views</p>
                <p>&</p>
                <p>{thumbsToPercentage(script.thumbsup.integerValue, script.thumbsdown.integerValue)}%</p>
            </div>
        </div>
    )
}

export default ScriptTile;