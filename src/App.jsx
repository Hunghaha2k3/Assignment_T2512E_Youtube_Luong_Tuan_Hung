import React, { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import youtube from './api/youtube';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import Register from "./Register";
import Login from "./Login";
import './App.css'


function App() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('SQL Server Management Studio Tutorial'); // Tìm mặc định
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);//Thêm Register
    const [isLoginOpen, setIsLoginOpen] = useState(false);//Thêm Login
    const [currentUser, setCurrentUser] = useState(null); // lưu object user
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // popup menu khi click username

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("current_user") || "null");
        if (savedUser) setCurrentUser(savedUser);
    }, []);

    // Lưu token phân trang
    const [nextPageToken, setNextPageToken] = useState(null);
    const [prevPageToken, setPrevPageToken] = useState(null);

    // Hàm gọi API
    const fetchVideos = async (query, pageToken = '') => {
        setLoading(true);
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: query,
                    pageToken: pageToken
                }
            });
            setVideos(response.data.items);
            setNextPageToken(response.data.nextPageToken || null);
            setPrevPageToken(response.data.prevPageToken || null);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        } finally {
            setLoading(false);
        }
    };

    // Chạy lần đầu khi load trang
    useEffect(() => {
        fetchVideos(searchTerm);
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
        fetchVideos(term);
    };

    const handlePageChange = (direction) => {
        const token = direction === 'next' ? nextPageToken : prevPageToken;
        if (token) {
            fetchVideos(searchTerm, token);
            window.scrollTo(0, 0); // Cuộn lên đầu trang khi qua trang mới
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <nav className="bg-white shadow-sm py-4 sticky top-0 z-40 flex justify-between items-center px-4 sm:px-6">
                <h1 className="text-2xl font-bold text-red-600">HungSearch.com</h1>
                <div className="flex items-center gap-2">
                    {!currentUser ? (
                        <>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="bg-white text-gray-800 border border-gray-300 px-4 py-2 sm:px-5 rounded-xl text-sm sm:text-base font-medium shadow-sm hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="bg-red-600 text-white px-4 py-2 sm:px-5 rounded-xl text-sm sm:text-base font-medium shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                {currentUser.username || currentUser.email}
                            </button>

                            {/* Popup menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded-lg z-50">
                                    <button
                                        onClick={() => {
                                            setCurrentUser(null); // Đăng xuất
                                            localStorage.removeItem("current_user"); // Xóa LocalStorage
                                            setIsUserMenuOpen(false); //Đóng cửa sổ Pop up
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-red-100 rounded-t-lg transition"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <div className="flex justify-center my-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                </div>
            ) : (
                <VideoList
                    videos={videos}
                    onVideoSelect={(video) => setSelectedVideo(video)}
                    onPageChange={handlePageChange}
                    hasNextPage={!!nextPageToken}
                    hasPrevPage={!!prevPageToken}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                />
            )}

            {/* Modal hiển thị khi có video được chọn */}
            <VideoModal
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />

            {/*Hiển thị cửa sổ Login khi nhấn vào nút Login*/}
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(user) => setCurrentUser(user)}
            />

            {/*Hiển thị cửa sổ Register khi nhấn vào nút Register*/}
            <Register
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </div>
    );
}

export default App;
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>
//
//       <div className="ticks"></div>
//
//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>
//
//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }
//
// export default App
