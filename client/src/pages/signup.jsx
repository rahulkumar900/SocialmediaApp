import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { create } from "../api/user-api";

export default function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    open: false,
    error: "",
  });

  const handleSubmit = () => {
    const user = {
      name: value.name || undefined,
      email: value.email || undefined,
      password: value.password || undefined,
    };
    create(user).then((data) => {
      if (!data.error) {
        setValue({ ...value, open: true });
      } else {
        setValue({ ...value, error: data.error });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };

  return (
    <div className="w-full max-w-sm mx-auto pt-40">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            name="name"
            placeholder="Username"
            onChange={handleChange("name")}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="Email"
            name="email"
            placeholder="Email Address"
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
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            onChange={handleChange("password")}
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Signup
          </button>

          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
      {value.open && (
        <div className="border px-8 mt-4 py-4 text-green-500 border-green-500">
          ✔️ Account created successfully.<Link to="/signin">Login➡️</Link>
        </div>
      )}
    </div>
  );
}
