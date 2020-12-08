import style from './ScriptDetails.module.css'
import Link from 'next/link'
import ScriptUtils from '../utilities/ScriptUtils'
import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'

const getEmbed = url => {
    let iframeLink = "";
    if(!url) return null;
    if(url.includes("pornhub.com")) {
        const pieces = url.split("?");
        console.log(pieces);
        if(pieces.length < 2) return null;
        const params = new URLSearchParams("?" + pieces[1])
        const viewkey = params.get("viewkey");
        if(!viewkey) return null;

        iframeLink = `https://www.pornhub.com/embed/${viewkey}`;
    } else if(url.includes("xhamster.com")) {
        const pieces = url.split("-");
        if(pieces.length < 2) return null;
        iframeLink = `https://www.xhamster.com/embed/${pieces[pieces.length - 1].split("?")[0]}`;
    } else if(url.includes("spankbang.com")) {
        const pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 2) return null;
        iframeLink = `https://www.spankbang.com/${pieces[1]}/embed`;
    } else if(url.includes("xvideos.com")) {
        const pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 2) return null;
        iframeLink = `https://www.xvideos.com/embedframe/${pieces[1].replace("video", "")}`;
    } else if(url.includes("redtube.com")) {
        const pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 2) return null;
        iframeLink = `https://embed.redtube.com?id=${pieces[1]}`;
    } else if(url.includes("porntube.com")) {
        let pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 2) return null;
        pieces = pieces[pieces.length - 1].split("?")[0].split("_");
        if(pieces.length < 2) return null;
        iframeLink = `https://www.porntube.com/embed/${pieces[1]}`;
    } else if(url.includes("you-porn.com")) {
        iframeLink = url.replace("you-porn.com/watch/", "you-porn.com/embed/");
    } else if(url.includes("tube8.com")) {
        iframeLink = url.replace("tube8.com", "tube8.com/embed");
    } else if(url.includes("youjizz.com")) {
        let pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 2) return null;
        pieces = pieces[pieces.length - 1].split("-");
        iframeLink = `https://www.youjizz.com/videos/embed/${pieces[pieces.length - 1].replace(".html", "").split("?")[0]}`;
    } else if(url.includes("eporner.com")) {
        let pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 3) return null;
        iframeLink = `https://www.eporner.com/embed/${pieces[2]}`;
    } else if(url.includes("tnaflix.com")) {
        let pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 4) return null;
        iframeLink = `https://player.tnaflix.com/video/${pieces[pieces.length - 1].replace("video", "").split("?")[0]}`
    } else if(url.includes("homemoviestube.com")) {
        let pieces = url.replace("http://", "").replace("https://").split("/");
        if(pieces.length < 3) return null;
        iframeLink = `https://www.homemoviestube.com/embed/${pieces[2]}`;
    }
    return iframeLink;
}

const ScriptDetails = ({script}) => {

    //todo - we could show the thumbnail while waiting for the iframe to load...

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
                    {getEmbed(script.streamingUrl) ? 
                        <iframe src={getEmbed(script.streamingUrl)} width={1000} height={500} allowFullScreen onLoad={() => console.log("iFrame loaded!")} /> : 
                        <img src={script.thumbnail} />
                    }
                </div>
                <div className={style.details}>
                    <p className={style.category}>{!script.category ? "No Category" : (
                        <Link href={`/scripts?category=${script.category}`}>
                            <a>{ScriptUtils.getPrettyCategory(script.category)}</a>
                        </Link>
                    )}</p>
                    <ul className={style.tags}>
                        {!script.tags 
                            ? null 
                            : script.tags.map(tag => {
                                return (<li key={tag}>
                                    <Link href={`/scripts?tag=${tag}`}>
                                        <a>{ScriptUtils.getPrettyCategory(tag)}</a>
                                    </Link>
                                </li>);
                            })
                        }
                    </ul>
                    <div className={style.duration}>
                        <p>Duration: {ScriptUtils.durationToString(script.duration)}</p>
                    </div>
                    <div className={style.linkbuttons}>
                        {!script.sourceUrl ? null : (
                            <Link href={script.sourceUrl}>
                                <a className={style.source} target="_blank">View on {ScriptUtils.getSiteName(script.sourceUrl)}</a>
                            </Link>
                        )}
                        {!script.streamingUrl ? null : (
                            <Link href={script.streamingUrl}>
                                <a className={style.source} target="_blank">Watch on {ScriptUtils.getSiteName(script.streamingUrl)}</a>
                            </Link>
                        )}
                    </div>
                    <div className={style.underlinkdata}>
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
                        <div className={style.studiotalent}>
                            { !script.studio ? null : (
                                <p><span className="grey">Studio:</span> {script.studio}</p>
                            ) }
                            { (!script.talent || script.talent.length === 0) ? null : (
                                <p><span className="grey">Talent:</span> {script.talent.map(talent => {
                                    return <span key={talent}>{talent}{talent === script.talent[script.talent.length - 1] ? "" : ", "}</span>
                                })}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.description}>
                <ReactMarkdown source={script.description} />
            </div>
        </div>
    )
}

export default ScriptDetails;