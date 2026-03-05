import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-auto-gray-900 text-auto-beige-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-auto-beige-400 to-auto-brown-600 rounded-full flex items-center justify-center chrome-effect">
                <span className="text-auto-gray-800 font-heading font-bold">P</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-auto-beige-100">
                Pajero<span className="text-auto-brown-400">Parts</span>
              </h3>
            </div>
            <p className="text-auto-beige-300 mb-4 leading-relaxed">
              Специализированный каталог запчастей для Mitsubishi Pajero 1G.
              Поиск по Frame номеру и оригинальным OEM каталогам.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-auto-beige-100 mb-4 text-lg border-b border-auto-brown-600 pb-2">
              Информация
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-auto-brown-300">О компании</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-auto-beige-100 mb-4 text-lg border-b border-auto-brown-600 pb-2">
              Сообщество
            </h4>
            <ul className="space-y-3">
            <li><a href="#" className="hover:text-auto-brown-300">https://www.drive2.ru/c/727744207510318640/</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-auto-beige-100 mb-4 text-lg border-b border-auto-brown-600 pb-2">
              Контакты
            </h4>
            <ul className="space-y-3">

              <li>📞 +7 (952) 003-81-73</li>
              <li>✉️ info@pajeroparts.ru</li>

            </ul>
          </div>
        </div>

        <div className="border-t border-auto-gray-700 mt-8 pt-8 text-center text-auto-beige-300 text-sm">
          © {currentYear} PajeroParts. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;