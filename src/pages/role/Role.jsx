import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";

export default function Role() {

    
    const roles = [
        {
            name : 'Abubakar',
            email : 'Abubakar192005@gmail.com'
        },
        {
            name : 'Aamir',
            email : 'Aamir@gmail.com'
        }
    ]
    
    return (
        <>
            <Main>  
                <div className="flex justify-between">
                    <h1 className="text-lg">
                        Users
                    </h1>
                    <Link to="/user/create" className="text-white bg-stone-800 hover:bg-stone-700 focus:ring-4 focus:ring-stone-400 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 transition">
                        + Create
                    </Link>
                </div>
                <div>
                    <table className="w-full  border border-gray-200 shadow-md rounded-lg border-rounded">
                        <thead className="bg-stone-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Name</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {roles.map((role) => (
                            <tr className="hover:bg-gray-100 transition">
                                <td className="px-6 py-4  text-gray-700 text-xs ">{role.name}</td>
                                <td className="px-6 py-4 text-gray-700 flex space-x-3">
                                    <Link to="/user/assignpermission" >
                                        <i className="fa-solid fa-key text-md"></i>
                                    </Link>
                                    <Link to="/user/edit" >
                                        <i className="fa-solid fa-pen-to-square text-md"></i>
                                    </Link>
                                    <Link to="/user/delete" >
                                        <i className="fa-solid fa-trash text-md"></i>
                                    </Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Main>
        </>
    );
}
