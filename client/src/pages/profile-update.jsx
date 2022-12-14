import { useState } from "react";
import { Form, Link, useLoaderData, Navigate } from "react-router-dom";
import { update } from "../api/user-api";

export default function ProfileUpdate() {
  const user = useLoaderData();
  console.log(user);

  const [value, setValue] = useState({
    name: "",
    open: false,
    error: "",
  });

  const handleSubmit = () => {
    const data = {
      name: value.name || undefined,
    };
    update(data, user._id).then((res) => {
      if (res && !res.error) {
        setValue({ ...value, open: true });
      } else {
        setValue({ ...value, error: res.error });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };

  if (value.open) {
    return <Navigate to={`/users/${user._id}`} replace={true} />;
  }

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

        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Update
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
      {value.open && (
        <div className="border px-8 mt-4 py-4 text-green-500 border-green-500">
          ✔️ Account Updated successfully.<Link to="/signin">Login➡️</Link>
        </div>
      )}
    </div>
  );
}
