import { useParams } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetail} from '@/lib/fetch';
import type { MovieDetail } from '@/lib/types/movie';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovieDetail = async () => {
            if (!id) {
                setError("Movie ID not found");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const movieData = await fetchMovieDetail(id);
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie detail:', error);
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        loadMovieDetail();
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg">Loading movie details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !movie) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {error || 'Movie Not Found'}
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white my-3">
            {/* Backdrop Header */}
            <div
                className="relative h-96 bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundPosition: 'center 30%' // posisi gambar lebih turun
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Movie Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Poster */}
                        <div className="flex-shrink-0">
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"}
                                alt={movie.title}
                                className="w-48 h-72 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Movie Details */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                            {movie.original_title !== movie.title && (
                                <p className="text-gray-300 text-lg mb-4">{movie.original_title}</p>
                            )}

                            {/* Rating and Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center bg-yellow-600 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 mr-1 fill-current" />
                                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(movie.release_date).getFullYear()}</span>
                                </div>
                                {movie.runtime && (
                                    <div className="flex items-center text-gray-300">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{movie.runtime} min</span>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-300">
                                    <Globe className="w-4 h-4 mr-1" />
                                    <span className="uppercase">{movie.original_language}</span>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Tagline */}
                            {movie.tagline && (
                                <p className="text-gray-300 italic text-lg mb-4">{movie.tagline}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Overview */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                    </section>

                    {/* Additional Details */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Release Date</h3>
                                <p>{new Date(movie.release_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Vote Count</h3>
                                <p>{movie.vote_count.toLocaleString()} votes</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Popularity</h3>
                                <p>{movie.popularity.toFixed(1)}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Adult Rating</h3>
                                <p>{movie.adult ? 'Yes' : 'No'}</p>
                            </div>
                            {movie.budget > 0 && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-400 mb-2">Budget</h3>
                                    <p>${movie.budget.toLocaleString()}</p>
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-400 mb-2">Revenue</h3>
                                    <p>${movie.revenue.toLocaleString()}</p>
                                </div>
                            )}
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Status</h3>
                                <p>{movie.status}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-400 mb-2">Original Language</h3>
                                <p>{movie.original_language.toUpperCase()}</p>
                            </div>
                        </div>
                    </section>

                    {/* Production Companies */}
                    {movie.production_companies && movie.production_companies.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Production Companies</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {movie.production_companies.map((company) => (
                                    <div key={company.id} className="bg-gray-800 p-4 rounded-lg flex items-center">
                                        {company.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                alt={company.name}
                                                className="w-12 h-12 object-contain mr-4"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-white">{company.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Production Countries */}
                    {movie.production_countries && movie.production_countries.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Production Countries</h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.production_countries.map((country) => (
                                    <span
                                        key={country.iso_3166_1}
                                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {country.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
