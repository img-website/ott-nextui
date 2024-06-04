import { db } from '@/app/firebase/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useAllActiveVideosByNew = (limitation) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allMemesCollectionRef = collection(db, "allmemes");
                const allMemesQuery = query(allMemesCollectionRef, orderBy("createdAt", "desc"), limit(limitation));
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

        fetchData();
    }, [db]); // Ensures data refetches if `db` instance changes
    console.info(data)
    return { data, isLoading, error };
};

export default useAllActiveVideosByNew;
