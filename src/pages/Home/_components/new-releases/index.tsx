import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { newMovies } from '@/lib/data/dummy.ts'
import type { Movie } from '@/lib/types/movie.ts'




const NewReleases = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle movie card click
    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                setLoading(true);
                // Simulasi pengambilan data baru
                setTimeout(() => {
                    setMovies(newMovies.filter((m): m is Movie => typeof m.popularity === "number" && typeof m.vote_average === "number" && typeof m.vote_count === "number"));
                    setError(null);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Error fetching new releases:", err);
                setError("Failed to load new releases");
                setLoading(false);
            }
        };

        fetchNewReleases();
    }, []);
    if (loading) {
        return (
            <div id='new-release' className="max-w-7xl mx-auto">
                <section className="px-4 sm:px-8 lg:px-16 py-12">
                    <h2 className="text-2xl font-bold mb-8">New Releases</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-48">
                                <div className="w-full h-72 bg-gray-800 rounded-lg mb-3 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-700 rounded animate-pulse" />
                                    <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto">
                <section className="px-4 sm:px-8 lg:px-16 py-12">
                    <h2 className="text-2xl font-bold mb-8">New Releases</h2>
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div id='new-release' className="max-w-7xl mx-auto py-20">
            <section className="px-4 sm:px-8 lg:px-16 py-12">
                <h2 className="text-2xl font-bold mb-8">New Releases</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {movies.slice(0, 6).map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 w-42 group cursor-pointer"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-3">
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"}
                                    alt={movie.title}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{new Date(movie.release_date).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default NewReleases