import { useState } from "react";
import Main from "../../components/layout/Main";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function UserCreate() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState([]);
    const [permission, setPermission] = useState([]);
    const api = `${import.meta.env.VITE_BASE_URL_API}/api/user`;
    const token = localStorage.getItem('authToken');
    const getRoles = async () => {
        try {
            const res = await axios.post(api, { name, email, password, password_confirmation: confirmPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(res.data.message || "User created successfully!");
        } catch (err) {
            console.log("Error".err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    const handleUserCreate = (e) => {
        e.preventDefault();
        getRoles();
        console.log({ "Name": name, "Email": email, "Password": password, "Confirm Password": confirmPassword, "Role": role, "Permission": permission });
        setName(""), setEmail(""), setPassword(""), setRole(""), setPermission("")
    }

    // const roles = [
    //     { value: "Admin", label: "Admin" },
    //     { value: "Agent", label: "Agent" },
    //     { value: "User", label: "User" },
    //     { value: "Superadmin", label: "Superadmin" },
    // ];

    // const permissions = [
    //     { value: "Create admin", label: "Create admin" },
    //     { value: "Edit admin", label: "Edit admin" },
    //     { value: "Delete admin", label: "Delete admin" },
    //     { value: "View admin", label: "View admin" },
    // ];

    return (
        <Main>
            {/* White card */}
            <div className=" bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Create User</h2>
                <form className="space-y-4" onSubmit={handleUserCreate}>
                    {/* Name */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="name">Full Name</label>
                        <input type="text" value={name} id="name" name="name" onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter full name" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="email">Email</label>
                        <input type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter email address" />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="password">Password</label>
                        <input type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter password" />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" value={confirmPassword} id="confirm_password" name="password_confirmation" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter confirm password" />
                    </div>

                    {/* Role */}
                    {/* <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="role">Role</label>
                        <Select options={roles} isMulti value={role} onChange={(selected) => setRole(selected)} placeholder="Search or select..." />
                    </div> */}

                    {/* Permissions */}
                    {/* <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="permissions">Permissions</label>
                        <Select options={permissions} isMulti value={permission} onChange={(selected) => setPermission(selected)} placeholder="Search or select..." />
                    </div> */}

                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"> Create User</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Main>
    );
}
