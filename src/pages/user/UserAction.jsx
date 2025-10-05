import { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../utils/api";
import { Link, useLocation, useParams } from "react-router-dom";
export default function UserAction() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const userData = location.state?.user;

    useEffect(()=>{
        console.log("User Data:", userData);
    },[])
    const getRoles = async () => {
        try {
            const res = await Api().post('/user', { name, email, password, password_confirmation: confirmPassword });
            res.data.message ? toast.success(res.data.message) : toast.error(res.data.error)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    const handleUserCreate = (e) => {
        e.preventDefault();
        getRoles();
        setName(""), setEmail(""), setPassword(""), setConfirmPassword("")
    }

    return (
        <Main>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">{userData ? 'Update User' : 'Create User'}</h2>
                    <div>
                        <Link to={"/users"} className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 transition">Back</Link>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={handleUserCreate}>
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="name">Full Name</label>
                        <input type="text" value={userData?.name || name} id="name" name="name" onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter full name" />
                    </div>
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="email">Email</label>
                        <input type="email" value={userData?.email || email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter email address" />
                    </div>
                    {!userData && ( 
                        <>
                            <div>
                                <label className="block text-stone-700 mb-1 text-sm" htmlFor="password">Password</label>
                                <input type="password" value={userData?.password || password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter password" />
                            </div>
                            <div>
                                <label className="block text-stone-700 mb-1 text-sm" htmlFor="confirm_password">Confirm Password</label>
                                <input type="password" value={userData?.confirmPassword || confirmPassword} id="confirm_password" name="password_confirmation" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter confirm password" />
                            </div>
                        </>
                    )}
                    <div>
                        <button type="submit" className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">{userData ? 'Update User' : 'Create User'}</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}
