import {useState, useEffect} from 'react';

import ScriptTile from './ScriptTile'
import style from './ScriptGrid.module.css';

const ScriptGrid = ({scripts}) => {

    const [tiles, setTiles] = useState([]);
    useEffect(() => {
        if(!scripts) return;
        setTiles(scripts.map(script => {
            return (
                <ScriptTile key={script.slug} script={{...script}} />
            );
        }))
    }, [scripts]);

    return (
        <div className={style.scriptgrid}>
            {tiles}
        </div>
    )
}

export default ScriptGrid;