import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  const location = useLocation(); 
  const currentPath = location.pathname;

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-50 h-screen transition-transform sm:translate-x-0 bg-gray-50"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <img src={logo} alt="Logo" />
        <ul className="space-y-2 font-medium mt-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-2 py-3 rounded-md transition-all duration-300 ease-in-out ${
                currentPath === "/dashboard"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-house text-sm"></i>
              <span className="ms-3 text-xs">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/user"
              className={`flex items-center px-2 py-3 rounded-md transition-all duration-300 ease-in-out ${
                currentPath === "/user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-users text-sm"></i>
              <span className="ms-3 text-xs">Users</span>
            </Link>
          </li>

          <li>
            <Link
              to="/role"
              className={`flex items-center px-2 py-3 rounded-md transition-all duration-300 ease-in-out ${
                currentPath === "/role"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-user-shield text-sm"></i>
              <span className="ms-3 text-xs">Roles</span>
            </Link>
          </li>

          <li>
            <Link
              to="/permission"
              className={`flex items-center px-2 py-3 rounded-md transition-all duration-300 ease-in-out ${
                currentPath === "/permission"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-key text-sm"></i>
              <span className="ms-3 text-xs">Permissions</span>
            </Link>
          </li>

          <li>
            <Link
              to="/order"
              className={`flex items-center px-2 py-3 rounded-md transition-all duration-300 ease-in-out ${
                currentPath === "/order"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {/* <i className="fa-solid fa-key text-sm"></i> */}
              {/* <i className="fa-solid fa-box text-sm"></i> */}
              <i className="fa-solid fa-list text-sm"></i>
              <span className="ms-3 text-xs">Order</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
