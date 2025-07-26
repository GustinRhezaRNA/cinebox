import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import Hero from "./_components/hero"
import Popular from "./_components/popular"
import MovieRows from "./_components/movie-rows"
import NewReleases from "./_components/new-releases"

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

            {/* Hero Section */}
            <Hero />

            {/* Popular Movies */}
            <Popular />

            {/* Movie Rows */}
            <MovieRows />


            {/* Featured Content - Responsive */}
            <section id="featured" className="px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
                <div className="relative bg-gradient-to-r from-black via-gray-900 to-transparent rounded-2xl overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{
                            backgroundImage: 'url("https://image.tmdb.org/t/p/w500/5esDYWV0NoFwqPa1iC0g9akqZo9.jpg")',
                        }}
                    />

                    <div className="relative z-10 p-6 sm:p-8 lg:p-12 max-w-full lg:max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">18+</span>
                            <span className="text-gray-300 text-sm sm:text-base">2022</span>
                            <span className="text-gray-300 text-sm sm:text-base">2 Seasons</span>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">Bring Her Back</h2>

                        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                            Following the death of their father, a brother and sister are introduced to their new sibling by their foster mother, only to learn that she has a terrifying secret.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Button
                                onClick={() => navigate("/movie/1151031")}
                                className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                            >
                                <Play className="w-4 h-4 mr-2 fill-white" />
                                Details
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Releases */}
            <NewReleases />

        </div>
    )
}

export default HomePage