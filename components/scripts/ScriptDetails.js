import {useState, useEffect, useContext, useRef} from 'react'
import Link from 'next/link'

import moment from 'moment'
import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

import ScriptUtils from '../../utilities/ScriptUtils'
import useUser from '../../utilities/auth/useUser'

import style from './ScriptDetails.module.css'

const getEmbed = url => {
    let iframeLink = "";
    if(!url) return null;
    if(url.includes("pornhub.com")) {
        const pieces = url.split("?");
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

    const {user} = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [scriptLikes, setScriptLikes] = useState(0);
    const iFrameRef = useRef();
    const [iFrameLoading, setIFrameLoading] = useState(true);
    useEffect(() => {
        if(!user || !script) return;
        if(!user.likedScripts) {
            setIsLiked(false);
            return;
        }
        setIsLiked(user.likedScripts.findIndex(s => s.slug === script.slug) !== -1);
    }, [user, script])

    useEffect(() => {
        console.log(script);
        if(!script) setScriptLikes(0);
        else setScriptLikes(script.likes);
    }, [script])

    const toggleLike = async () => {
        const newValue = !isLiked;
        const curValue = isLiked;
        setIsLiked(newValue);
        if(newValue) {
            setScriptLikes(cur => cur + 1);
        } else {
            setScriptLikes(cur => cur - 1);
        }
        try {
            const response = await axios.post("/api/scripts/changelike", {
                slug: script.slug, 
                uid: user.id,
                creator: script.creator,
                isLiked: newValue
            });
            if(response.data.error) throw response.data.error;
            console.log(response.data);
        } catch(error) {
            console.error(error);
            
            setIsLiked(curValue);
            if(curValue) {
                setScriptLikes(cur => cur - 1);
            } else {
                setScriptLikes(cur => cur + 1);
            }
        }
    }

    const [videoElement, setVideoElement] = useState(null);
    const handleIFrameLoaded = () => {
        setIFrameLoading(false);

        //this doesn't work due to CORS, bummer...
        /*
        const element = iFrameRef.current.contentWindow.document.getElementsByTagName("video");
        setVideoElement(element)
        const videos = element.ontimeupdate = () => {
            if(videoElement) console.log("Playback Time", videoElement.currentTime);
        }
        */
    }

    //todo - we could show the thumbnail while waiting for the iframe to load...

    return (
        <div className={style.script}>
            <h1 className={style.name}>{script.name}</h1>
            {
                user && user.username === script.owner.username ? (
                    <div>
                        <Link href={`/edit/${script.slug}`}>
                            <a style={{fontSize: "2em", display: "block", textAlign: "right"}}>[Edit Script]</a>
                        </Link>
                    </div>
                ) : null
            }
            <div className={style.creator}>
                <Link href={`/creator/${script.creator}`}>
                    <span>By <a>{script.creator}</a></span>
                </Link>
            </div>
            <p className={style.created}>{moment(script.created, "x").format("Do MMMM YYYY")}</p>
            <div className={style.sidebyside}>
                <div className={style.imagewrapper}>
                    {getEmbed(script.streamingUrl) ? (<>
                            <iframe 
                                style={{display: iFrameLoading ? "none" : "block"}} 
                                src={getEmbed(script.streamingUrl)} 
                                width={1000} height={500} 
                                ref={iFrameRef}
                                allowFullScreen 
                                onLoad={() => handleIFrameLoaded()} 
                            />
                            {iFrameLoading ? <img src={script.thumbnail} /> : null}
                    </>) : <img src={script.thumbnail} />
                    }
                </div>
                <div className={style.details}>
                    <p className={style.category}>{!script.category ? "No Category" : (
                        <Link href={`/scripts?category=${script.category}`}>
                            <a>{script.category}</a>
                        </Link>
                    )}</p>
                    <ul className={style.tags}>
                        {!script.tags 
                            ? null 
                            : script.tags.map(tag => {
                                return (<li key={tag}>
                                    <Link href={`/scripts?include=${tag}`}>
                                        <a>{tag}</a>
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
                                {user && user.emailVerified ? (
                                    <FaHeart 
                                        className={isLiked ? `${style.isLiked} ${style.clickable}` : style.clickable}
                                        onClick={() => toggleLike(user.likedScripts)}
                                     />
                                ) : <FaHeart />}
                                <span>{scriptLikes}</span>
                            </li>
                        </ul>
                        <div className={style.studiotalent}>
                            { !script.studio ? null : (
                                <p><span className="grey">Studio:</span> <Link href={`/scripts?studio=${script.studio}`}><a>{script.studio}</a></Link></p>
                            ) }
                            { (!script.talent || script.talent.length === 0) ? null : (
                                <p><span className="grey">Talent:</span> {script.talent.map(talent => {
                                    return (
                                        <span key={talent}>
                                            <Link key={talent} href={`/scripts?talent=${talent}`}>
                                                <a key={talent}>{talent}</a>
                                            </Link>
                                            {talent === script.talent[script.talent.length - 1] ? null : ", "}
                                        </span>
                                    );
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