import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Главная', href: '/' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contact' },
  ];

  return (
    <header className="bg-auto-gray-800 shadow-lg relative">
      <div className="bg-auto-brown-600 text-auto-beige-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>🚗 Запчасти</span>
              <span>•</span>
              <span>📞 +7 (913) 257-58-19</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-auto-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-auto-beige-400 to-auto-brown-600 rounded-full flex items-center justify-center chrome-effect">
                <span className="text-auto-gray-800 font-heading font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-auto-beige-100">
                  Japan<span className="text-auto-brown-400">Cats</span>
                </h1>
                <p className="text-auto-beige-300 text-xs">Премиальные японские запчасти</p>
              </div>
            </div>

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

            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                Поиск вашей модели
              </button>
            </div>

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
                <div className="flex space-x-4 pt-4">
                  <button className="flex-1 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm">
                    Найти свой автомобиль
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;