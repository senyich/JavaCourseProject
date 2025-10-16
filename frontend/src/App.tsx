import React, { useState } from 'react';
import PartSearch from './components/PartSearch';
import DiagramViewer from './components/DiagramViewer';
import { CarList } from './components/CarList';
import { AddCarForm } from './components/AddCarForm';
import { CarPage } from './components/CarPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'diagram' | 'cars' | 'admin'>('search');
  const [diagramId, setDiagramId] = useState<number>(1);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-auto-beige-100 bg-car-texture flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <header className="text-center mb-8 animate-slide-in">
            <div className="leather-texture rounded-xl p-8 mb-6 shadow-lg">
              <h1 className="text-4xl font-heading font-bold text-auto-beige-50 mb-2">
                Каталог автозапчастей
              </h1>
              <p className="text-auto-beige-200 text-lg">
                Поиск деталей и просмотр схем автомобильных систем
              </p>
            </div>
          </header>

          <div className="chrome-effect rounded-xl shadow-lg mb-6 overflow-hidden">
            <nav className="flex flex-wrap">
              <button
                onClick={() => {
                  setActiveTab('search');
                  setSelectedCarId(null);
                }}
                className={`flex-1 min-w-[200px] py-5 px-6 text-center font-heading font-semibold transition-all duration-300 ${
                  activeTab === 'search'
                    ? 'text-auto-brown-700 bg-auto-beige-100 border-b-4 border-auto-brown-600'
                    : 'text-auto-gray-600 bg-auto-beige-50 hover:bg-auto-beige-100 hover:text-auto-brown-600'
                }`}
              >
                🔍 Поиск деталей
              </button>
              <button
                onClick={() => {
                  setActiveTab('diagram');
                  setSelectedCarId(null);
                }}
                className={`flex-1 min-w-[200px] py-5 px-6 text-center font-heading font-semibold transition-all duration-300 ${
                  activeTab === 'diagram'
                    ? 'text-auto-brown-700 bg-auto-beige-100 border-b-4 border-auto-brown-600'
                    : 'text-auto-gray-600 bg-auto-beige-50 hover:bg-auto-beige-100 hover:text-auto-brown-600'
                }`}
              >
                📊 Схемы систем
              </button>
              <button
                onClick={() => {
                  setActiveTab('cars');
                  setSelectedCarId(null);
                }}
                className={`flex-1 min-w-[200px] py-5 px-6 text-center font-heading font-semibold transition-all duration-300 ${
                  activeTab === 'cars'
                    ? 'text-auto-brown-700 bg-auto-beige-100 border-b-4 border-auto-brown-600'
                    : 'text-auto-gray-600 bg-auto-beige-50 hover:bg-auto-beige-100 hover:text-auto-brown-600'
                }`}
              >
                🚗 Автомобили
              </button>
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setSelectedCarId(null);
                }}
                className={`flex-1 min-w-[200px] py-5 px-6 text-center font-heading font-semibold transition-all duration-300 ${
                  activeTab === 'admin'
                    ? 'text-auto-brown-700 bg-auto-beige-100 border-b-4 border-auto-brown-600'
                    : 'text-auto-gray-600 bg-auto-beige-50 hover:bg-auto-beige-100 hover:text-auto-brown-600'
                }`}
              >
                ⚙️ Админ-панель
              </button>
            </nav>
          </div>

          <div className="animate-slide-in">
            {activeTab === 'search' && <PartSearch />}
            
            {activeTab === 'diagram' && (
              <div className="space-y-6">
                <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
                  <label className="block text-sm font-medium text-auto-gray-700 mb-3 font-heading">
                    ID диаграммы:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={diagramId}
                      onChange={(e) => setDiagramId(Number(e.target.value))}
                      min="1"
                      className="px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 font-medium"
                    />
                    <button
                      onClick={() => setDiagramId(diagramId)}
                      className="px-6 py-3 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors duration-200 font-heading font-semibold"
                    >
                      Загрузить схему
                    </button>
                  </div>
                </div>
                
                <DiagramViewer diagramId={diagramId} />
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-6">
                {selectedCarId ? (
                  <>
                    <div className="flex items-center space-x-4 mb-6">
                      <button
                        onClick={() => setSelectedCarId(null)}
                        className="px-4 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors duration-200 font-heading font-semibold"
                      >
                        ← Назад к списку
                      </button>
                      <span className="text-auto-gray-600 font-medium">
                        Просмотр автомобиля
                      </span>
                    </div>
                    <CarPage carId={selectedCarId} />
                  </>
                ) : (
                  <CarList onCarSelect={setSelectedCarId} />
                )}
              </div>
            )}

            {activeTab === 'admin' && <AddCarForm />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;