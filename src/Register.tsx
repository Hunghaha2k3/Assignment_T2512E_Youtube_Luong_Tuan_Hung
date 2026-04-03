import {useState} from "react";
import { X } from "lucide-react";
import { registerUser } from "./utils/auth";

type LoginProps = {
    isOpen: boolean;
    onClose: () => void;
};

function Register({isOpen, onClose}: LoginProps) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
    });

    //Thông báo Validate
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (isSubmitted) {
            validate(); //Re-validate khi user sửa thông tin
        }
    };

    //Hàm Validate
    const validate = () => {
        let newErrors = {
            username: "",
            email: "",
            password: "",
            confirmPassword:"",
        };

        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = "Username is required.";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid Email!";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Please enter at least 6 characters!";
            isValid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match!";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!validate()) return;

        try {
            type RegisterFn = (username: string, email: string, password: string) => any;
            const register = registerUser as RegisterFn;
            register(formData.username, formData.email, formData.password);
            alert("Registered successfully!");

            // reset form
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            onClose();

        } catch (error: any) {
            alert(error.message);
        }
    };

    //Đăng nhập gọi API
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitted(true); //Đánh dấu đã submit
    //     if (!validate()) return;
    //     try {
    //         const response = await fetch("http://localhost:5000/register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(formData),
    //         });
    //
    //         const data = await response.json();
    //
    //         if (!response.ok) {
    //             throw new Error(data.message || "Register failed!");
    //         }
    //
    //         console.log("Response:", data);
    //         alert("Signed up Successfully");
    //         onClose();
    //
    //     } catch (error: any) {
    //         console.error("Error:", error);
    //         alert(error.message);
    //     }
    // };

    return (
        // 🔲 Overlay (nền tối)
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* 📦 Popup */}
            <div
                className="relative bg-white p-6 rounded-xl w-96 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">
                    Register Account
                </h2>

                {/* 🧾 Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <p>Username:</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full border p-2 rounded"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {isSubmitted && errors.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
                    )}

                    <p>Email:</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className="w-full border p-2 rounded"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {isSubmitted && errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}

                    <p>Password:</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Please enter at least 6 characters."
                        className="w-full border p-2 rounded"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {isSubmitted && errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}

                    <p>Confirm Password:</p>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        className="w-full border p-2 rounded"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2.5 rounded-xl text-sm sm:text-base font-medium shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                        Submit
                    </button>
                </form>

                {/* ❌ Nút đóng */}
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-white text-red-600 border border-red-200 py-2.5 rounded-xl text-sm sm:text-base font-medium shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Register;

// export default function Login() {
//     const [email,setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleLogin = async () => {
//         const res = await fetch ("http://localhost:3000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({email, password})
//         });
//         const data = await res.json();
//         localStorage.setItem("token", data.token);
//     };
//
//     return (
//         <div>
//             <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email"/>
//             <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password"/>
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// }