import { useNavigate } from "react-router-dom"
import { popularMovies } from "@/lib/data/dummy";


const Popular = () => {
    const navigate = useNavigate();

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <section id="popular" className="px-4 sm:px-8 lg:px-16 py-12 md:py-20">
            <div className="flex items-center justify-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold">Popular Movies</h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex justify-center space-x-4 pb-4 min-w-max">
                    {popularMovies.slice(0, 6).map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 w-36 sm:w-40 md:w-48 group cursor-pointer"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="relative overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"}
                                    alt={movie.title}
                                    className="w-full h-52 sm:h-60 md:h-72 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm md:text-base font-medium text-white truncate">{movie.title}</h3>
                                <p className="text-xs md:text-sm text-gray-400">{new Date(movie.release_date).getFullYear()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Popular