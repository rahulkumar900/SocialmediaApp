import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { signin } from "../api/auth-api";
import { AuthContext } from "../auth-context";

export default function SigninPage() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    redirect: false,
    error: "",
  });
  const { state, dispatch, isAuthenticated, user } = useContext(AuthContext);

  const handleChange = (name) => (e) => {
    setValue({ ...value, [name]: e.target.value });
  };

  const handleSubmit = () => {
    let user = {
      email: value.email || undefined,
      password: value.password || undefined,
    };

    signin({ user })
      .then((resJson) => {
        if (resJson) {
          console.log(resJson);
          setValue({ ...value, redirect: true, error: "" });
          dispatch({
            type: "LOGIN",
            payload: resJson,
          });
        } else {
          setValue({ ...value, redirect: false, error: res.error });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (value.redirect) return <Navigate to="/" replace="true" />;

  return (
    <div className="w-full max-w-sm mx-auto pt-40">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            required
            autoComplete="on"
            placeholder="Username"
            onChange={handleChange("email")}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            autoComplete="currentPassword"
            type="password"
            onChange={handleChange("password")}
            placeholder="******************"
            required
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
