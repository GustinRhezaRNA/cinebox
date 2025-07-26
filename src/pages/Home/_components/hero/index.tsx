import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/1RgPyOhN4DRs225BGTlHJqCudII.jpg)`,
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
            <div className="relative z-10 w-full max-w-2xl ml-4 sm:ml-8 lg:ml-16 space-y-4 md:space-y-6 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    Demon Slayer: Kimetsu no Yaiba Infinity Castle
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg">
                    As the Demon Slayer Corps members and Hashira engaged in a group strength training program, the Hashira Training, in preparation for the forthcoming battle against the demons, Muzan Kibutsuji appears at the Ubuyashiki Mansion.
                </p>

                <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((star) => (
                        <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-300 ml-2 text-sm md:text-base">6.8</span>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-stretch sm:items-center">
                    <Button
                        onClick={() => navigate("/movie/1311031")}
                        className="bg-blue-400 hover:bg-blue-300 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto h-10 md:h-12 rounded-3xl"
                    >
                        <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-white" />
                        Watch Now
                    </Button>
                    <Button
                        onClick={() => window.location.href = "https://youtu.be/x7uLutVRBfI?si=kFIFl1nod7hzhNWA"}
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 px-6 md:px-8 py-2 md:py-3 bg-transparent text-base md:text-lg h-10 md:h-12 rounded-3xl w-full sm:w-auto"
                    >
                        Trailer
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero