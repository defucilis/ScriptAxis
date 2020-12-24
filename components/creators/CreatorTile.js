import Link from 'next/link'

import { FaHeart } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'

import ScriptUtils from '../../utilities/ScriptUtils'

import style from '../scripts/ScriptTile.module.css'

const CreatorTile = ({creator}) => {
    return (
        <div className={style.scripttile}>
            <Link href={`/creator/${creator.name}`}>
                <a className={style.thumbnail}>
                    <div className={style.imagewrapper}>
                        <img src={creator.thumbnail} />
                    </div>
                    <div className={style.imageoverlay}></div>
                </a>
            </Link>
            <div className={style.scriptname}>
                <Link href={`/creator/${creator.name}`}>
                    <a>{creator.name}</a>
                </Link>
            </div>
            <div className={style.scriptcreator}>
                <p>{creator.scripts.length} Script{creator.scripts.length === 1 ? "" : "s"}</p>
            </div>
            <div className={style.bottomrow}>
                <div className={style.rating}>
                    <FaEye />
                    <p>{ScriptUtils.viewsToString(creator.totalViews)} Views</p>
                </div>
                { creator.totalLikes == 0 ? null : (
                <div className={style.likes}>
                    <FaHeart />
                    <p>{creator.totalLikes}</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default CreatorTile;