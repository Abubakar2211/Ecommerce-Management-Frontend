import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Main({children}) {
    return <>
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-50 min-h-screen">
                <Navbar />
                <div className="p-6 flex-1">{children}</div>
                <Footer />
            </div>
        </div>
    </>
}