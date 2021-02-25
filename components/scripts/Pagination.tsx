import ScriptUtils from "../../lib/ScriptUtils";

import style from "./Pagination.module.scss";

const Pagination = ({ curPage, totalPages, query }: {curPage: number, totalPages: number, query: any}): JSX.Element => {
    const getLinkTarget = (query, page) => {
        const newQuery = { ...query };
        newQuery.page = page;
        let queryString = ScriptUtils.queryToString(ScriptUtils.queryToUrlQuery(newQuery));
        if (page === 1) queryString += queryString === "" ? "?page=1" : "&page=1";
        return queryString;
    };

    return (
        <div className={style.pagination}>
            <ul>
                {curPage === 1 ? null : (
                    <li>
                        <a href={getLinkTarget(query, 1)}>1</a>
                    </li>
                )}
                {curPage <= 3 ? null : <li className={style.nolink}>...</li>}
                {curPage <= 2 ? null : (
                    <li>
                        <a href={getLinkTarget(query, curPage - 1)}>{curPage - 1}</a>
                    </li>
                )}
                <li className={style.currentpage}>
                    <button>{curPage}</button>
                </li>
                {curPage >= totalPages - 1 ? null : (
                    <li>
                        <a href={getLinkTarget(query, curPage + 1)}>{curPage + 1}</a>
                    </li>
                )}
                {curPage >= totalPages - 2 ? null : <li className={style.nolink}><span>...</span></li>}
                {curPage === totalPages ? null : (
                    <li>
                        <a href={getLinkTarget(query, totalPages)}>{totalPages}</a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
