import style from './Sorting.module.css'

const sortOptions = [
    {
        label: "Newest",
        sorting: {
            field: "created",
            direction: "desc"
        }
    },
    {
        label: "Oldest",
        sorting: {
            field: "created",
            direction: "asc"
        }
    },
    {
        label: "Most Viewed",
        sorting: {
            field: "views",
            direction: "desc"
        }
    },
    {
        label: "Most Liked",
        sorting: {
            field: "likes",
            direction: "desc"
        }
    },
    {
        label: "Longest",
        sorting: {
            field: "duration",
            direction: "desc"
        }
    },
    {
        label: "Shortest",
        sorting: {
            field: "duration",
            direction: "asc"
        }
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