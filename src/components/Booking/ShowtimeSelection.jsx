// src/components/Booking/ShowtimeSelection.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const ShowtimeSelection = ({ showtimes, selectedShowtime, onSelect }) => {
  if (showtimes.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Select Showtime</h3>
      
      {showtimes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No showtimes available for this cinema</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {showtimes.map((showtime) => (
            <button
              key={showtime._id}
              onClick={() => onSelect(showtime)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                selectedShowtime?._id === showtime._id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{showtime.startAt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowtimeSelection;