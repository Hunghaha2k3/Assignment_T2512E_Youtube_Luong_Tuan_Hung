import React from 'react';
import { X } from 'lucide-react';

const VideoModal = ({ video, onClose }) => {
    if (!video) return null;

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
            <div className="relative bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
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
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{video.snippet.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{video.snippet.channelTitle}</p>
                    <p className="text-gray-700 line-clamp-3">{video.snippet.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;