
import moment from 'moment'
import { FaHeart } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'

import ScriptGrid from '../scripts/ScriptGrid'

import ScriptUtils from '../../utilities/ScriptUtils'

import style from './CreatorDetail.module.css'


const CreatorDetail = ({creator}) => {
    console.log(creator);
    return (
        <div className={style.creator}>
            <h1>{creator.name}</h1>
            <h3>Scripting since {moment(creator.scripts[creator.scripts.length - 1].created, "x").format("MMMM YYYY")}</h3>
            <div className={style.stats}>
                <div>
                    <div>
                        <p><FaRegEye /></p>
                        <p>{ScriptUtils.viewsToString(creator.totalViews)}</p>
                    </div>
                    <p>Total Views</p>
                </div>
                <div>
                    <div>
                        <p><FaHeart /></p>
                        <p>{ScriptUtils.viewsToString(creator.totalLikes)}</p>
                    </div>
                    <p>Total Likes</p>
                </div>
            </div>
            <ScriptGrid scripts={creator.scripts} />
        </div>
    )
}

export default CreatorDetail;