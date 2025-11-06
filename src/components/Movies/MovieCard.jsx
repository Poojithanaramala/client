// src/components/Movies/MovieCard.jsx
import React from 'react';
import { Clock, Calendar, Star } from 'lucide-react';
import { formatDateShort } from '../../utils/helpers';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      {/* Movie Image */}
      <div className="relative h-80 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 overflow-hidden">
        {movie.image ? (
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-white opacity-50">🎬</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full flex items-center space-x-1 font-bold shadow-lg">
          <Star className="w-4 h-4 fill-current" />
          <span>8.5</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize line-clamp-1">
          {movie.title}
        </h3>

        {/* Genre & Language */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
            {movie.genre.split(',')[0].trim()}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
            {movie.language}
          </span>
        </div>

        {/* Duration & Release Date */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{movie.duration} mins</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{formatDateShort(movie.releaseDate)}</span>
          </div>
        </div>

        {/* Book Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;