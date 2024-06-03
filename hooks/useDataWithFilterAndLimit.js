import { db } from "@/app/firebase/firebase";
import { collection, getDocs, limit, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const useDataWithFilterAndLimit = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataRef = collection(db, "allmemes");
                const dataQuery = query(
                    dataRef,
                    orderBy('createdAt', 'asc'),
                    // where('status', '==', "active"),
                    limit(4)
                );

                const querySnapshot = await getDocs(dataQuery);

                const res = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(res);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [db]); // Ensures data refetches if `db` instance changes

    return { data, isLoading, error };
}

export default useDataWithFilterAndLimit