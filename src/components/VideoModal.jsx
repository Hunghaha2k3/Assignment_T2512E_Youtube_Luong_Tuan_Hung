import React, { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';

const VideoModal = ({ video, onClose, currentUser, setCurrentUser }) => {
    if (!video) return null;

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

    const [isFavorited, setIsFavorited] = useState(false);

    // Kiểm tra nếu video đang được yêu thích
    useEffect(() => {
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem("youtube_app_users") || "[]");
            const user = users.find(u => u.email === currentUser.email);
            if (user) {
                const favorited = user.favorites?.some(fav => fav.id.videoId === video.id.videoId);
                setIsFavorited(favorited);
            }
        }
    }, [video, currentUser]);

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // tránh click modal đóng

        if (!currentUser) {
            alert('Bạn cần đăng nhập để thêm vào yêu thích!');
            return;
        }

        const users = JSON.parse(localStorage.getItem("youtube_app_users") || "[]");
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex === -1) return;

        const user = users[userIndex];

        // Toggle favorite
        if (isFavorited) {
            user.favorites = user.favorites.filter(fav => fav.id.videoId !== video.id.videoId);
        } else {
            user.favorites.push(video);
        }

        // Lưu lại localStorage
        users[userIndex] = user;
        localStorage.setItem("youtube_app_users", JSON.stringify(users));

        // Cập nhật state
        setCurrentUser(user);
        setIsFavorited(!isFavorited);
    };

    // Đóng bằng phím Esc
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl"
            >
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
                >
                    <X size={24} />
                </button>

                {/* Video Player */}
                <div className="aspect-video">
                    <iframe
                        src={videoSrc}
                        title={video.snippet.title}
                        className="w-full h-full"
                        allowFullScreen
                        allow="autoplay"
                    />
                </div>

                {/* Thông tin video */}
                <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{video.snippet.title}</h2>
                        <button
                            onClick={handleFavoriteClick}
                            className="p-1 rounded-full hover:bg-gray-100 transition"
                        >
                            <Heart
                                color={isFavorited ? "red" : "gray"}
                                fill={isFavorited ? "red" : "none"}
                                size={24}
                            />
                        </button>
                    </div>

                    <p className="text-gray-600 text-sm">{video.snippet.channelTitle}</p>
                    <p className="text-gray-700 line-clamp-3">{video.snippet.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;