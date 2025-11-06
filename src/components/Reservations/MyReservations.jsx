// src/components/Reservations/MyReservations.jsx
import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Clock, MapPin, CheckCircle, XCircle, Download } from 'lucide-react';
import reservationService from '../../services/reservationService';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import { formatCurrency, formatDateShort, getErrorMessage } from '../../utils/helpers';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await reservationService.getAllReservations();
      // Sort by date (newest first)
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReservations(sorted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading your bookings..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your movie reservations</p>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />

      {/* Reservations List */}
      {reservations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Ticket className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Bookings Yet</h3>
          <p className="text-gray-600 mb-6">
            You haven't made any reservations. Start by browsing our movies!
          </p>
          <a
            href="/movies"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Browse Movies
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
};

const ReservationCard = ({ reservation }) => {
  const isPast = new Date(reservation.date) < new Date();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left Section */}
          <div className="flex-1">
            {/* Booking ID & Status */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                <p className="font-mono text-lg font-bold text-gray-900">
                  {reservation._id.slice(-8).toUpperCase()}
                </p>
              </div>
              
              <div>
                {reservation.checkin ? (
                  <span className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Checked In</span>
                  </span>
                ) : isPast ? (
                  <span className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                    <XCircle className="w-4 h-4" />
                    <span>Expired</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>Upcoming</span>
                  </span>
                )}
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">{formatDateShort(reservation.date)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold text-gray-900">{reservation.startAt}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Ticket className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-semibold text-gray-900">
                    {Array.isArray(reservation.seats) 
                      ? reservation.seats.join(', ')
                      : reservation.seats}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Cinema</p>
                  <p className="font-semibold text-gray-900">Cinema Hall</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Name: </span>
                  <span className="font-semibold text-gray-900">{reservation.username}</span>
                </div>
                <div>
                  <span className="text-gray-500">Phone: </span>
                  <span className="font-semibold text-gray-900">{reservation.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Price & Actions */}
          <div className="flex flex-col items-end justify-between space-y-4">
            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatCurrency(reservation.total)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Array.isArray(reservation.seats) ? reservation.seats.length : 1} ticket(s) × {formatCurrency(reservation.ticketPrice)}
              </p>
            </div>

            {/* QR Code Placeholder */}
            {!isPast && !reservation.checkin && (
              <div className="bg-gray-100 w-32 h-32 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">QR Code</p>
                </div>
              </div>
            )}

            {/* Download Button */}
            {!isPast && (
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition text-sm font-semibold">
                <Download className="w-4 h-4" />
                <span>Download Ticket</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Banner for Upcoming */}
      {!isPast && !reservation.checkin && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-white text-sm">
          <p className="font-semibold">
            📍 Show this QR code at the cinema entrance to check in
          </p>
        </div>
      )}
    </div>
  );
};

export default MyReservations;