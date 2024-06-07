import { Outlet } from "react-router-dom";

import HeaderUser from "./UserHeader";

const UserLayout = () => {
  return (
    <div>
      <HeaderUser />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
