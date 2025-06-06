'use client'
import React, { useState } from 'react';
import { Film, Search, ChevronDown, Moon } from "lucide-react";

const Header = () => {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  
  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
    'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
    'Film-Noir', 'Game-Show', 'History', 'Horror', 'Music',
    'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance',
    'Sci-Fi', 'Short', 'Sport', 'Talk-Show', 'Thriller',
    'War', 'Western'
  ];

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const handleGenreSelect = (genre) => {
    console.log('Selected genre:', genre);
    setIsGenreDropdownOpen(false);
  };

  return (
    <div className="w-full py-3 bg-white relative z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-indigo-700">
            <Film className="w-5 h-5" />
            <p className="text-base font-bold">Movie Z</p>
          </div>

          <div className="hidden md:flex gap-3 items-center">
            {/* Genre Dropdown */}
            <div className="relative">
              <button
                onClick={toggleGenreDropdown}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 `} />
                Genre
              </button>

              {isGenreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[570px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Genres</h3>
                    <p className="text-sm text-gray-600 mb-4">See lists of movies by genre</p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => handleGenreSelect(genre)}
                          className="flex items-center justify-between px-3 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors group"
                        >
                          <span className="text-gray-900 font-medium">{genre}</span>
                          <svg 
                            className="w-3 h-3 text-gray-400 group-hover:text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
            <Moon className="w-4 h-4" />
          </button>
        </nav>
      </div>
      
      {isGenreDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsGenreDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;