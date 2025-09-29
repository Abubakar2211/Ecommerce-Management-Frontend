export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-stone-800 mb-6">Login</h1>

                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
