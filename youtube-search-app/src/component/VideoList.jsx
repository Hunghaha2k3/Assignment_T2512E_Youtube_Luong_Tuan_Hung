import React from 'react';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoList = ({ videos, onVideoSelect, onPageChange, hasNextPage, hasPrevPage }) => {
    return (
        <div className="container mx-auto px-4">
            {/* Grid danh sách video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id.videoId || video.id}
                        video={video}
                        onVideoSelect={onVideoSelect}
                    />
                ))}
            </div>

            {/* Phân trang đơn giản */}
            <div className="flex justify-center items-center space-x-4 my-10">
                <button
                    onClick={() => onPageChange('prev')}
                    disabled={!hasPrevPage}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    <ChevronLeft size={20} /> Trước
                </button>
                <button
                    onClick={() => onPageChange('next')}
                    disabled={!hasNextPage}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Sau <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default VideoList;