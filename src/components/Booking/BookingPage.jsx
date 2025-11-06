// src/components/Booking/BookingPage.jsx - COMPLETE FILE
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CheckCircle } from 'lucide-react';
import movieService from '../../services/movieService';
import cinemaService from '../../services/cinemaService';
import showtimeService from '../../services/showtimeService';
import reservationService from '../../services/reservationService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import { formatCurrency, getErrorMessage } from '../../utils/helpers';

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, [movieId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [movieData, cinemasData, showtimesData] = await Promise.all([
        movieService.getMovieById(movieId),
        cinemaService.getAllCinemas(),
        showtimeService.getAllShowtimes(),
      ]);

      setMovie(movieData);

      // Filter showtimes for this movie
      const movieShowtimes = showtimesData.filter((st) => st.movieId === movieId);
      
      // Get unique cinema IDs from showtimes
      const cinemaIds = [...new Set(movieShowtimes.map((st) => st.cinemaId))];
      
      // Filter cinemas that have showtimes for this movie
      const availableCinemas = cinemasData.filter((c) => cinemaIds.includes(c._id));

      setCinemas(availableCinemas);
      setShowtimes(movieShowtimes);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCinemaSelect = (cinema) => {
    setSelectedCinema(cinema);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'reserved') return;

    const seatId = `${seat.row}${seat.number}`;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (!selectedCinema || !selectedShowtime || selectedSeats.length === 0) {
      setError('Please select cinema, showtime, and seats');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const reservationData = {
        movieId: movie._id,
        cinemaId: selectedCinema._id,
        date: selectedShowtime.startDate,
        startAt: selectedShowtime.startAt,
        seats: selectedSeats,
        ticketPrice: selectedCinema.ticketPrice,
        total: selectedCinema.ticketPrice * selectedSeats.length,
        username: user.username,
        phone: user.phone,
      };

      const response = await reservationService.createReservation(reservationData);
      
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/my-reservations');
      }, 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredShowtimes = selectedCinema
    ? showtimes.filter((st) => st.cinemaId === selectedCinema._id)
    : [];

  const totalAmount = selectedSeats.length * (selectedCinema?.ticketPrice || 0);

  if (loading) {
    return <Loading message="Loading booking details..." />;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your tickets have been booked successfully. Redirecting to your bookings...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(`/movies/${movieId}`)}
          className="flex items-center text-purple-600 hover:text-purple-700 font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Movie
        </button>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />

      {/* Movie Info Banner */}
      {movie && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-28 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              {movie.image ? (
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-4xl">🎬</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 capitalize">{movie.title}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className="capitalize">{movie.genre.split(',')[0].trim()}</span>
                <span>•</span>
                <span className="capitalize">{movie.language}</span>
                <span>•</span>
                <span>{movie.duration} mins</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Select Cinema */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Select Cinema</h3>
        
        {cinemas.length === 0 ? (
          <p className="text-gray-600">No cinemas available for this movie</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cinemas.map((cinema) => (
              <div
                key={cinema._id}
                onClick={() => handleCinemaSelect(cinema)}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedCinema?._id === cinema._id
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow'
                }`}
              >
                <h4 className="font-bold text-lg text-gray-900 mb-2 capitalize">{cinema.name}</h4>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="capitalize">{cinema.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold text-lg">
                    {formatCurrency(cinema.ticketPrice)}
                  </span>
                  <span className="text-xs text-gray-500">{cinema.seatsAvailable} seats</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Select Showtime */}
      {selectedCinema && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Select Showtime</h3>
          
          {filteredShowtimes.length === 0 ? (
            <p className="text-gray-600">No showtimes available for this cinema</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {filteredShowtimes.map((showtime) => (
                <button
                  key={showtime._id}
                  onClick={() => handleShowtimeSelect(showtime)}
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
      )}

      {/* Step 3: Select Seats */}
      {selectedShowtime && selectedCinema && (
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
            {selectedCinema.seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-3">
                {row.map((seat, seatIndex) => {
                  const seatId = `${seat.row}${seat.number}`;
                  const isSelected = selectedSeats.includes(seatId);
                  const isReserved = seat.status === 'reserved';

                  return (
                    <button
                      key={seatIndex}
                      onClick={() => handleSeatClick(seat)}
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
                    <p className="font-bold text-gray-900">{formatCurrency(selectedCinema.ticketPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-purple-600 text-2xl">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingPage;