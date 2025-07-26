import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Flame, Plus, Search, TrendingUp } from 'lucide-react'
import { genres } from '@/lib/constants'

interface CategoryFiltersProps {
    selectedGenre?: string;
    onGenreChange?: (genre: string) => void;
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
    onSearch?: (query: string) => void;
    searchQuery?: string;
}

const CategoryFilters = ({
    selectedGenre = "All",
    onGenreChange,
    selectedCategory = "popular",
    onCategoryChange,
    onSearch,
    searchQuery = ""
}: CategoryFiltersProps) => {
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    
    // Category options with endpoint mapping
    const categories = [
        { id: "trending", label: "Trending", icon: TrendingUp, endpoint: "/trending/movie/day" },
        { id: "popular", label: "Popular", icon: Flame, endpoint: "/movie/popular" },
        { id: "top_rated", label: "Top Rated", icon: Plus, endpoint: "/movie/top_rated" }
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearchQuery(value);
        onSearch?.(value);
    };

    const handleCategoryClick = (categoryId: string) => {
        onCategoryChange?.(categoryId);
        // Clear search when changing category
        setLocalSearchQuery("");
        onSearch?.("");
    };

    return (
        <section className="px-4 sm:px-8 lg:px-16 py-10">
            {/* Category Buttons */}
            <div className="flex sm:space-x-8 mb-8 overflow-x-auto pb-2 justify-center gap-6 md:gap-10">
                {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                        <button
                            key={category.id}
                            className={`flex items-center space-x-2 flex-shrink-0 transition-colors ${selectedCategory === category.id
                                    ? "text-blue-400"
                                    : "text-gray-400 hover:text-white"
                                }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <span><IconComponent className="w-4 h-4 md:w-5 md:h-5" /></span>
                            <span className="text-sm md:text-base">{category.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Search Input */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <Input
                        value={localSearchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 border-none bg-slate-700/70 text-sm md:text-base"
                        placeholder="Search movies..."
                    />
                </div>
            </div>

            {/* Genre Filters - 2 rows layout */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
                {genres.map((genre) => (
                    <Button
                        key={genre}
                        variant={selectedGenre === genre ? "default" : "outline"}
                        className={`flex-shrink-0 rounded-2xl min-w-[100px] md:min-w-[120px] text-xs md:text-sm ${selectedGenre === genre
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                            }`}
                        onClick={() => onGenreChange?.(genre)}
                    >
                        {genre}
                    </Button>
                ))}
            </div>
        </section>
    )
}

export default CategoryFilters