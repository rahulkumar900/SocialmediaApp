import React, { createContext, useEffect, useReducer } from "react";

// Initial state for the context
const initialState = {
  Iuser: null,
};

// Create the context
export const AuthContext = createContext();

// Create a provider for the context
export const AuthContextProvider = ({ children }) => {
  // Define a reducer function to handle state updates
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        return {
          ...state,

          Iuser: action.payload,
          token: action.payload.token,
        };
      case "LOGOUT":
        localStorage.clear();
        sessionStorage.clear();
        return {
          ...state,

          Iuser: null,
        };
      default:
        return state;
    }
  };
  useEffect(() => {
    const isAuthenticated = (function () {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${"t"}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    })();

    const user = JSON.parse(localStorage.getItem("user"));
  });
  // Use the reducer function with useReducer to manage state updates
  const [state, dispatch] = useReducer(reducer, initialState);

  // Return the provider, which will provide the state and dispatch function to the context consumers
  return (
    <AuthContext.Provider value={{ state, dispatch, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
