"use client"
import { Button } from '@nextui-org/button'
import { GoogleIcon } from '@/components/icons'
import { useEffect, useState } from "react"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";
import { auth, db } from "@/app/firebase/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAppContext } from "@/context";
import { useLoadingContext } from '@/context/loading';
import ProfileIcon from './profileIcon';

const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null); // Track user state for existence check
    const { credential, setCredential } = useAppContext();
    const { setIsLoading, setLoadingText } = useLoadingContext();

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
            setLoadingText("Signing in...");
            localStorage.setItem("try_signin", true);
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

                const signedInUser = result.user;
                localStorage.setItem("uid", signedInUser.uid)
                setUser(signedInUser); // Update user state for existence check

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
            setIsLoading(false);
            setLoadingText("");
            localStorage.removeItem("try_signin");
        } else {
            console.log("User already exists in Firestore");
            setIsLoading(false);
            setLoadingText("");
            localStorage.removeItem("try_signin");
            // Optionally handle existing user (e.g., update specific fields)
        }
    };

    useEffect(() => {
        if (auth) {
            signInWithRedirectBack();
        }
    }, [auth]); // Run on auth state change

    
    const LogoutHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingText("Signing out...");
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            setCredential(prev => ({
                ...prev,
                accessToken: null,
                uid: null,
                email: null,
                isAdmin: false,
                displayName: null,
                emailVerified: null,
                isAnonymous: null,
                phoneNumber: null,
                photoURL: null
            }))
        }).catch((error) => {
            // An error happened.
        }).finally(() => {
            setIsLoading(false);
            setLoadingText("");
            // The sign-out process is complete.
        });
    }



    return (
        credential?.accessToken ?
            <ProfileIcon credential={credential} LogoutHandler={LogoutHandler} />
            :
            <Button
                onClick={signInWithGoogle}
                className="text-sm font-semibold text-zinc-900 dark:text-white bg-sky-100 dark:bg-default-100"
                href=""
                startContent={<GoogleIcon className="sm:size-5 size-4 text-sky-600 dark:text-white" />}
                variant="flat"
            >
                Signin
            </Button>
    )
}

export default GoogleLogin