"use client"
import React, { Suspense } from "react"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, db } from "@/app/firebase/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAppContext } from "@/context";

const SigninWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = React.useState(null); // Track user state for existence check
    const { credential, setCredential } = useAppContext();


    const signInWithGoogle = async () => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const signInWithRedirectBack = async () => {
        try {
            const result = await getRedirectResult(auth);
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                localStorage.setItem("token", token);
                setCredential()
                console.info("token", token);

                const signedInUser = result.user;
                localStorage.setItem("uid", signedInUser.uid)
                setUser(signedInUser); // Update user state for existence check
                console.info("user", signedInUser);

                setCredential(prev => ({
                    ...prev,
                    accessToken: token,
                    uid: signedInUser?.uid,
                    email: signedInUser?.email,
                    isAdmin: false,
                    displayName: signedInUser?.displayName,
                    emailVerified: signedInUser?.emailVerified,
                    isAnonymous: signedInUser?.isAnonymous,
                    phoneNumber: signedInUser?.phoneNumber,
                    photoURL: signedInUser?.photoURL
                }))
                await createFirestoreUser(signedInUser, token);
            }
        } catch (error) {
            console.error("Error handling redirect:", error);
        }
    };


    const createFirestoreUser = async (user, token) => {
        const { uid, email, displayName, emailVerified, isAnonymous, phoneNumber, photoURL } = user;
        const userRef = collection(db, "users");

        // Check if user already exists before creating a new document
        const queryRef = query(userRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
            const newDoc = await addDoc(userRef, {
                uid,
                email,
                isAdmin: false, // Set initial admin status (adjust as needed)
                displayName,
                emailVerified,
                isAnonymous,
                phoneNumber,
                photoURL
            });
            console.log(`User document created with key: ${newDoc.id}`);
        } else {
            console.log("User already exists in Firestore");
            // Optionally handle existing user (e.g., update specific fields)
        }
    };

    React.useEffect(() => {
        if (auth) {
            signInWithRedirectBack();
        }
    }, [auth]); // Run on auth state change

    console.log("credential", credential)

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <button type="button" onClick={signInWithGoogle} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Sign in with Google
            </button>
        </Suspense>
    )
}

export default SigninWithGoogle