import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../auth-context";
export default function Home() {
  const { state, dispatch, isAuthenticated, user } = useContext(AuthContext);
  useEffect(() => {
    console.log(typeof user);
  }, []);
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
