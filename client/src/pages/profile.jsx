import { Link, useLoaderData } from "react-router-dom";
import { read } from "../api/user-api";
export async function loader({ params }) {
  return read(params);
}
export default function Profile() {
  const profile = useLoaderData();
  console.log(profile);

  return (
    <>
      <div className="relative mt-8 h-96 bg-gray-300">
        <div className="absolute w-full h-full bg-blue-500">
          <img
            className="relative w-full h-full object-cover object-center"
            src="https://source.unsplash.com/random/"
            alt=""
          />
        </div>
        <div className="absolute -bottom-20 flex justify-center w-full h-auto   ">
          <img
            src="https://cdn.dribbble.com/users/1176657/screenshots/15468294/media/34af996ddff444391edab94abcf3c7f3.png"
            className="relative w-40 h-40 object-cover object-center rounded-full"
            alt=""
          />
        </div>
      </div>
      <div className="mt-20 gap-4 flex flex-col w-full h-auto items-center">
        <div className="font-bold  text-2xl text-center">{profile.name}</div>

        <div>
          <Link
            to={`/users/${profile._id}/edit`}
            className="bg-indigo-500  px-4 font-semibold font-md text-white text-center py-2 rounded-md"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div>
        <div className="info"></div>
        <div className=""></div>
      </div>
    </>
  );
}
