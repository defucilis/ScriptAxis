import ScriptUtils from "../../utilities/ScriptUtils";

import style from "./Pagination.module.css";

const Pagination = ({ curPage, totalPages, query }) => {
    const getLinkTarget = (query, page) => {
        let newQuery = { ...query };
        newQuery.page = page;
        let queryString = ScriptUtils.queryToString(ScriptUtils.objectToQuery(newQuery));
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
                    <a href={getLinkTarget(query, curPage)}>{curPage}</a>
                </li>
                {curPage >= totalPages - 1 ? null : (
                    <li>
                        <a href={getLinkTarget(query, curPage + 1)}>{curPage + 1}</a>
                    </li>
                )}
                {curPage >= totalPages - 2 ? null : <li className={style.nolink}>...</li>}
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
