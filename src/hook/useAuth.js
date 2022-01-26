import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/config";

export const useAuth = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState();

  const signIn = async ({ name, email, password }) => {

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      if (!user) {
        throw new Error('Could not complete signup')
      }

      const userData = {
        email_id: email,
        name: name
      }

      const refUser = doc(db, "users", user.uid);
      const userID = await addDoc(refUser, userData);

      setResponse({ ...userID.data(), id: user.uid });
    } catch (error) {
      setError(error);
    }


  };



  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      // console.log(user.uid);
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      // console.log(docUser.data());
      setResponse({ ...docUser.data(), id: user.uid });
    } catch (error) {
      setError(error);
    }
  }


  return { signIn, login, response, error };
};
