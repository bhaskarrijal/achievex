import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOutFromApp() {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}