import ScriptUtils from '../../utilities/ScriptUtils'

import style from './Pagination.module.css'

const Pagination = ({curPage, totalPages, query}) => {
    
    const getLinkTarget = (query, page) => {
        let newQuery = {...query};
        newQuery.page = page;
        return ScriptUtils.queryToString(ScriptUtils.objectToQuery(newQuery));
    }

    return (
        <div className={style.pagination}>
            <ul>
            {curPage === 1 ? null : 
                <li><a href={getLinkTarget(query, 1)}>1</a></li>
            }
            {curPage <= 3 ? null : 
                <li>...</li>
            }
            {curPage <= 2 ? null : 
                <li><a href={getLinkTarget(query, curPage - 1)}>{curPage - 1}</a></li>
            }
            <li className={style.currentpage}><a href={getLinkTarget(query, curPage)}>{curPage}</a></li>
            {curPage >= totalPages - 1 ? null : 
                <li><a href={getLinkTarget(query, curPage + 1)}>{curPage + 1}</a></li>
            }
            {curPage >= totalPages - 2 ? null : 
                <li>...</li>
            }
            {curPage === totalPages ? null : 
                <li><a href={getLinkTarget(query, totalPages)}>{totalPages}</a></li>
            }
            </ul>
        </div>
    )
}

export default Pagination;