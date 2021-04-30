import { Sorting } from "lib/types";
import style from "./Sorting.module.scss";

export interface SortOption {
    label: string;
    sorting: Sorting[];
}

const sortOptions: SortOption[] = [
    {
        label: "Newest",
        sorting: [
            {
                created: "desc",
            },
        ],
    },
    {
        label: "Oldest",
        sorting: [
            {
                created: "asc",
            },
        ],
    },
    {
        label: "Most Viewed",
        sorting: [
            {
                views: "desc",
            },
        ],
    },
    {
        label: "Most Liked",
        sorting: [
            {
                likeCount: "desc",
            },
        ],
    },
    {
        label: "Longest",
        sorting: [
            {
                duration: "desc",
            },
        ],
    },
    {
        label: "Shortest",
        sorting: [
            {
                duration: "asc",
            },
        ],
    },
    {
        label: "Fastest",
        sorting: [
            {
                averageSpeed: "desc",
            },
        ],
    },
    {
        label: "Slowest",
        sorting: [
            {
                averageSpeed: "asc",
            },
        ],
    },
];

const SortingElement = ({ onSort }: { onSort: (mode: Sorting[]) => void }): JSX.Element => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSort(sortOptions[e.target.value].sorting);
    };

    return (
        <div className={style.sorting}>
            <select onChange={handleSortChange}>
                {sortOptions.map((option, index) => {
                    return (
                        <option key={index} value={index}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SortingElement;
