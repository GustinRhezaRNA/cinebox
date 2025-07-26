export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    joinDate: string;
    favoriteGenres: string[];
    watchlist: number[];
    watchHistory: number[];
}