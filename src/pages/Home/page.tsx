import { Play, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero from "./_components/hero"
import Popular from "./_components/popular"
import MovieRows from "./_components/movie-rows"
import NewReleases from "./_components/new-releases"

const HomePage = () => {

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

            {/* Hero Section */}
            <Hero />

            {/* Popular Movies */}
            <Popular />

            {/* Movie Rows */}
            <MovieRows />


            {/* Featured Content - House of the Dragon */}
            <section id="featured" className="px-4 sm:px-8 lg:px-16 py-20">
                <div className="relative bg-gradient-to-r from-black via-gray-900 to-transparent rounded-2xl overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{
                            backgroundImage: 'url("https://image.tmdb.org/t/p/w500/5esDYWV0NoFwqPa1iC0g9akqZo9.jpg")',
                        }}
                    />

                    <div className="relative z-10 p-12 max-w-2xl">
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">18+</span>
                            <span className="text-gray-300">2022</span>
                            <span className="text-gray-300">2 Seasons</span>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold mb-4">Bring Her Back</h2>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Following the death of their father, a brother and sister are introduced to their new sibling by their foster mother, only to learn that she has a terrifying secret.
                        </p>

                        <div className="flex space-x-4 mb-6">
                            <span className="text-blue-400">Information</span>
                            <span className="text-gray-400">Trailer</span>
                            <span className="text-gray-400">Reviews</span>
                        </div>

                        <div className="flex space-x-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2">
                                <Play className="w-4 h-4 mr-2" />
                                Watch
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-800 px-6 py-2 bg-transparent"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                MY LIST
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