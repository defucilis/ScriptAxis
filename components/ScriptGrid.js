import {useState, useEffect} from 'react';

import ScriptTile from './ScriptTile'
import style from './ScriptGrid.module.css';

const ScriptGrid = ({scripts}) => {

    const [tiles, setTiles] = useState([]);
    useEffect(() => {
        if(!scripts) return;
        if(!scripts.documents) return;
        setTiles(scripts.documents.map(document => {
            return (
                <ScriptTile key={document.fields.slug.stringValue} script={{...document.fields}} />
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