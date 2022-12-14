import { Outlet, useLocation } from "react-router-dom";
import Nav from "./nav";
import Home from "./home";

export default function Root() {
  const path = useLocation();
  return (
    <>
      <Nav />
      <div className="max-w-7xl h-auto relative w-full mx-auto ">
        {path.pathname === "/" ? <Home /> : <Outlet />}
      </div>
    </>
  );
}
