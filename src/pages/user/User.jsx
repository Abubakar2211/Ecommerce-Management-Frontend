import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import { useEffect, useState } from "react";

export default function User() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL_API}/api/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                "Contect-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUser(data.user.data || [])
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <>
            <Main>
                <div className="flex justify-between">
                    <h1 className="text-lg">Users</h1>
                    <Link
                        to="/user/create"
                        className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 transition"
                    >
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
                                        <Link to="/user/assignrole">
                                            <i className="fa-solid fa-user-shield text-md"></i>
                                        </Link>
                                        <Link to="/user/edit">
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
                        <nav aria-label="Page navigation">
                            <ul className="inline-flex -space-x-px text-xs">
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-stone-800 border border-stone-700 rounded-l-lg hover:bg-stone-700 hover:text-white transition"> Previous</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 hover:text-stone-800 transition"> 1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 hover:text-stone-800 transition"> 2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-white bg-stone-800 border border-stone-700 hover:bg-stone-700 hover:text-white transition"> 3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-stone-800 border border-stone-700 rounded-r-lg hover:bg-stone-700 hover:text-white transition"> Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Main>
        </>
    );
}
