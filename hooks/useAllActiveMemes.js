import { db } from '@/app/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useAllActiveMemes = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllActiveMemes = async () => {
            try {
                const allMemesCollectionRef = collection(db, "allmemes");
                const allMemesQuery = query(allMemesCollectionRef, where("status", "==", "active"));
                const querySnapshot = await getDocs(allMemesQuery);

                const memes = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(memes);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllActiveMemes();
    }, [db]); // Ensures data refetches if `db` instance changes

    return { data, isLoading, error };
};

export default useAllActiveMemes;
