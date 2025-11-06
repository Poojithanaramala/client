// src/components/Movies/MoviesList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import movieService from '../../services/movieService';
import MovieCard from './MovieCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import { getErrorMessage } from '../../utils/helpers';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedGenre, selectedLanguage, movies]);

  const fetchMovies = async () => {
    try {
      const data = await movieService.getAllMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = [...movies];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.cast?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter((movie) =>
        movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(
        (movie) =>
          movie.language?.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    setFilteredMovies(filtered);
  };

  // ✅ Safe handling for undefined genre or language
  const genres = [
    'all',
    ...new Set(
      movies.flatMap((m) =>
        m.genre ? m.genre.split(',').map((g) => g.trim()) : []
      )
    ),
  ];

  const languages = [
    'all',
    ...new Set(movies.map((m) => m.language || '')).filter(Boolean),
  ];

  if (loading) {
    return <Loading message="Loading movies..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Now Showing</h1>
        <p className="text-gray-600">Book your tickets for the latest movies</p>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Genre Filter */}
          <div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none capitalize"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre} className="capitalize">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none capitalize"
            >
              {languages.map((language) => (
                <option key={language} value={language} className="capitalize">
                  {language === 'all' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>{filteredMovies.length} movies found</span>
          {(searchTerm || selectedGenre !== 'all' || selectedLanguage !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
                setSelectedLanguage('all');
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => navigate(`/movies/${movie._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No movies found
          </h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
