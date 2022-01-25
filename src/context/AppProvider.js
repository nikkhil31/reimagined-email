import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

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

  onAuthStateChanged(auth, (user) => {});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload:  user});
    });

    return unsub;
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
