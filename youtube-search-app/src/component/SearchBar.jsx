import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-8">
            <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Tìm kiếm video trên YouTube..."
                    className="w-full px-5 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-4 text-gray-400" size={20} />
                <button
                    type="submit"
                    className="ml-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                    Tìm
                </button>
            </form>
        </div>
    );
};

export default SearchBar;