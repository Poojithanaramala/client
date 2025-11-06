// src/components/Reservations/ReservationCard.jsx
import React from 'react';
import { Calendar, Clock, MapPin, Ticket, CheckCircle, XCircle, Download, QrCode } from 'lucide-react';
import { formatCurrency, formatDateShort } from '../../utils/helpers';

const ReservationCard = ({ reservation, onDownload, onCheckIn }) => {
  const isPast = new Date(reservation.date) < new Date();
  const isToday = new Date(reservation.date).toDateString() === new Date().toDateString();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Details */}
          <div className="flex-1">
            {/* Header with ID and Status */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Booking ID</p>
                <p className="font-mono text-xl font-bold text-gray-900">
                  #{reservation._id.slice(-8).toUpperCase()}
                </p>
              </div>
              
              <div>
                {reservation.checkin ? (
                  <span className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Checked In</span>
                  </span>
                ) : isPast ? (
                  <span className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>Expired</span>
                  </span>
                ) : isToday ? (
                  <span className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm animate-pulse">
                    <Clock className="w-4 h-4" />
                    <span>Today</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Upcoming</span>
                  </span>
                )}
              </div>
            </div>

            {/* Movie and Cinema Info */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {reservation.movieTitle || 'Movie Title'}
              </h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="capitalize">{reservation.cinemaName || 'Cinema Hall'}</span>
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="font-semibold text-gray-900">{formatDateShort(reservation.date)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                  <p className="font-semibold text-gray-900">{reservation.startAt}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Seats</p>
                  <p className="font-semibold text-gray-900">
                    {Array.isArray(reservation.seats) 
                      ? reservation.seats.join(', ')
                      : reservation.seats}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">
                    {Array.isArray(reservation.seats) ? reservation.seats.length : 1}x
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Tickets</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(reservation.ticketPrice)} each
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact Details</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Name: </span>
                  <span className="font-semibold text-gray-900 capitalize">{reservation.username}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone: </span>
                  <span className="font-semibold text-gray-900">{reservation.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Price & QR Code */}
          <div className="lg:w-64 flex flex-col items-center justify-between space-y-4 lg:border-l lg:pl-6">
            {/* Price Display */}
            <div className="text-center w-full">
              <p className="text-sm text-gray-500 mb-2">Total Amount</p>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6">
                <p className="text-4xl font-bold mb-1">
                  {formatCurrency(reservation.total)}
                </p>
                <p className="text-xs opacity-90">
                  {Array.isArray(reservation.seats) ? reservation.seats.length : 1} × {formatCurrency(reservation.ticketPrice)}
                </p>
              </div>
            </div>

            {/* QR Code */}
            {!isPast && !reservation.checkin && (
              <div className="w-full">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                  <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                    <QrCode className="w-20 h-20 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Scan at cinema entrance
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full space-y-2">
              {!isPast && !reservation.checkin && (
                <>
                  <button
                    onClick={() => onDownload && onDownload(reservation)}
                    className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Ticket</span>
                  </button>
                  
                  {isToday && onCheckIn && (
                    <button
                      onClick={() => onCheckIn(reservation._id)}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition font-semibold"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Check In</span>
                    </button>
                  )}
                </>
              )}

              {isPast && !reservation.checkin && (
                <div className="text-center text-sm text-gray-500 py-2">
                  This booking has expired
                </div>
              )}

              {reservation.checkin && (
                <div className="text-center text-sm text-green-600 py-2 font-semibold">
                  ✓ Successfully checked in
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      {!isPast && !reservation.checkin && (
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <div>
                <p className="font-semibold">Show this ticket at the entrance</p>
                <p className="text-xs text-purple-100">
                  {isToday ? 'Your show is today!' : 'Please arrive 15 minutes early'}
                </p>
              </div>
            </div>
            {isToday && (
              <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                TODAY
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;