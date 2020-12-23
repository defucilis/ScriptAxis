import {useState, useEffect} from 'react'

import CreatorTile from './CreatorTile'

import style from './CreatorGrid.module.css'

const CreatorGrid = ({creators}) => {
    const [creatorTiles, setCreatorTiles] = useState([]);
    useEffect(() => {
        if(!creators) {
            setCreatorTiles([]);
            return;
        }
        setCreatorTiles(creators.map(creator => <CreatorTile key={creator.name} creator={creator} />))
    }, [creators]);

    return (
        <div className={style.creatorgrid}>
            {creatorTiles}
        </div>
    )
}

export default CreatorGrid;