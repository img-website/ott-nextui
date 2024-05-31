"use client"
import React from 'react'
import { db } from '@/app/firebase/firebase';
import { useAppContext } from '@/context';
import { collection, getDocs, query, where } from 'firebase/firestore';

const UserDetails = () => {
    const { setCredential } = useAppContext();

    const [uid, setUid] = React.useState('');

    const getUserDetail = async () => {
        try {
            const snapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
            const signedInUser = snapshot.docs[0].data();
            setCredential(prev => ({
                ...prev,
                uid: signedInUser?.uid,
                email: signedInUser?.email,
                isAdmin: false,
                displayName: signedInUser?.displayName,
                emailVerified: signedInUser?.emailVerified,
                isAnonymous: signedInUser?.isAnonymous,
                phoneNumber: signedInUser?.phoneNumber,
                photoURL: signedInUser?.photoURL
            }))
        } catch (error) {

        }
    }

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUid = localStorage.getItem('uid');
            if (storedUid) {
                setUid(storedUid);
            }
        }
    }, []);



    React.useEffect(() => {
        getUserDetail()
    }, [uid])
}

export default UserDetails