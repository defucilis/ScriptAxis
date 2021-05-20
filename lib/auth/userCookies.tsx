import cookies from "js-cookie";
import { UiUser } from "../../lib/types";

export const getUserFromCookie = (): UiUser => {
    const cookie = cookies.get("auth");
    if (!cookie) {
        return null;
    }
    const parsedCookie = JSON.parse(cookie);
    const output: UiUser = {
        id: parsedCookie.id,
        username: parsedCookie.username,
        emailVerified: parsedCookie.emailVerified,
        isAdmin: parsedCookie.isAdmin,
        savedFilters: parsedCookie.savedFilters,
        email: parsedCookie.email,
        createdAt: parsedCookie.createdAt,
        updatedAt: parsedCookie.updatedAt,
        ownedScripts: parsedCookie.ownedScripts,
        likedScripts: parsedCookie.likedScripts,
    };
    return output;
};

export const setUserCookie = (user: UiUser): void => {
    cookies.set("auth", user, {
        // firebase id tokens expire in one hour
        // set cookie expiry to match
        expires: 1 / 24,
    });
};

export const removeUserCookie = (): void => cookies.remove("auth");
