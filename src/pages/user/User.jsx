import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../utils/api";
import Spinner from "../../components/Spinner";

export default function User() {
    const [user, setUser] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [passwordChange, setPasswordChange] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const getUser = async (url = "/user") => {
        try {
            setLoading(true);
            const res = await Api().get(url);
            setUser(res.data.user.data);
            setNextPage(res.data.user.next_page_url);
            setPrevPage(res.data.user.prev_page_url);
            setLoading(false);
        } catch (error) {
            console.log([error.response?.status, error.message]);
        }
    }

    const handleDeleteUser = async (id) => {
        try{
            setLoading(true);
            const res = await Api().delete(`/user/${id}`);
            res.data.message ? toast.success(res.data.message) :  toast.error(res.data.error)
            setLoading(false);
            getUser();
        }catch(err){
            console.log("Error:",err.response?.data || err.message); 
            toast.error(err.response?.data?.message || "Something went wrong!") 
        }
    }

    const newpasswordChange = async (e) => {
        e.preventDefault();
        const userId = selectedUser.id;
        console.log({"User Id": userId,"Password" : password,"Confirm Password" : confirmPassword});
        try{
            const res = await Api().post(`/changePassword/${userId}`,{password,confirmPassword});
            console.log({"Message":res.data.message});
            if(res.data.message){
                toast.success(res.data.message);
                setPasswordChange(false);
                setPassword("");
                setConfirmPassword("");
            }else{
                toast.error(res.data.error)
            }
        }catch(err){
            console.log("Error:",err.response?.data || err.message); 
            toast.error(err.response?.data?.message || "Something went wrong!") 
            
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            {passwordChange && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                            <h2 className="font-semibold mb-4 border-b border-stone-800 text-md pb-1">{selectedUser.name} Change Password</h2>
                            <form onSubmit={newpasswordChange}>
                                <input type="hidden" value={selectedUser.id} name="userId" onChange={(e)=>setUserId(e.target.value)}/>
                                <div>
                                    <label className="block text-stone-700 mb-1 text-sm" htmlFor="name">New Password</label>
                                    <input type="text" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 mb-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter new password" />
                                </div>
                                <div>
                                    <label className="block text-stone-700 mb-1 text-sm" htmlFor="name">Confirm Password</label>
                                    <input type="text" id="confirmPassword" name="confirmPassword"  onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 mb-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter confirm pasword" />
                                </div>
                                <div className="border-t border-stone-800 mt-4 gap-1 flex justify-between">
                                    <button onClick={()=>setPasswordChange(false)} className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 cursor-pointer mt-2 text-sm">Cancel</button>
                                    <button className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-white-700 cursor-pointer mt-2 text-sm">Submit</button>
                                </div>
                            </form>
                        </div>
                </div>
            )}
            <Main>
                <div className="flex justify-between">
                    <h1 className="text-lg">Users</h1>
                    <Link to="/user/create" className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 transition">
                        + Create
                    </Link>
                </div>
               {loading ? ( <Spinner/> )  :(
                <div>
                    <table className="w-full  border border-stone-200 shadow-md rounded-lg border-rounded">
                        <thead className="bg-stone-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {user.map((user, index) => (
                                <tr key={user.id || index} className="hover:bg-stone-100 transition">
                                    <td className="px-6 py-4  text-stone-700 text-xs ">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4  text-stone-700 text-xs ">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4  text-stone-700 text-xs">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-stone-700 flex space-x-3">
                                        <div onClick={() => {setPasswordChange(true); setSelectedUser(user)}} className="cursor-pointer">
                                            <i className="fa-solid fa-key text-md"></i>
                                        </div>
                                        <Link to="/user/assignpermission">
                                            <i className="fa-solid fa-user-lock text-md"></i>
                                        </Link>
                                        <Link to={`/user/assignrole/${user.id}`}>
                                            <i className="fa-solid fa-user-shield text-md"></i>
                                        </Link>
                                        <Link to={`/user/edit/${user.id}`} state={{ user }}>
                                            <i className="fa-solid fa-pen-to-square text-md"></i>
                                        </Link>
                                        <div className="cursor-pointer" onClick={() => handleDeleteUser(user.id)}>
                                            <i className="fa-solid fa-trash text-md"></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-3">
                        <nav>
                            <ul className="inline-flex text-sm gap-0.5">
                                <li>
                                    <button onClick={()=>prevPage && getUser(prevPage)} disabled={!prevPage} className={`px-3 rounded-l-lg h-8 ${prevPage ? "bg-stone-800 text-white hover:bg-stone-700" : "bg-stone-300 text-stone-500 cursor-not-allowed"}`}>Previous</button>
                                </li>
                                <li>
                                    <button onClick={()=>nextPage && getUser(nextPage)} disabled={!nextPage} className={`px-3 rounded-r-lg h-8 ${nextPage ? "bg-stone-800 text-white hover:bg-stone-700" : "bg-stone-300 text-stone-500 cursor-not-allowed"}`}                                  >Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
               )}
                <ToastContainer />
            </Main>
        </>
    );
}
