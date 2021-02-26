import cookies from "js-cookie";
import { User } from "../../lib/types";

export const getUserFromCookie = (): User => {
    const cookie = cookies.get("auth");
    if (!cookie) {
        return null;
    }
    const parsedCookie = JSON.parse(cookie);
    const output: User = {
        id: parsedCookie.id,
        username: parsedCookie.username,
        emailVerified: parsedCookie.emailVerified,
        isAdmin: parsedCookie.isAdmin,
        savedFilters: parsedCookie.savedFilters,
        email: parsedCookie.email,
        created: parsedCookie.created,
        modified: parsedCookie.modified,
    };
    return output;
};

export const setUserCookie = (user: User): void => {
    cookies.set("auth", user, {
        // firebase id tokens expire in one hour
        // set cookie expiry to match
        expires: 1 / 24,
    });
};

export const removeUserCookie = (): void => cookies.remove("auth");
