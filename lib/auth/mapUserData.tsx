import firebase from "firebase";
import { FbUser } from "./authTypes";

export const mapUserData = async (user: firebase.User): Promise<FbUser> => {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    const output: FbUser = {
        uid,
        email,
        token,
    };
    return output;
};
