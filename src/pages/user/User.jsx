import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
    const [user, setUser] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const token = localStorage.getItem('authToken');
    const api = `${import.meta.env.VITE_BASE_URL_API}/api/user`;
    const getUser = async (url = api) => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.user.data);
            setUser(res.data.user.data);
            setNextPage(res.data.user.next_page_url);
            setPrevPage(res.data.user.prev_page_url);
        } catch (error) {
            console.log([error.response?.status, error.message]);
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <Main>
                <div className="flex justify-between">
                    <h1 className="text-lg">Users</h1>
                    <Link to="/user/create" className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 transition">
                        + Create
                    </Link>
                </div>
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
                                <tr className="hover:bg-stone-100 transition">
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
                                        <Link to="/user/assignpermission">
                                            <i className="fa-solid fa-key text-md"></i>
                                        </Link>
                                        <Link to={`/user/assignrole/${user.id}`}>
                                            <i className="fa-solid fa-user-shield text-md"></i>
                                        </Link>
                                        <Link to={`/user/edit/${user.id}`}>
                                            <i className="fa-solid fa-pen-to-square text-md"></i>
                                        </Link>
                                        <Link to="/user/delete">
                                            <i className="fa-solid fa-trash text-md"></i>
                                        </Link>
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
            </Main>
        </>
    );
}
