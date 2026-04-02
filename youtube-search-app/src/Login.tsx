import { useState } from "react";
import { loginUser } from "./utils/auth";

type LoginProps = {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: any) => void;
};

const Login = ({ isOpen, onClose, onLogin }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // ✅ Trim dữ liệu trước khi login
            loginUser(email.trim(), password.trim());

            const user = JSON.parse(localStorage.getItem("current_user") || "{}");

            onLogin(user);

            alert("Login successful!");

            // Reset input để lần sau mở lại form sẽ trống
            setEmail("");
            setPassword("");

            onClose();
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-90 z-50"
            // Nếu muốn click ra ngoài cũng đóng popup thì bỏ comment onClick
            // onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-xl w-96 shadow-lg relative"
                // Ngăn click vào popup bị đóng
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                        Login
                    </button>

                    {/* Optional Close button dưới */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-white text-red-600 border border-red-200 py-2.5 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;