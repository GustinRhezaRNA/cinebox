import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/index.tsx'
import Footer from './components/Footer/index.tsx'
import HomePage from './pages/Home/page.tsx'
import MovieDetailPage from './pages/Detail/page.tsx'
import ProfilePage from './pages/Profile/page.tsx'
import LoginPage from './pages/Auth/Login/page.tsx'
import RegisterPage from './pages/Auth/Register/page.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Main app routes with navbar/footer */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-grow pt-16 md:pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  </BrowserRouter>
)
