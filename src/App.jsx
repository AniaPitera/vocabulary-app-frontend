import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DefaultHome from "./components/Layout/Default/DefaultHome";
import CategoryList from "./components/Category/CategoryList";
import UserLayout from "./components/Layout/User/UserLayout";
import DefaultLayout from "./components/Layout/Default/DefaultLayout";
import LoginLayout from "./components/Layout/Login/LoginLayout";
import HomeUser from "./components/Layout/User/UserHome";
import AddCategory from "./components/Category/AddCategory";
import { AuthProvider } from "./components/Auth/AuthContext";
import WordList from "./components/Word/WordList";
import NotFound from "./components/NotFound";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes>
                {" "}
                <UserLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/home" element={<HomeUser />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/:id" element={<WordList />} />
          </Route>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<DefaultHome />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
