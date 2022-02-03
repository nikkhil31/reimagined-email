import { addDoc, doc, getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore"
import { useEffect, useReducer, useState } from "react"
import { db } from "../firebase/config"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const findOne = async (collection, id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const docRef = doc(db, collection, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                dispatchIfNotCancelled({ type: 'DOCUMENT', payload: docSnap.data() })
            } else {
                dispatchIfNotCancelled({ type: 'DOCUMENT', payload: {} })
            }
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }



    const find = async ref => {
        dispatch({ type: 'IS_PENDING' })

        try {
            let results = []
            const querySnapshot = await getDocs(ref);
            querySnapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            });

            dispatchIfNotCancelled({ type: 'DOCUMENT', payload: results })
            return results
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
            return false
        }
    }



    const add = async (ref, doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = Timestamp.fromDate(new Date())
            const addedDocument = await addDoc(ref, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'DOCUMENT', payload: addedDocument })
            return addedDocument
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
            return false
        }
    }


    const update = async (ref, doc) => {
        try {
            const updatedAt = Timestamp.fromDate(new Date())
            const updatedDocument = await updateDoc(ref, { ...doc, updatedAt })
            dispatchIfNotCancelled({ type: 'DOCUMENT', payload: updatedDocument })
            return updatedDocument
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
            return false
        }
    }


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    return { findOne, find, add, update, ...response }

}