import Main from "../../components/layout/Main";

export default function UserCreate() {
    return (
        <Main>
            {/* White card */}
            <div className=" bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Create User</h2>
                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter full name"/>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter email address"/>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500" placeholder="Enter password"/>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="role">Role</label>
                        <select id="role" className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500">
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className="block text-stone-700 mb-1 text-sm" htmlFor="permissions">Permissions</label>
                        <select id="permissions" className="w-full px-4 py-2 rounded-lg text-sm mt-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500">
                            <option value="">Select permissions</option>
                            <option value="create permission">Create Permission</option>
                            <option value="edit permission">Edit Permission</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"> Create User</button>
                    </div>
                </form>
            </div>
        </Main>
    );
}
