import { formatColor, getColor } from "funscript-utils/lib/funMapper";
import { Script } from "lib/types";
import Link from "next/link";

import { FaThumbsUp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import ScriptUtils from "../../lib/ScriptUtils";

import style from "./ScriptTile.module.scss";

const ScriptTile = ({ script }: { script: Script }): JSX.Element => {
    return (
        <div className={style.scripttile}>
            <Link href={`/script/${script.slug}`}>
                <a className={style.thumbnail}>
                    <div className={style.imagewrapper}>
                        <img src={script.thumbnail} />
                    </div>
                    <div className={style.imageoverlay}>
                        {!script.averageSpeed ? (
                            <span></span>
                        ) : (
                            <span
                                style={{
                                    backgroundColor: formatColor(
                                        getColor(script.averageSpeed),
                                        0.5
                                    ),
                                }}
                                className={style.averageSpeed}
                            >
                                {script.averageSpeed}
                            </span>
                        )}
                        <span>{ScriptUtils.durationToString(script.duration)}</span>
                    </div>
                </a>
            </Link>
            <div className={style.scriptname}>
                <Link href={`/script/${script.slug}`}>
                    <a>{script.name}</a>
                </Link>
            </div>
            <div className={style.scriptcreator}>
                <Link href={`/creator/${script.creatorName}`}>
                    <a>{script.creatorName}</a>
                </Link>
            </div>
            <div className={style.bottomrow}>
                <p className={style.views}>{ScriptUtils.viewsToString(script.views, true)}</p>
                <div className={style.rating}>
                    <FaThumbsUp />
                    <p>{ScriptUtils.thumbsToPercentage(script.thumbsUp, script.thumbsDown)}%</p>
                </div>
                {script.likeCount == 0 ? null : (
                    <div className={style.likes}>
                        <FaHeart />
                        <p>{script.likeCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScriptTile;
