import Nav from "../src/components/Nav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Layout;
