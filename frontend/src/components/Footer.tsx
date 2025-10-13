import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Категории запчастей',
      links: [
        'Двигатель и компоненты',
        'Трансмиссия и КПП',
        'Тормозная система',
        'Подвеска и рулевое',
        'Электрика и освещение',
        'Кузовные элементы',
      ],
    },
    {
      title: 'Популярные марки',
      links: [
        'Toyota',
        'Volkswagen',
        'BMW',
        'Mercedes-Benz',
        'Audi',
        'Hyundai/Kia',
      ],
    },
    {
      title: 'Покупателям',
      links: [
        'Как сделать заказ',
        'Доставка и оплата',
        'Возврат и гарантия',
        'Вопросы и ответы',
        'Отслеживание заказа',
        'Скидки и акции',
      ],
    },
    {
      title: 'Компания',
      links: [
        'О нас',
        'Контакты',
        'Вакансии',
        'Новости',
        'Отзывы',
        'Партнерство',
      ],
    },
  ];

  return (
    <footer className="bg-auto-gray-900 text-auto-beige-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-auto-beige-400 to-auto-brown-600 rounded-full flex items-center justify-center chrome-effect">
                <span className="text-auto-gray-800 font-heading font-bold">Z</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-auto-beige-100">
                Zap<span className="text-auto-brown-400">Parts</span>
              </h3>
            </div>
            <p className="text-auto-beige-300 mb-4 leading-relaxed">
              Крупнейший онлайн-каталог автозапчастей с 2015 года. 
              Быстрый поиск по модели авто, гарантия качества и доставка по всей России.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-auto-brown-400">50K+</div>
                <div className="text-xs text-auto-beige-400">запчастей</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-auto-brown-400">120+</div>
                <div className="text-xs text-auto-beige-400">марок авто</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-auto-brown-400">85</div>
                <div className="text-xs text-auto-beige-400">городов</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-auto-gray-800 p-3 rounded-lg hover:bg-auto-brown-600 transition-colors cursor-pointer transform hover:scale-105">
                <span className="text-auto-beige-100">VK</span>
              </div>
              <div className="bg-auto-gray-800 p-3 rounded-lg hover:bg-auto-brown-600 transition-colors cursor-pointer transform hover:scale-105">
                <span className="text-auto-beige-100">TG</span>
              </div>
              <div className="bg-auto-gray-800 p-3 rounded-lg hover:bg-auto-brown-600 transition-colors cursor-pointer transform hover:scale-105">
                <span className="text-auto-beige-100">YT</span>
              </div>
              <div className="bg-auto-gray-800 p-3 rounded-lg hover:bg-auto-brown-600 transition-colors cursor-pointer transform hover:scale-105">
                <span className="text-auto-beige-100">OK</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-auto-beige-100 mb-4 text-lg border-b border-auto-brown-600 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-auto-beige-300 hover:text-auto-brown-300 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-auto-brown-500 rounded-full mr-3 group-hover:bg-auto-brown-300 transition-colors"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-auto-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-auto-brown-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-auto-beige-100 text-lg">📍</span>
                </div>
                <div>
                  <p className="text-auto-beige-100 font-medium">Адрес склада</p>
                  <p className="text-auto-beige-300 text-sm">г. Москва, ул. Автозапчастей, 15</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-auto-brown-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-auto-beige-100 text-lg">📞</span>
                </div>
                <div>
                  <p className="text-auto-beige-100 font-medium">Телефон</p>
                  <p className="text-auto-beige-300 text-sm">8 (800) 555-35-35</p>
                  <p className="text-auto-beige-400 text-xs">бесплатно по России</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-auto-brown-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-auto-beige-100 text-lg">✉️</span>
                </div>
                <div>
                  <p className="text-auto-beige-100 font-medium">Email</p>
                  <p className="text-auto-beige-300 text-sm">info@zapparts.ru</p>
                  <p className="text-auto-beige-400 text-xs">поддержка 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-auto-gray-800 rounded-lg p-6">
              <h4 className="font-heading font-semibold text-auto-beige-100 mb-3">
                Подпишитесь на рассылку
              </h4>
              <p className="text-auto-beige-300 text-sm mb-4">
                Узнавайте первыми о новых поступлениях и специальных акциях
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 bg-auto-gray-700 border border-auto-gray-600 rounded-lg text-auto-beige-100 placeholder-auto-beige-400 focus:outline-none focus:border-auto-brown-500"
                />
                <button className="bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 px-6 py-2 rounded-lg transition-colors duration-200 font-medium whitespace-nowrap">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-auto-gray-950 leather-texture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-auto-beige-300 text-sm">
              © {currentYear} ZapParts. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-auto-beige-400 text-sm">Принимаем к оплате:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-auto-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-auto-beige-300">VISA</span>
                </div>
                <div className="w-8 h-8 bg-auto-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-auto-beige-300">MC</span>
                </div>
                <div className="w-8 h-8 bg-auto-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-auto-beige-300">MIR</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-auto-beige-300 hover:text-auto-brown-300 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-auto-beige-300 hover:text-auto-brown-300 transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-auto-beige-300 hover:text-auto-brown-300 transition-colors">
                Карта сайта
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;