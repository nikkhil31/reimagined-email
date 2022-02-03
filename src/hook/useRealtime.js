import { onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react"

export const useRealtime = (_query) => {

    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);

    const query = useRef(_query).current

    useEffect(() => {
        const unsub = onSnapshot(query, querySnapshot => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setDocuments(docs)
        }, error => setError(error));

        return () => unsub()
    }, [query]);

    return { documents, error }
}