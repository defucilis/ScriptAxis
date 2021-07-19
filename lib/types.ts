export interface Category {
    name: string;
    scripts: Script[];
    count: number;
}

export interface Creator {
    name: string;
    userId: number;
    thumbnail: string;
    totalViews: number;
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
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
    averageSpeed?: number;
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
    createdAt: Date;
    updatedAt: Date;
    creatorName: string;
    userId: number;
    categoryName: string;
    searchString?: string;
    scriptAxisViews?: number;
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

export type UserRole = "USER" | "CREATOR" | "MODERATOR" | "ADMIN";
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    savedFilters: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const roleIsCreator = (role: UserRole): boolean => {
    switch (role) {
        case "USER":
            return false;
        case "CREATOR":
            return true;
        case "MODERATOR":
            return true;
        case "ADMIN":
            return true;
        default:
            return false;
    }
};

export const roleIsModerator = (role: UserRole): boolean => {
    switch (role) {
        case "USER":
            return false;
        case "CREATOR":
            return false;
        case "MODERATOR":
            return true;
        case "ADMIN":
            return true;
        default:
            return false;
    }
};

export const roleIsAdmin = (role: UserRole): boolean => {
    switch (role) {
        case "USER":
            return false;
        case "CREATOR":
            return false;
        case "MODERATOR":
            return false;
        case "ADMIN":
            return true;
        default:
            return false;
    }
};

export const roleIsUser = (role: UserRole): boolean => {
    switch (role) {
        case "USER":
            return true;
        case "CREATOR":
            return false;
        case "MODERATOR":
            return false;
        case "ADMIN":
            return false;
        default:
            return false;
    }
};

export const roleIsAny = (role: UserRole): boolean => {
    switch (role) {
        case "USER":
            return true;
        case "CREATOR":
            return true;
        case "MODERATOR":
            return true;
        case "ADMIN":
            return true;
        default:
            return false;
    }
};

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
    minSpeed?: number;
    maxSpeed?: number;
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
    minSpeed?: number;
    maxSpeed?: number;
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
    createdAt?: "desc" | "asc";
    views?: "desc" | "asc";
    likeCount?: "desc" | "asc";
    duration?: "desc" | "asc";
    averageSpeed?: "desc" | "asc";
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
