import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

export const useRealtime = (query) => {

    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(query, querySnapshot => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setDocuments(docs)
        }, error => setError(error));

        return unsub
    }, [query]);

    return { documents, error }
}