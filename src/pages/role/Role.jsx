import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";

export default function Role() {
    return (
        <>
            <Main>
                <div className="flex justify-between">
                    <h1 className="text-2xl">
                        Roles
                    </h1>
                    <Link to="/user/create" className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition">
                        + Create
                    </Link>
                </div>
                <div>
                    <table className="w-full  border border-gray-200 shadow-md rounded-lg border-rounded">
                        <thead className="bg-stone-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-100 transition">
                                <td className="px-6 py-4  text-gray-700 ">Admin</td>
                                <td className="px-6 py-4 text-gray-700 flex space-x-3">
                                    <Link to="/role/assignrolepermission" >
                                        <i className="fa-solid fa-list-check text-xl"></i>
                                    </Link>
                                    <Link to="/role/edit" >
                                        <i className="fa-solid fa-pen-to-square text-xl"></i>
                                    </Link>
                                    <Link to="/role/delete" >
                                        <i className="fa-solid fa-trash text-xl"></i>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Main>
        </>
    );
}
