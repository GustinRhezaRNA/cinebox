const Footer = () => {
    return (
        <footer className="bg-black py-8 md:py-12 px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200">CineBox</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400 text-sm md:text-base">
                <a href="#" className="hover:text-white transition-colors">
                    About us
                </a>
                <a href="#" className="hover:text-white transition-colors">
                    Vlog
                </a>
                <a href="#" className="hover:text-white transition-colors">
                    Contact
                </a>
                <a href="#" className="hover:text-white transition-colors">
                    Report broken links
                </a>
                <a href="#" className="hover:text-white transition-colors">
                    Disclaimer
                </a>
            </div>

            <div className="text-center text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
                <p>&copy; 2024 CineBox. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer