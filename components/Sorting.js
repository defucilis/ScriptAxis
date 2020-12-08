import style from './Sorting.module.css'

const sortOptions = [
    {
        label: "Newest",
        sorting: [
            {
                created: "desc"
            }
        ]
    },
    {
        label: "Oldest",
        sorting: [
            {
                created: "asc"
            }
        ]
    },
    {
        label: "Most Viewed",
        sorting: [
            {
                views: "desc"
            }
        ]
    },
    {
        label: "Most Liked",
        sorting: [
            {
                likeCount: "desc"
            }
        ]
    },
    {
        label: "Longest",
        sorting: [
            {
                duration: "desc"
            }
        ]
    },
    {
        label: "Shortest",
        sorting: [
            {
                duration: "asc"
            }
        ]
    },
]

const Sorting = ({onSort}) => {

    const handleSortChange = e => {
        onSort(sortOptions[e.target.value].sorting);
    }

    return (
        <div className={style.sorting}>
            <select onChange={handleSortChange}>
                {
                    sortOptions.map((option, index) => {
                        return (
                            <option key={index} value={index}>
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Sorting;