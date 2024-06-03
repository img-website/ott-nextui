import { db } from '@/app/firebase/firebase';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFetchDataByQuery = (collectionName, queryConfig) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    
    
    useEffect(() => {
        const fetchData = async (collectionName, queryConfig = {}) => {
            
            console.info("queryConfig", queryConfig)

            try {
                const collectionRef = collection(db, collectionName);

                // Build a flexible query based on queryConfig
                let q;
                if (Object.keys(queryConfig).length > 0) {
                    const { whereClause = [], orderWise = [], limits = undefined } = queryConfig;

                    // Construct where clause dynamically
                    q = query(collectionRef, ...whereClause.map(([field, operator, value]) => where(field, operator, value)));

                    // Add order by if specified
                    if (orderWise.length > 0) {
                        q = query(q, ...orderWise.map(([field, direction]) => orderBy(field, direction)));
                    }

                    // Add limits if set
                    if (limits) {
                        q = query(q, limit(limits)); // Use limit for flexibility
                    }
                } else {
                    // Default to retrieving all documents if no queryConfig provided
                    q = query(collectionRef);
                }

                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setData(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData(collectionName, queryConfig);
    }, []);

    return { data, isLoading, error };
};

export default useFetchDataByQuery;





// const { data, isLoading, error } = useFetchDataByQuery("allmemes", {
//     whereClause: [
//         ["status", "==", "active"],
//         // ["price", ">", 10]
//     ],
//     orderWise: [["createdAt", "asc"]],
//     limits: 2
// });

// fetchData("products", {
//     whereClause: [
//         ["name", "==", "T-Shirt"],
//         ["price", ">", 10]
//     ],
//     orderBy: [["price", "asc"]],
//     limit: 5
// });

// const res = fetchData("allmemes");
// console.log(data);