export default function Navbar() {
    return (
        <nav className="h-12 bg-stone-800 border-b shadow flex items-center justify-between px-6 sticky top-0 z-30">
            <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 border-white text-white text-sm"
            />
            <button className="px-4 py-1 bg-white-500 text-white text-xs hover:bg-stone-700 hover:py-2 hover:rounded ">
                Logout
            </button>
        </nav>
    );
}
