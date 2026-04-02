import Login from "./Register";
import {useState} from "react";

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div>
            {/* 🔘 NÚT LOGIN — đặt ở vị trí bạn muốn */}
            <div className="p-4 flex justify-end" style={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 9999
            }}>
                <button
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-900" style={{
                    background: "red",
                    color: "white",
                    padding: "10px"
                }}
                >
                    Login
                </button>
            </div>
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </div>
    );
}

export default App;