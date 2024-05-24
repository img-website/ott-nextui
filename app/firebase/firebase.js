import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const storageRef = ref(storage);


export const getAllData = async (collectionName) => {
    try {
        const dataCollection = collection(db, collectionName);
        const snapshot = await getDocs(dataCollection);
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Extract data and add ID
        return data;
    } catch (error) {
        console.error('error.message>>>>>>getAllData>>>>>>>', error);
    }
}

export const getById = async (collectionName, filterByKey, filterOperator, filterValue) => {
    try {
        const dataCollection = collection(db, collectionName);
        const q = query(dataCollection, where(filterByKey, filterOperator, filterValue)); // Query by email
        const snapshot = await getDocs(q);
        const data = snapshot.docs.length > 0 ? { ...snapshot.docs[0].data(), id: snapshot.docs[0].id } : null; // Extract data and add ID, or return null
        return data; // Return the user object or null
    } catch (error) {
        console.error('error.message>>>>getById>>>>>>>>>', error);
    }
}

export const getByFilter = async (collectionName, filterByKey, filterOperator, filterValue) => {
    try {
        const dataCollection = collection(db, collectionName);
        const q = query(dataCollection, where(filterByKey, filterOperator, filterValue), limit(10)); // Query by email

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Extract data and add ID

        return data; // Return the user object or null
    } catch (error) {
        console.error('error.message>>>>getById>>>>>>>>>', error);
    }
}

export const create = async (collectionName, userData) => {
    try {
        const usersCollection = collection(db, collectionName);
        const newDoc = await addDoc(usersCollection, userData);
        return newDoc;
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export { app, auth, db, storage, storageRef }