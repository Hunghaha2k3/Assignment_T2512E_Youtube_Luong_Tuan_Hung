import React, { useState, useEffect } from 'react';
import { Heart } from "lucide-react";

const VideoCard = ({ video, onVideoSelect, currentUser, setCurrentUser }) => {
    const { snippet } = video;

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
        e.stopPropagation(); // tránh trigger onVideoSelect

        if (!currentUser) {
            alert("This feature is available for users who has Logged In!");
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

    return (
        <div
            onClick={() => onVideoSelect(video)}
            className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video">
                <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Nút Yêu thích */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:shadow-md transition"
                >
                    <Heart
                        color={isFavorited ? "red" : "gray"}
                        fill={isFavorited ? "red" : "none"}
                        size={24}
                    />
                </button>
            </div>

            {/* Video Info */}
            <div className="p-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
                    {snippet.title}
                </h3>
                <p className="text-sm text-gray-600">{snippet.channelTitle}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;