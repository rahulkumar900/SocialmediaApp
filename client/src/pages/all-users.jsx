import { Link, useLoaderData } from "react-router-dom";
import { list as getUsers } from "../api/user-api";

export async function loader() {
  const users = await getUsers();
  return { users };
}
export default function Users() {
  const { users } = useLoaderData();
  console.log(users);
  return (
    <div className="my-4 md:max-w-md">
      <div className="px-2 font-bold text-lg">All Users</div>
      <ul className=" divide-y">
        {users ? (
          users.map((user) => (
            <li key={user._id} className=" flex items-center gap-2 px-2 py-3 ">
              <img
                src={`https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png`}
                alt="Profile"
                className="w-16 h-16"
              />
              <div>
                <div className="font-semibold">
                  <Link to={user._id}> {user.name} </Link>
                </div>
                <address>{user.email}</address>
              </div>
            </li>
          ))
        ) : (
          <div className="border flex items-center gap-2 px-2 py-3">
            User Not Found 😥😴
          </div>
        )}
      </ul>
    </div>
  );
}
