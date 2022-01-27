import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { isEmpty } from "../helper/check";

export const useAuth = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState();

  const [isCancelled, setIsCancelled] = useState(false)

  const signIn = async ({ name, email, password }) => {

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      if (isEmpty(user)) {
        throw new Error('Could not complete signup')
      }

      const userData = {
        email_id: email,
        name: name
      }


      const refUser = doc(db, "users", user.uid);
      await setDoc(refUser, userData);

      !isCancelled && setResponse({ ...userData, id: user.uid });
    } catch (error) {
      !isCancelled && setError(error);
    }


  };



  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      // console.log(user.uid);
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      // console.log(docUser.data());
      !isCancelled && setResponse({ ...docUser.data(), id: user.uid });
    } catch (error) {
      !isCancelled && setError(error);
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signIn, login, response, error };
};
