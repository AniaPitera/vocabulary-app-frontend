import { Outlet } from "react-router-dom";

import HeaderLogin from "./LoginHeader";

const LoginLayout = () => {
  return (
    <div>
      <HeaderLogin />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LoginLayout;