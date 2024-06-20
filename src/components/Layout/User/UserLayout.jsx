import { Outlet } from "react-router-dom";

import HeaderUser from "./UserHeader";
import Footer from "../Footer";

const UserLayout = () => {
  return (
    <div>
      <HeaderUser />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
