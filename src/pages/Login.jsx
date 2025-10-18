import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

const handleLoginButton = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem("authToken", data.token);
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        } else {
            toast.error(data.message);
        }
    } catch (err) {
        toast.error("Something went wrong!");
        console.error("Error:", err);
    }
};

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-sm bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl  font-bold text-center text-blue-500 mb-6">Login</h1>
                <div className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 focus:border-blue-500">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" 
                        className="w-full px-4 py-2 border text-sm border-blue-500  rounded-md focus:ring-stone-400 focus:outline-none" />
                    </div>
                  <div className="relative">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Enter your password" 
                        className="w-full px-4 py-2 text-sm border border-blue-500 rounded-md focus:ring-stone-400 focus:outline-none"/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-stone-500 hover:text-stone-700" > 
                            <i className={`fa-solid cursor-pointer  ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                    </div>

                    <button type="submit" onClick={() => handleLoginButton()} 
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm py-2.5 rounded-lg transition cursor-pointer"> Login</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
