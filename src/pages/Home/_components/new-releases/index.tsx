import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const newMovies =
    [
        {
            "adult": false,
            "backdrop_path": "/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg",
            "genre_ids": [
                14,
                10751,
                28
            ],
            "id": 1087192,
            "original_language": "en",
            "original_title": "How to Train Your Dragon",
            "overview": "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
            "popularity": 829.1379,
            "poster_path": "/41dfWUWtg1kUZcJYe6Zk6ewxzMu.jpg",
            "release_date": "2025-06-06",
            "title": "How to Train Your Dragon",
            "video": false,
            "vote_average": 8.08,
            "vote_count": 1220
        },
        {
            "adult": false,
            "backdrop_path": "/1RgPyOhN4DRs225BGTlHJqCudII.jpg",
            "genre_ids": [
                16,
                28,
                14,
                53
            ],
            "id": 1311031,
            "original_language": "ja",
            "original_title": "劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来",
            "overview": "As the Demon Slayer Corps members and Hashira engaged in a group strength training program, the Hashira Training, in preparation for the forthcoming battle against the demons, Muzan Kibutsuji appears at the Ubuyashiki Mansion. With the head of the Demon Corps in danger, Tanjiro and the Hashira rush to the headquarters but are plunged into a deep descent to a mysterious space by the hands of Muzan Kibutsuji.  The destination of where Tanjiro and Demon Slayer Corps have fallen is the demons' stronghold – the Infinity Castle. And so, the battleground is set as the final battle between the Demon Slayer Corps and the demons ignites.",
            "popularity": 628.6854,
            "poster_path": "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
            "release_date": "2025-07-18",
            "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 26
        },
        {
            "adult": false,
            "backdrop_path": "/cEQMqB3ahd4mfeUN6VGC0ouVnZZ.jpg",
            "genre_ids": [
                28,
                878,
                53
            ],
            "id": 1071585,
            "original_language": "en",
            "original_title": "M3GAN 2.0",
            "overview": "After the underlying tech for M3GAN is stolen and misused by a powerful defense contractor to create a military-grade weapon known as Amelia, M3GAN's creator Gemma realizes that the only option is to resurrect M3GAN and give her a few upgrades, making her faster, stronger, and more lethal.",
            "popularity": 551.8498,
            "poster_path": "/oekamLQrwlJjRNmfaBE4llIvkir.jpg",
            "release_date": "2025-06-25",
            "title": "M3GAN 2.0",
            "video": false,
            "vote_average": 7.647,
            "vote_count": 476
        },
        {
            "adult": false,
            "backdrop_path": "/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
            "genre_ids": [
                878,
                12
            ],
            "id": 617126,
            "original_language": "en",
            "original_title": "The Fantastic Four: First Steps",
            "overview": "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, while defending Earth from a ravenous space god called Galactus and his enigmatic Herald, Silver Surfer.",
            "popularity": 325.9232,
            "poster_path": "/x26MtUlwtWD26d0G0FXcppxCJio.jpg",
            "release_date": "2025-07-23",
            "title": "The Fantastic Four: First Steps",
            "video": false,
            "vote_average": 7.297,
            "vote_count": 306
        },
        {
            "adult": false,
            "backdrop_path": "/h6gChZHFpmbwqwV3uQsoakp77p1.jpg",
            "genre_ids": [
                28,
                35
            ],
            "id": 1124619,
            "original_language": "en",
            "original_title": "Bride Hard",
            "overview": "Sam is a secret agent whose toughest mission to date is pleasing her bride-to-be best friend at a lavish destination wedding. When a team of mercenaries crashes the party and takes the guests hostage, Sam is thrown into a fight unlike any before — one where she can’t risk blowing her cover or ruining the big day. As she takes on the bad guys in a high-stakes battle disguised as a fairy-tale affair, she realizes the real threat might be closer than she thinks.",
            "popularity": 336.8826,
            "poster_path": "/3mExdWLSxAiUCb4NMcYmxSkO7n4.jpg",
            "release_date": "2025-06-19",
            "title": "Bride Hard",
            "video": false,
            "vote_average": 6,
            "vote_count": 30
        },
        {
            "adult": false,
            "backdrop_path": "/ApRxyHFuvv5yghedxXPJSm9FEDe.jpg",
            "genre_ids": [
                878,
                12,
                28
            ],
            "id": 1061474,
            "original_language": "en",
            "original_title": "Superman",
            "overview": "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
            "popularity": 314.3256,
            "poster_path": "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
            "release_date": "2025-07-09",
            "title": "Superman",
            "video": false,
            "vote_average": 7.431,
            "vote_count": 1157
        },
        {
            "adult": false,
            "backdrop_path": "/7Q2CmqIVJuDAESPPp76rWIiA0AD.jpg",
            "genre_ids": [
                28,
                12,
                18
            ],
            "id": 1011477,
            "original_language": "en",
            "original_title": "Karate Kid: Legends",
            "overview": "After a family tragedy, kung fu prodigy Li Fong is uprooted from his home in Beijing and forced to move to New York City with his mother. When a new friend needs his help, Li enters a karate competition – but his skills alone aren't enough. Li's kung fu teacher Mr. Han enlists original Karate Kid Daniel LaRusso for help, and Li learns a new way to fight, merging their two styles into one for the ultimate martial arts showdown.",
            "popularity": 303.8448,
            "poster_path": "/AEgggzRr1vZCLY86MAp93li43z.jpg",
            "release_date": "2025-05-08",
            "title": "Karate Kid: Legends",
            "video": false,
            "vote_average": 7.224,
            "vote_count": 538
        },
        {
            "adult": false,
            "backdrop_path": "/962KXsr09uK8wrmUg9TjzmE7c4e.jpg",
            "genre_ids": [
                28,
                53,
                18
            ],
            "id": 1119878,
            "original_language": "en",
            "original_title": "Ice Road: Vengeance",
            "overview": "Big rig ice road driver Mike McCann travels to Nepal to scatter his late brother’s ashes on Mt. Everest. While on a packed tour bus traversing the deadly 12,000 ft. terrain of the infamous Road to the Sky, McCann and his mountain guide encounter a group of mercenaries and must fight to save themselves, the busload of innocent travelers, and the local villagers’ homeland.",
            "popularity": 287.6525,
            "poster_path": "/cQN9rZj06rXMVkk76UF1DfBAico.jpg",
            "release_date": "2025-06-27",
            "title": "Ice Road: Vengeance",
            "video": false,
            "vote_average": 6.965,
            "vote_count": 142
        },
        {
            "adult": false,
            "backdrop_path": "/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg",
            "genre_ids": [
                878,
                12,
                28
            ],
            "id": 1234821,
            "original_language": "en",
            "original_title": "Jurassic World Rebirth",
            "overview": "Five years after the events of Jurassic World Dominion, covert operations expert Zora Bennett is contracted to lead a skilled team on a top-secret mission to secure genetic material from the world's three most massive dinosaurs. When Zora's operation intersects with a civilian family whose boating expedition was capsized, they all find themselves stranded on an island where they come face-to-face with a sinister, shocking discovery that's been hidden from the world for decades.",
            "popularity": 229.5673,
            "poster_path": "/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
            "release_date": "2025-07-01",
            "title": "Jurassic World Rebirth",
            "video": false,
            "vote_average": 6.362,
            "vote_count": 795
        },
        {
            "adult": false,
            "backdrop_path": "/9l6bcHNFLR2fcCBSPzEeqxiQhwU.jpg",
            "genre_ids": [
                28,
                35,
                80,
                9648
            ],
            "id": 1374534,
            "original_language": "nl",
            "original_title": "Bad Boa's",
            "overview": "When an overeager community officer and a reckless ex-detective are forced to team up, plenty of chaos ensues on the streets of Rotterdam.",
            "popularity": 204.7605,
            "poster_path": "/7bcndiaTgu1Kj5a6qyCmsWYdtI.jpg",
            "release_date": "2025-07-10",
            "title": "Almost Cops",
            "video": false,
            "vote_average": 5.9,
            "vote_count": 96
        },
        {
            "adult": false,
            "backdrop_path": "/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg",
            "genre_ids": [
                16,
                14,
                35,
                10402,
                10751,
                28
            ],
            "id": 803796,
            "original_language": "en",
            "original_title": "KPop Demon Hunters",
            "overview": "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
            "popularity": 209.4107,
            "poster_path": "/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
            "release_date": "2025-06-20",
            "title": "KPop Demon Hunters",
            "video": false,
            "vote_average": 8.514,
            "vote_count": 794
        },
        {
            "adult": false,
            "backdrop_path": "/fd9K7ZDfzRAcbLh8JlG4HIKbtuR.jpg",
            "genre_ids": [
                28,
                14
            ],
            "id": 846422,
            "original_language": "en",
            "original_title": "The Old Guard 2",
            "overview": "Andy and her team of immortal warriors fight with renewed purpose as they face a powerful new foe threatening their mission to protect humanity.",
            "popularity": 159.0232,
            "poster_path": "/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
            "release_date": "2025-07-01",
            "title": "The Old Guard 2",
            "video": false,
            "vote_average": 6.038,
            "vote_count": 545
        },
        {
            "adult": false,
            "backdrop_path": "/vJbEUMeI2AxBUZKjP6ZVeVNNTLh.jpg",
            "genre_ids": [
                28,
                53,
                35
            ],
            "id": 749170,
            "original_language": "en",
            "original_title": "Heads of State",
            "overview": "The UK Prime Minister and US President have a public rivalry that risks their countries' alliance. But when they become targets of a powerful enemy, they're forced to rely on each other as they go on a wild, multinational run. Allied with Noel, a brilliant MI6 agent, they must find a way to thwart a conspiracy that threatens the free world.",
            "popularity": 151.001,
            "poster_path": "/lVgE5oLzf7ABmzyASEVcjYyHI41.jpg",
            "release_date": "2025-07-02",
            "title": "Heads of State",
            "video": false,
            "vote_average": 6.907,
            "vote_count": 551
        },
        {
            "adult": false,
            "backdrop_path": "/lSbblLngbeZIn6G4WXDcyQ6SLhw.jpg",
            "genre_ids": [
                28,
                18
            ],
            "id": 911430,
            "original_language": "en",
            "original_title": "F1",
            "overview": "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
            "popularity": 144.8315,
            "poster_path": "/9PXZIUsSDh4alB80jheWX4fhZmy.jpg",
            "release_date": "2025-06-25",
            "title": "F1",
            "video": false,
            "vote_average": 7.615,
            "vote_count": 893
        },
        {
            "adult": false,
            "backdrop_path": "/iZ0ZSnhmHB3k1KDkDzEz65f5iia.jpg",
            "genre_ids": [
                16,
                28,
                878
            ],
            "id": 1326106,
            "original_language": "ja",
            "original_title": "アニメ『怪獣８号』第１期総集編／同時上映「保科の休日」",
            "overview": "In a Kaiju-filled Japan, Kafka Hibino works in monster disposal. After reuniting with his childhood friend Mina Ashiro, a rising star in the anti-Kaiju Defense Force, he decides to pursue his abandoned dream of joining the Force, when he suddenly transforms into the powerful \"Kaiju No. 8.\" An action-packed recap of the first season of Kaiju No. 8 and a new original episode, Hoshina's Day Off.",
            "popularity": 116.354,
            "poster_path": "/1aEfyTWUK8ZBk4aw7Ck0qEoF8PW.jpg",
            "release_date": "2025-03-28",
            "title": "Kaiju No. 8: Mission Recon",
            "video": false,
            "vote_average": 7.795,
            "vote_count": 39
        },
        {
            "adult": false,
            "backdrop_path": "/lqwwGkwJHtz9QgKtz4zeY19YgDg.jpg",
            "genre_ids": [
                10749,
                18
            ],
            "id": 1136867,
            "original_language": "en",
            "original_title": "Materialists",
            "overview": "A young, ambitious New York City matchmaker finds herself torn between the perfect match and her imperfect ex.",
            "popularity": 123.3381,
            "poster_path": "/eDo0pNruy0Qgj6BdTyHIR4cxHY8.jpg",
            "release_date": "2025-06-12",
            "title": "Materialists",
            "video": false,
            "vote_average": 6.741,
            "vote_count": 164
        },
        {
            "adult": false,
            "backdrop_path": "/wcFV4uOdSbC0cSjs7ecAyOU6t59.jpg",
            "genre_ids": [
                16,
                10751,
                12,
                14,
                35
            ],
            "id": 947478,
            "original_language": "en",
            "original_title": "Diplodocus",
            "overview": "When the world around him is mysteriously erased, a little green dinosaur named Diplodocus must travel through the pages of a comic book and adventure through time to bring color back to his land. Alongside a wizard and two scientists, Diplo’s plans go awry as he learns that there may be a dimension to his world that he never considered.",
            "popularity": 122.3639,
            "poster_path": "/9mnMMiwv20EL5weJrLZCaF8cM2u.jpg",
            "release_date": "2024-10-04",
            "title": "The Green Dinosaur",
            "video": false,
            "vote_average": 8,
            "vote_count": 8
        },
        {
            "adult": false,
            "backdrop_path": "/tdMbbFhqyEqOK1QzNTvJjHWKbZX.jpg",
            "genre_ids": [
                27,
                53,
                28
            ],
            "id": 1429744,
            "original_language": "th",
            "original_title": "ปากกัด ตีนถีบ",
            "overview": "In a fight for survival against a horrifying army of zombies, a former Muay Thai fighter must use skill, speed and grit to save his girlfriend.",
            "popularity": 101.8987,
            "poster_path": "/yHYj2t3NzsjkHVYa0bPri4sMBsg.jpg",
            "release_date": "2025-07-09",
            "title": "Ziam",
            "video": false,
            "vote_average": 6.6,
            "vote_count": 116
        },
        {
            "adult": false,
            "backdrop_path": "/4NI6e5SjIRn7Gt5P361MAIDiGpi.jpg",
            "genre_ids": [
                27,
                53
            ],
            "id": 1285965,
            "original_language": "en",
            "original_title": "Dangerous Animals",
            "overview": "A savvy and free-spirited surfer is abducted by a shark-obsessed serial killer. Held captive on his boat, she must figure out how to escape before he carries out a ritualistic feeding to the sharks below.",
            "popularity": 150.5169,
            "poster_path": "/9tk3Si960hg4E49eMt81dS7Qe9Z.jpg",
            "release_date": "2025-06-05",
            "title": "Dangerous Animals",
            "video": false,
            "vote_average": 6.603,
            "vote_count": 63
        },
        {
            "adult": false,
            "backdrop_path": "/5esDYWV0NoFwqPa1iC0g9akqZo9.jpg",
            "genre_ids": [
                27
            ],
            "id": 1151031,
            "original_language": "en",
            "original_title": "Bring Her Back",
            "overview": "Following the death of their father, a brother and sister are introduced to their new sibling by their foster mother, only to learn that she has a terrifying secret.",
            "total_pages": 207,
            "total_results": 4125
        }
    ]

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