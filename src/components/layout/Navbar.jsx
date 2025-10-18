import Api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false);

  const logoutButton = async () => {
    try {
      await Api().post("/logout");
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  const user = {
    name: "Abubakar Baig",
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30 flex items-center justify-between px-6 py-3">
      <div className="relative w-1/3 hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 transition"
        />
      </div>

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <i
            className="fa-solid fa-bell cursor-pointer hover:text-blue-500"
            onClick={() => setNotification(!notification)}
          ></i>

          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>

          {notification && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg py-2 px-3">
              <p className="text-xs text-gray-500 mb-1">No new notifications</p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setProfile(!profile)}
            className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer hover:text-blue-600 focus:outline-none"
          >
            <span className="text-xs">{user.name}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                profile ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {profile && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg py-2 px-3">
              <button className="w-full text-left px-4 py-2 rounded-md my-1 text-xs bg-gray-100 cursor-pointer text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <i className="fa-solid fa-user mr-1"></i> My Profile
              </button>
              <button
                onClick={logoutButton}
                className="w-full text-left px-4 py-2 rounded-md my-1 text-xs bg-gray-100 cursor-pointer text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <i className="fa-solid fa-right-from-bracket mr-1"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
