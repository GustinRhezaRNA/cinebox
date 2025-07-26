# 🎬 CineBox - Movie Discovery Platform

A modern, responsive movie discovery platform built with React, TypeScript, and Vite. CineBox allows users to explore popular movies, search for specific titles, and view detailed movie information using real-time data from The Movie Database (TMDB) API.

![CineBox Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🌟 Features

### 🎯 Core Functionality

- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **Advanced Search**: Search movies by title with real-time results
- **Movie Details**: Comprehensive movie information including cast, budget, revenue, and production details
- **Genre Filtering**: Filter movies by genres (Action, Comedy, Drama, etc.)
- **Responsive Pagination**: Navigate through movie collections with advanced pagination controls

### 🔐 User Authentication

- **User Registration**: Create new accounts
- **Profile Management**: View and edit user profiles

### 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Progressive Enhancement**: Enhanced experience on larger screens

### 🎨 Modern UI/UX

- **Dark Theme**: Sleek, cinema-inspired design
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Elegant loading indicators
- **Error Handling**: User-friendly error messages

## 🛠 Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### UI Components

- **Shadcn/ui** - Pre-built accessible components
- **Lucide React** - Beautiful icon library
- **Custom Components** - Purpose-built UI elements

### State Management

- **React Hooks** - Built-in state management
- **Local Storage** - Client-side data persistence
- **Context API** - Global state (authentication)

### API Integration

- **TMDB API** - The Movie Database for movie data
- **Fetch API** - Modern HTTP client
- **TypeScript Interfaces** - Type-safe API responses

## 🌐 API Integration

### The Movie Database (TMDB) API

CineBox integrates with TMDB API to provide real-time movie data:

```typescript
// Endpoints Used:
- /movie/popular          // Popular movies
- /movie/top_rated        // Top rated movies
- /trending/movie/day     // Daily trending movies
- /search/movie           // Movie search
- /movie/{id}             // Movie details
```

### API Features Implemented:

- ✅ **Movie Lists**: Popular, trending, top-rated collections
- ✅ **Search Functionality**: Real-time movie search
- ✅ **Movie Details**: Complete movie information
- ✅ **Image Handling**: Poster and backdrop images
- ✅ **Error Handling**: Graceful API error management
- ✅ **Loading States**: User feedback during API calls

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cinebox
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # TMDB API Key
   VITE_OMDBAPI_KEY=your_tmdb_api_key_here
   ```

   **How to get TMDB API Key:**

   - Go to [TMDB](https://www.themoviedb.org/)
   - Create a free account
   - Navigate to Settings > API
   - Request an API key (approval is usually instant)

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎮 Usage Guide

### 🏠 Homepage

- **Browse Movies**: Scroll through popular, trending, and new releases
- **Search**: Use the search bar to find specific movies
- **Filter by Genre**: Click genre buttons to filter movies
- **Pagination**: Navigate through movie pages (5 movies per page)

### 🔍 Movie Details

- **Click any movie card** to view detailed information
- **View**: Ratings, release date, runtime, genres, cast
- **Production Info**: Budget, revenue, production companies
- **Navigation**: Use back button to return to homepage

### 👤 User Account

- **Register**: Create account with name, email, and password
- **Login**: Access your account
- **Profile**: View and edit your information
- **Session**: Stay logged in across browser sessions

### 📱 Mobile Experience

- **Responsive Design**: Optimized for mobile devices
- **Touch Navigation**: Swipe and tap interactions
- **Mobile Menu**: Collapsible navigation menu

## 🔧 Configuration

### Environment Variables

```env
VITE_OMDBAPI_KEY=your_tmdb_api_key    # Required: TMDB API key
```

### Tailwind CSS

Custom configuration for the movie theme:

- Dark color scheme
- Custom animations
- Responsive breakpoints
- Component-specific styles

### TypeScript

Strict TypeScript configuration:

- Interface definitions for all API responses
- Type-safe component props
- Error handling with typed exceptions

