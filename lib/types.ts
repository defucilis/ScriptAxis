export interface Category {
    name: string;
    scripts: Script[];
    count: number;
}

export interface Creator {
    name: string;
    userId: string;
    thumbnail: string;
    totalViews: number;
    totalLikes: number;
    created: Date;
    modified: Date;
}

export interface FullCreator extends UiCreator {
    user?: User;
}

export interface UiCreator extends Creator {
    scripts?: Script[];
}

// Everything required to store a funscript - this will change in the future!
export interface Script {
    id: number;
    name: string;
    slug: string;
    tags: string[];
    description?: string;
    duration: number;
    thumbnail: string;
    funscript?: string;
    otherFiles: string[];
    sourceUrl?: string;
    streamingUrl?: string;
    studio?: string;
    talent: string[];
    active: boolean;
    likeCount: number;
    thumbsUp: number;
    thumbsDown: number;
    views: number;
    created: Date;
    modified: Date;
    creatorName: string;
    userId: string;
    categoryName: string;
}

export interface ScriptStub {
    id: number;
    slug: string;
    name: string;
    sourceUrl: string;
}

export interface ScriptVisualStub {
    name: string;
    creatorName: string;
    slug: string;
    thumbnail: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    isAdmin: boolean;
    savedFilters: string[];
    created: Date;
    modified: Date;
}

export interface UiUser extends User {
    creator?: { name: string };
    ownedScripts: {
        slug: string;
        name: string;
        thumbnail: string;
        creatorName: string;
    }[];
    likedScripts: {
        slug: string;
        name: string;
        thumbnail: string;
        creatorName: string;
    }[];
}

export interface LeanUser extends User {
    creator?: { name: string };
    ownedScripts: { id: number }[];
    likedScripts: { slug: string }[];
}

export interface Query {
    filters?: Filters;
    sorting?: Sorting[];
    page?: number;
}

export interface UrlQuery {
    search?: string;
    category?: string;
    include?: string;
    exclude?: string;
    minDuration?: number;
    maxDuration?: number;
    talent?: string;
    studio?: string;
    sourceUrl?: "true" | "false";
    streamingUrl?: "true" | "false";
    sorting?: string;
    page?: number;
}

export interface Filters {
    name?: {
        contains: string;
        mode?: string;
    };
    category?: {
        name: {
            equals: string;
        };
    };
    include?: string[];
    exclude?: string[];
    minDuration?: number;
    maxDuration?: number;
    talent?: string;
    studio?: {
        contains: string;
        mode?: string;
    };
    sourceUrl?: {
        not?: string | null;
    };
    streamingUrl?: {
        not?: string | null;
    };
}

export interface Sorting {
    created?: "desc" | "asc";
    views?: "desc" | "asc";
    likeCount?: "desc" | "asc";
    duration?: "desc" | "asc";
}

export interface SavedQuery {
    search?: string;
    params?: Record<string, string>;
    sorting?: string;
    queryString?: string;
}

export interface TagCategoryLists {
    tags: string[];
    categories: string[];
}

export interface StringLists extends TagCategoryLists {
    talent: string[];
    studios: string[];
    creators: string[];
}

export interface StringListsWithCount {
    tags: { name: string; count: number }[];
    categories: { name: string; count: number }[];
    talent: string[];
    studios: string[];
    creators: string[];
}
