import { Outlet } from "react-router-dom";

import HeaderLogin from "./LoginHeader";
import Footer from "../Footer";

const LoginLayout = () => {
  return (
    <div>
      <HeaderLogin />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LoginLayout;