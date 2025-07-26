import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Calendar,
  Heart,
  Bookmark,
  Clock,
  Film,
  Edit3,
  Save,
  X,
  LogOut,
  Settings,
  Star
} from 'lucide-react'

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  joinDate: string;
  favoriteGenres: string[];
  watchlist: number[];
  watchHistory: number[];
  loginTime?: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    favoriteGenres: [] as string[]
  });
  const [stats, setStats] = useState({
    totalWatchlist: 0,
    totalWatched: 0,
    favoriteGenres: [] as string[],
    joinedDaysAgo: 0
  });
  const navigate = useNavigate();

  const genreOptions = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Drama", "Family", "Fantasy", "Horror", "Science Fiction", "Thriller"
  ];

  // Sample movies for demonstration
  const sampleMovies: Movie[] = [
    {
      id: 1087192,
      title: "How to Train Your Dragon",
      poster_path: "/41dfWUWtg1kUZcJYe6Zk6ewxzMu.jpg",
      release_date: "2025-06-06",
      vote_average: 8.08,
      overview: "On the rugged isle of Berk...",
      genre_ids: [14, 10751, 28]
    },
    {
      id: 1311031,
      title: "Demon Slayer: Infinity Castle",
      poster_path: "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
      release_date: "2025-07-18",
      vote_average: 6.8,
      overview: "As the Demon Slayer Corps...",
      genre_ids: [16, 28, 14]
    },
    {
      id: 1071585,
      title: "M3GAN 2.0",
      poster_path: "/oekamLQrwlJjRNmfaBE4llIvkir.jpg",
      release_date: "2025-06-25",
      vote_average: 7.647,
      overview: "After the underlying tech...",
      genre_ids: [27, 878, 53]
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('cinebox_current_user');
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    const userSession = JSON.parse(currentUser);

    // Get full user data
    const allUsers: User[] = JSON.parse(localStorage.getItem('cinebox_users') || '[]');
    const fullUser = allUsers.find(u => u.id === userSession.id);

    if (!fullUser) {
      navigate('/auth/login');
      return;
    }

    setUser(fullUser);
    setEditForm({
      name: fullUser.name,
      email: fullUser.email,
      favoriteGenres: fullUser.favoriteGenres || []
    });

    // Calculate stats
    const joinDate = new Date(fullUser.joinDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));

    setStats({
      totalWatchlist: fullUser.watchlist?.length || 0,
      totalWatched: fullUser.watchHistory?.length || 0,
      favoriteGenres: fullUser.favoriteGenres || [],
      joinedDaysAgo: daysDiff
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('cinebox_current_user');
    navigate('/auth/login');
  };

  const handleSaveProfile = () => {
    if (!user) return;

    // Update user data in localStorage
    const allUsers: User[] = JSON.parse(localStorage.getItem('cinebox_users') || '[]');
    const updatedUsers = allUsers.map(u =>
      u.id === user.id
        ? { ...u, name: editForm.name, email: editForm.email, favoriteGenres: editForm.favoriteGenres }
        : u
    );

    localStorage.setItem('cinebox_users', JSON.stringify(updatedUsers));

    // Update current user session
    const userSession = {
      id: user.id,
      name: editForm.name,
      email: editForm.email,
      avatar: user.avatar,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('cinebox_current_user', JSON.stringify(userSession));

    // Get updated user data and refresh all states
    const updatedUser = updatedUsers.find(u => u.id === user.id);
    if (updatedUser) {
      // Update user state with complete data
      setUser({
        ...updatedUser,
        loginTime: userSession.loginTime
      });

      // Recalculate and update stats
      const joinDate = new Date(updatedUser.joinDate);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));

      setStats({
        totalWatchlist: updatedUser.watchlist?.length || 0,
        totalWatched: updatedUser.watchHistory?.length || 0,
        favoriteGenres: updatedUser.favoriteGenres || [],
        joinedDaysAgo: daysDiff
      });
    }

    setIsEditing(false);
  };

  const toggleGenre = (genre: string) => {
    setEditForm(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 mt-3">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-20 h-20 mr-6">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gray-700 text-white text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-blue-100 text-lg">{user.email}</p>
                <p className="text-blue-200 text-sm">
                  Joined {stats.joinedDaysAgo === 0 ? 'today' : `${stats.joinedDaysAgo} days ago`}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-white border-white hover:bg-red-500 hover:border-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistics */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bookmark className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">Watchlist</span>
                  </div>
                  <span className="text-white font-semibold">{stats.totalWatchlist}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-gray-300">Watched</span>
                  </div>
                  <span className="text-white font-semibold">{stats.totalWatched}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-gray-300">Favorite Genres</span>
                  </div>
                  <span className="text-white font-semibold">{stats.favoriteGenres.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-gray-300">Member Since</span>
                  </div>
                  <span className="text-white font-semibold">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Favorite Genres
              </h3>
              {stats.favoriteGenres.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stats.favoriteGenres.map(genre => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No favorite genres selected</p>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h3>

              {isEditing ? (
                <div className="space-y-6">
                  {/* Edit Form */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Favorite Genres
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {genreOptions.map(genre => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${editForm.favoriteGenres.includes(genre)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* View Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <p className="text-white text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <p className="text-white text-lg">{user.email}</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Film className="w-5 h-5 mr-2" />
                      Sample Watchlist
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {sampleMovies.map(movie => (
                        <div key={movie.id} className="bg-gray-700 rounded-lg p-3">
                          <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <h5 className="text-white text-sm font-medium truncate">{movie.title}</h5>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span className="text-gray-300 text-xs">{movie.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;