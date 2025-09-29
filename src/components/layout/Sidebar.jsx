import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 bg-stone-800"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <h1 className="items-center p-2 text-white text-lg">Ecommerce Management</h1>
                <hr className=" text-white my-2" />
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/dashboard" className="flex items-center p-2 text-white rounded-lg hover:bg-stone-700 group">
                            <i className="fa-solid fa-house"></i>
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className="flex items-center p-2 text-white rounded-lg hover:bg-stone-700 group">
                            <i className="fa-solid fa-users"></i>
                            <span className="ms-3">Users</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
