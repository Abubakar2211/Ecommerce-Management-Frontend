import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Role from "./pages/role/Role";
import Permission from "./pages/permission/Permission";
import User from "./pages/user/User";
import UserCreate from "./pages/user/UserCreate";
import UserEdit from "./pages/user/UserEdit";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route  element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/permissions" element={<Permission />} />
        </Route >
      </Routes>
    </>
  );
}

export default App;
