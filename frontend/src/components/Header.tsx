import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Главная', href: '/' },
    { name: 'Сервисный мануал', href: '/manual' },
    { name: 'Инфо', href: '/info' },
  ];

  return (
    <header className="bg-auto-gray-800 shadow-lg relative">
      <div className="bg-auto-brown-600 text-auto-beige-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>🚗 Запчасти для Mitsubishi Pajero</span>
              <span>•</span>
              <span>📞 +7 (952)-003-81-73</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-auto-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Логотип */}
            <div className="flex items-center space-x-3">
             <div className="w-12 h-12 bg-auto-brown-600 rounded-full flex items-center justify-center text-auto-beige-100">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M5 13l-2 4h18l-2-4H5z" />
                 <circle cx="7" cy="17" r="2" />
                 <circle cx="17" cy="17" r="2" />
               </svg>
             </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-auto-beige-100">
                  Pajero<span className="text-auto-brown-400">Parts</span>
                </h1>
                <p className="text-auto-beige-300 text-xs">Запчасти для Mitsubishi Pajero</p>
              </div>
            </div>

            {/* Навигация */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-auto-beige-200 hover:text-auto-brown-300 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-auto-brown-400 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Кнопка мобильного меню */}
            <button
              className="md:hidden text-auto-beige-200 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-auto-beige-200 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-auto-beige-200 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-auto-beige-200 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden bg-auto-gray-800 border-t border-auto-gray-700 animate-slide-in">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-auto-beige-200 hover:text-auto-brown-300 py-2 transition-colors duration-200 font-medium border-b border-auto-gray-700 last:border-b-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;