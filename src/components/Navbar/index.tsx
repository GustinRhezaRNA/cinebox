import { useState, useEffect } from 'react'
import { LogIn, LogOut, Menu, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

interface UserSession {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    loginTime: string;
}

const Navbar = () => {
    const [user, setUser] = useState<UserSession | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // Check for logged in user
        const currentUser = localStorage.getItem('cinebox_current_user');
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('cinebox_current_user');
        setUser(null);
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <header className="bg-black/50 backdrop-blur-sm fixed top-0 w-full z-50">
            <div className="flex items-center justify-between p-4 md:p-6">
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <Button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        variant="ghost"
                        size="sm"
                        className="text-slate-200 hover:text-white hover:bg-gray-800"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <div className="flex space-x-6">
                        <a href="#popular" className="text-white hover:text-gray-300 text-sm">
                            Popular
                        </a>
                        <a href="#list" className="text-white hover:text-gray-300 text-sm">
                            List
                        </a>
                        <a href="#featured" className="text-white hover:text-gray-300 text-sm">
                            Featured
                        </a>
                        <a href="#new-release" className="text-white hover:text-gray-300 text-sm">
                            New Release
                        </a>
                    </div>
                </nav>

                {/* Logo - centered on mobile, positioned on desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none text-xl md:text-2xl font-bold text-slate-200">
                    CineBox
                </div>

                {/* Right side items */}
                <div className="flex items-center space-x-2 md:space-x-4">

                    {user ? (
                        // Logged in user
                        <div className="flex items-center space-x-2">
                            <div className="hidden sm:block">
                                <p className='text-slate-200 text-xs md:text-sm'>{user.name}</p>
                            </div>
                            <Avatar className="rounded-full border-2 cursor-pointer border-slate-200 w-8 h-8 md:w-10 md:h-10" onClick={() => handleNavigation('/profile')}>
                                <AvatarImage
                                    src={user.avatar || "https://github.com/shadcn.png"}
                                    alt={user.name}
                                />
                                <AvatarFallback className="text-xs md:text-sm">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                size="sm"
                                className="text-slate-200 hover:text-white hover:bg-gray-800 p-1 md:p-2"
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        // Not logged in
                        <div className="flex items-center space-x-1 md:space-x-2">
                            <Button
                                onClick={handleLogin}
                                variant="ghost"
                                size="sm"
                                className="text-slate-200 hover:text-white hover:bg-gray-800 text-xs md:text-sm px-2 md:px-3"
                            >
                                <LogIn className="w-4 h-4 mr-1 md:mr-2" />
                                <span className="hidden sm:inline">Sign In</span>
                                <span className="sm:hidden">In</span>
                            </Button>
                            <Button
                                onClick={() => navigate('/auth/register')}
                                variant="outline"
                                size="sm"
                                className="text-slate-200 border-slate-200 hover:bg-slate-200 hover:text-gray-900 text-xs md:text-sm px-2 md:px-3"
                            >
                                <span className="hidden sm:inline">Sign Up</span>
                                <span className="sm:hidden">Up</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-gray-800">
                    <nav className="flex flex-col space-y-4 p-4">
                        <a
                            href="#popular"
                            className="text-white hover:text-gray-300 text-sm py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Popular
                        </a>
                        <a
                            href="#list"
                            className="text-white hover:text-gray-300 text-sm py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            List
                        </a>
                        <a
                            href="#featured"
                            className="text-white hover:text-gray-300 text-sm py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Featured
                        </a>
                        <a
                            href="#new-release"
                            className="text-white hover:text-gray-300 text-sm py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            New Release
                        </a>
                    </nav>
                </div>
            )}
        </header>

    )
}

export default Navbar