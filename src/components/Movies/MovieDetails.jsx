// src/components/Movies/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Film, Users, Award } from 'lucide-react';
import movieService from '../../services/movieService';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import { formatDate, getErrorMessage } from '../../utils/helpers';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const data = await movieService.getMovieById(id);
      setMovie(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading movie details..." />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <ErrorMessage message={error} />
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 flex items-center text-purple-600 hover:text-purple-700 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Movies
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Movie not found</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 text-purple-600 hover:text-purple-700 transition"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/movies')}
        className="mb-6 flex items-center text-purple-600 hover:text-purple-700 font-semibold transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Movies
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Hero Section */}
        <div className="grid md:grid-cols-5 gap-6 p-8">
          {/* Movie Poster */}
          <div className="md:col-span-2">
            <div className="relative aspect-[2/3] bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-2xl">
              {movie.image ? (
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film className="w-24 h-24 text-white opacity-50" />
                </div>
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
                {movie.title}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.split(',').map((genre, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold capitalize"
                  >
                    {genre.trim()}
                  </span>
                ))}
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                  {movie.language}
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{movie.duration} minutes</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Release Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(movie.releaseDate)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Director</p>
                    <p className="font-semibold text-gray-900 capitalize">{movie.director}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Cast</p>
                    <p className="font-semibold text-gray-900 capitalize line-clamp-2">{movie.cast}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Synopsis</h3>
                <p className="text-gray-600 leading-relaxed capitalize">{movie.description}</p>
              </div>
            </div>

            {/* Book Tickets Button */}
            <div className="border-t pt-6">
              <button
                onClick={() => navigate(`/booking/${movie._id}`)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;