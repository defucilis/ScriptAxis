import Link from 'next/link'

import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

import ScriptUtils from '../../utilities/ScriptUtils'

import style from './ScriptTile.module.css'

const ScriptTile = ({script}) => {
    return (
        <div className={style.scripttile}>
            <Link href={`/script/${script.slug}`}>
                <a className={style.thumbnail}>
                    <div className={style.imagewrapper}>
                        <img src={script.thumbnail} />
                    </div>
                    <div className={style.imageoverlay}></div>
                    <span>{ScriptUtils.durationToString(script.duration)}</span>
                </a>
            </Link>
            <div className={style.scriptname}>
                <Link href={`/script/${script.slug}`}>
                    <a>{script.name}</a>
                </Link>
            </div>
            <div className={style.scriptcreator}>
                <Link href={`/creator/${script.creator}`}>
                    <a>{script.creator}</a>
                </Link>
            </div>
            <div className={style.bottomrow}>
                <p className={style.views}>{ScriptUtils.viewsToString(script.views)} Views</p>
                <div className={style.rating}>
                    <FaThumbsUp />
                    <p>{ScriptUtils.thumbsToPercentage(script.thumbsUp, script.thumbsDown)}%</p>
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