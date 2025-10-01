import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLoginButton = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            console.log("Api Response : ", data);
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        } catch (err) {
            console.error("Error".err.response?.data || err.message);
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-stone-800 mb-6">Login</h1>
                <div className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none" />
                    </div>
                    <button type="submit" onClick={() => handleLoginButton()} className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-2.5 rounded-lg transition"> Login</button>
                </div>
            </div>
        </div>
    );
}
