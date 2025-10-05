import { toast } from "react-toastify";
import Api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logoutButton = async () => {
    try {
      const res = await Api().post("/logout");
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <nav className="h-12 bg-stone-800 border-b shadow flex items-center justify-between px-6 sticky top-0 z-30">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 w-100 border rounded-lg focus:outline-none focus:ring-2 border-white text-white text-sm"
      />
      <button
        onClick={logoutButton}
        className="px-4 py-1 bg-white-500 text-white text-xs hover:bg-stone-700 hover:py-2 hover:rounded "
      >
        Logout
      </button>
    </nav>
  );
}
