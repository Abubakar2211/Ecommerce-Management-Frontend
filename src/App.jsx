import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Role from "./pages/role/Role";
import Permission from "./pages/permission/Permission";
import User from "./pages/user/User";
import UserAction from "./pages/user/UserAction";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleAction from "./pages/role/RoleAction";
import PermissionAction from "./pages/permission/PermissionAction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route  element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/create" element={<UserAction />} />
          <Route path="/user/edit/:id" element={<UserAction />} />
          <Route path="/role" element={<Role />} /> 
          <Route path="/role/create" element={<RoleAction />} /> 
          <Route path="/role/edit/:id" element={<RoleAction />} />
          <Route path="/permission" element={<Permission />} />
          <Route path="/permission/create" element={<PermissionAction />} /> 
          <Route path="/permission/edit:id" element={<PermissionAction />} /> 
        </Route >
      </Routes>
    </>
  );
}

export default App;
