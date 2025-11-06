// src/components/Booking/CinemaSelection.jsx
import React from 'react';
import { MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const CinemaSelection = ({ cinemas, selectedCinema, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Select Cinema</h3>
      
      {cinemas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No cinemas available for this movie</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cinemas.map((cinema) => (
            <div
              key={cinema._id}
              onClick={() => onSelect(cinema)}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedCinema?._id === cinema._id
                  ? 'border-purple-600 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:shadow'
              }`}
            >
              <h4 className="font-bold text-lg text-gray-900 mb-2 capitalize">
                {cinema.name}
              </h4>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="capitalize">{cinema.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-bold text-lg">
                  {formatCurrency(cinema.ticketPrice)}
                </span>
                <span className="text-xs text-gray-500">
                  {cinema.seatsAvailable} seats
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CinemaSelection;