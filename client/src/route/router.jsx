import { createBrowserRouter } from "react-router-dom";
import Root from "../components/root";
import Error from "../pages/error-page";
import Users, { loader as UserLoader } from "../pages/all-users";
import Signup from "../pages/signup";
import Profile, { loader as ProfileLoader } from "../pages/profile";
import ProfileUpdate from "../pages/profile-update";
import SigninPage from "../pages/signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "users",
        element: <Users />,
        loader: UserLoader,
      },
      {
        path: "users/:userId",
        element: <Profile />,
        loader: ProfileLoader,
      },
      {
        path: "users/:userId/edit",
        element: <ProfileUpdate />,
        loader: ProfileLoader,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: "signin",
    element: <SigninPage />,
    errorElement: <Error />,
    loader: UserLoader,
  },
]);

export default router;
