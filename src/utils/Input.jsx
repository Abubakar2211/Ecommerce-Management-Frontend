import { useState } from "react";
import I from "../utils/I";

export default function Input({ id, type, name, onChange, placeholder, value }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="relative w-full">
            <input type={isPassword && showPassword ? "text" : type} id={id} value={value} name={name} onChange={onChange}
                className="w-full px-3 py-2 text-xs rounded-lg mt-1 mb-1 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                placeholder={placeholder}
            />
            {isPassword && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer text-stone-500 hover:text-stone-700">
                    {showPassword ? <I value="fa-eye" className="xs"/> : <I value="fa-eye-slash" />}
                </button>
            )}
        </div>
    );
}
