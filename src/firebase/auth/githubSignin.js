import firebase_app from "../config";
import { GithubAuthProvider, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
const provider = new GithubAuthProvider();

export default async function signInWithGitHub(email, password) {
    provider.setCustomParameters({
        'allow_signup': 'false'
    });
    let result = null,
        error = null;
    try {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });
    } catch (e) {
        error = e;
    }

    return { result, error };
}