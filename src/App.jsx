import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DefaultHome from "./components/Layout/Default/DefaultHome";
import Footer from "./components/Layout/Footer";
import UserLayout from "./components/Layout/User/UserLayout";
import DefaultLayout from "./components/Layout/Default/DefaultLayout";
import LoginLayout from "./components/Layout/Login/LoginLayout";
import HomeUser from "./components/Layout/User/UserHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/home" element={<HomeUser />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route path="/" element={<DefaultHome />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
