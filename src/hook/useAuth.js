import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

export const useAuth = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const signIn = async ({ email, password }) => {
      
      try {  
        const user = await createUserWithEmailAndPassword(auth, email, password)

        if (!user) {
            throw new Error('Could not complete signup')
        }

        setResponse(user);
    } catch (error) {
        setError(error);
    }

      
  };

  return { signIn, response, error };
};
