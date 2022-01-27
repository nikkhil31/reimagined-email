import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth, db } from "../firebase/config";
import { isEmpty } from "../helper/check";

const AppContext = createContext();

export function useAppcontext() {
  return useContext(AppContext);
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case "COMPOSE":
      return { ...state, compose: action.payload };
    case "LIST":
      return { ...state, list: action.payload };
    case "DETAILS":
      return { ...state, details: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    list: [],
    details: {
      id: null,
      subject: "",
      messages: [],
    },
    compose: 0,
    user: {},
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      let usr = {}
      // console.log('abc', user.uid);
      if (!isEmpty(user)) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        usr = { ...docSnap.data(), id: docSnap.id }
        // console.log('context', usr)
      }
      console.log(usr);
      dispatch({ type: "AUTH_IS_READY", payload: usr });
    });

    return unsub;
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
