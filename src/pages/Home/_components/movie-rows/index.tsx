import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import CategoryFilters from '../category-filters';
import {
    fetchPopularMovies,
    fetchTrendingMovies,
    fetchTopRatedMovies,
    searchMovies
} from '@/lib/fetch';

import type { Movie, MovieResponse } from '@/lib/types/movie';

const MovieRows = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<string>("All");
    const [selectedCategory, setSelectedCategory] = useState<string>("popular");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const itemsPerPage = 5;

    // Genre mapping berdasarkan TMDB genre IDs
    const genreMap: { [key: string]: number } = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "Horror": 27,
        "Science Fiction": 878,
        "Thriller": 53,
        "War": 10752
    };

    // Fetch movies based on category
    const fetchMoviesByCategory = async (category: string) => {
        setLoading(true);
        try {
            let response: MovieResponse;

            switch (category) {
                case "trending":
                    response = await fetchTrendingMovies();
                    break;
                case "top_rated":
                    response = await fetchTopRatedMovies();
                    break;
                case "popular":
                default:
                    response = await fetchPopularMovies();
                    break;
            }

            setMovies(response.results);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle search functionality
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);

        if (!query.trim()) {
            // If search is cleared, fetch movies by current category
            await fetchMoviesByCategory(selectedCategory);
            return;
        }

        setLoading(true);
        try {
            const response = await searchMovies(query);
            setMovies(response.results);
        } catch (error) {
            console.error("Error searching movies:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery("");
        fetchMoviesByCategory(category);
    };

    // Initial data fetch
    useEffect(() => {
        fetchMoviesByCategory(selectedCategory);
    }, [selectedCategory]);

    // Filter movies by genre
    const filteredMovies = selectedGenre === "All"
        ? movies
        : movies.filter(movie =>
            movie.genre_ids?.some(id => id === genreMap[selectedGenre])
        );

    // Pagination logic dengan filtered movies
    const totalPagesCalculated = Math.ceil(filteredMovies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPagesCalculated));
    };

    // Reset pagination ketika genre berubah
    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
    };

    // Handle movie card click untuk navigasi ke detail page
    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div id='list' className="max-w-7xl mx-auto">
            <section className="px-4 sm:px-8 lg:px-16 py-12">
                {/* Category Filters */}
                <CategoryFilters
                    selectedGenre={selectedGenre}
                    onGenreChange={handleGenreChange}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                />

                {/* Filter Results Info */}
                <div className="mb-6 text-center">
                    <p className="text-gray-400 text-sm">
                        {searchQuery
                            ? `Search results for "${searchQuery}": ${filteredMovies.length} movies found`
                            : selectedGenre === "All"
                                ? `Showing all ${filteredMovies.length} movies (${totalPagesCalculated} pages)`
                                : `Showing ${filteredMovies.length} ${selectedGenre.toLowerCase()} movies (${totalPagesCalculated} pages)`
                        }
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                            {currentMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="group cursor-pointer"
                                    onClick={() => handleMovieClick(movie.id)}
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-3">
                                        <img
                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"}
                                            alt={movie.title}
                                            className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span>{new Date(movie.release_date).getFullYear()}</span>
                                            <div className="flex items-center space-x-1">
                                                <Heart className="w-3 h-3" />
                                                <span>{movie.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {currentMovies.length === 0 && !loading && (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg">No movies found.</p>
                                {searchQuery && (
                                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search query.</p>
                                )}
                            </div>
                        )}

                        {/* Pagination Info */}
                        {totalPagesCalculated > 1 && (
                            <div className="text-center mt-6 mb-4">
                                <p className="text-gray-400 text-sm">
                                    Page {currentPage} of {totalPagesCalculated}
                                    <span className="mx-2">•</span>
                                    Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredMovies.length)} of {filteredMovies.length} movies
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPagesCalculated > 1 && (
                            <Pagination className="justify-center mt-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={handlePreviousPage}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-800"}
                                        />
                                    </PaginationItem>

                                    {/* First page */}
                                    {currentPage > 3 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(1)}
                                                    className="cursor-pointer hover:bg-gray-800"
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            {currentPage > 4 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                        </>
                                    )}

                                    {/* Current page range */}
                                    {Array.from({ length: 3 }, (_, i) => {
                                        const pageNumber = currentPage - 1 + i;
                                        if (pageNumber < 1 || pageNumber > totalPagesCalculated) return null;

                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                    isActive={currentPage === pageNumber}
                                                    className="cursor-pointer hover:bg-gray-800"
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {/* Last page */}
                                    {currentPage < totalPagesCalculated - 2 && (
                                        <>
                                            {currentPage < totalPagesCalculated - 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            <PaginationItem>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(totalPagesCalculated)}
                                                    className="cursor-pointer hover:bg-gray-800"
                                                >
                                                    {totalPagesCalculated}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={handleNextPage}
                                            className={currentPage === totalPagesCalculated ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-800"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                )}
            </section>
        </div>
    )
}

export default MovieRows