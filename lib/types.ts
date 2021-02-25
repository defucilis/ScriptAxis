export interface Category {
    name: string;
    scripts: FullScript[];
    count: number;
}

export interface Creator {
    name: string;
    user?: User;
    thumbnail: string;
    scripts: FullScript[]
    totalViews: number;
    totalLikes: number;
    created: Date;
    modified: Date;
}

// Everything required to store a funscript - this will change in the future!
export interface Script {
    id: number;
    name: string;
    category: Category;
    slug: string;
    tags: string[];
    description?: string;
    duration: number
    thumbnail: string;
    funscripts: string[];
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
}
export interface FullScript extends Script {
    creator: Creator
    owner: User;
    
    likedBy: User[];
}

export interface UnlinkedScript extends Script {
    creatorName: string;
    ownerName: string;
}

export interface ScriptStub {
    id: number;
    slug: string;
    name: string;
    sourceUrl: string
}

export interface User {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    creator?: Creator;
    isAdmin: boolean;
    ownedScripts: FullScript[];
    likedScripts: FullScript[];
    savedFilters: string[];
    created: Date;
    modified: Date;
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
        }
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