// src/components/Booking/SeatSelection.jsx
import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const SeatSelection = ({ 
  cinema, 
  selectedSeats, 
  onSeatClick, 
  onBooking, 
  bookingLoading 
}) => {
  if (!cinema) return null;

  const totalAmount = selectedSeats.length * cinema.ticketPrice;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Select Seats</h3>
      
      {/* Screen */}
      <div className="mb-8 text-center">
        <div className="inline-block bg-gray-800 text-white px-12 py-3 rounded-t-2xl text-sm font-semibold">
          SCREEN
        </div>
      </div>

      {/* Seats */}
      <div className="flex flex-col items-center space-y-3 mb-8">
        {cinema.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-3">
            {row.map((seat, seatIndex) => {
              const seatId = `${seat.row}${seat.number}`;
              const isSelected = selectedSeats.includes(seatId);
              const isReserved = seat.status === 'reserved';

              return (
                <button
                  key={seatIndex}
                  onClick={() => onSeatClick(seat)}
                  disabled={isReserved}
                  className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                    isReserved
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : isSelected
                      ? 'bg-purple-600 text-white shadow-lg scale-110'
                      : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
                  }`}
                >
                  {seat.number}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-8 text-sm mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-600 rounded-lg"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-lg"></div>
          <span className="text-gray-600">Reserved</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <div className="border-t pt-6">
          <div className="bg-purple-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Selected Seats</p>
                <p className="font-bold text-gray-900">{selectedSeats.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Tickets</p>
                <p className="font-bold text-gray-900">{selectedSeats.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price per Ticket</p>
                <p className="font-bold text-gray-900">
                  {formatCurrency(cinema.ticketPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-bold text-purple-600 text-2xl">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onBooking}
            disabled={bookingLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;