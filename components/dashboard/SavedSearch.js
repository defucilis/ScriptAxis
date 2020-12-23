import Link from 'next/link'

const SavedSearch = ({query, onDeleteClicked}) => {
    return (
        <li>
            <Link href={query.queryString}>
            <a>
                { !query.search ? null : <p><span>Search:</span> {query.search}</p> }
                { !query.params ? null : (
                    <p><span>Params:</span> {Object.keys(query.params).map(param => {
                        return `${param}: ${query.params[param]}`;
                    }).join("  |  ")}</p>
                )}
                { !query.sorting ? null : <p><span>Sort By:</span> {query.sorting}</p> }
            </a>
            </Link>
            <div>
                <button style={{
                    marginTop: `${(Object.keys(query).length - 2) * 0.6}em`
                }} onClick={() => onDeleteClicked(query)}>Delete</button>
            </div>
        </li>
    )
}

export default SavedSearch;