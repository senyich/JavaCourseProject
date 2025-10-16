import React, { useState, useEffect } from 'react';
import { catalogApi } from '../service/axios.service';
import type { Car, System } from '../service/types';

interface CarPageProps {
  carId: number;
}

export const CarPage: React.FC<CarPageProps> = ({ carId }) => {
  const [car, setCar] = useState<Car | null>(null);
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCarData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [carData, systemsData] = await Promise.all([
          catalogApi.getCar(carId),
          catalogApi.getCarSystems(carId)
        ]);
        
        setCar(carData);
        setSystems(systemsData);
      } catch (err) {
        setError('Ошибка при загрузке данных автомобиля');
      } finally {
        setLoading(false);
      }
    };

    loadCarData();
  }, [carId]);

  if (loading) {
    return (
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-8 border border-auto-beige-200">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-auto-brown-200 border-t-auto-brown-600 rounded-full animate-spin mb-4"></div>
          <p className="text-auto-gray-600 font-heading font-medium">Загрузка данных автомобиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="aspect-video bg-auto-gray-100 rounded-xl">
              {/* <img
                src={`http://localhost:8080${car.imageUrl}`}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-car.png';
                }}
              /> */}
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-heading font-bold text-auto-gray-800 mb-4">
              {car.brand} {car.model}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-auto-beige-100 rounded-lg p-4">
                <p className="text-sm text-auto-gray-600 font-medium">Бренд</p>
                <p className="text-lg font-semibold text-auto-gray-800">{car.brand}</p>
              </div>
              
              <div className="bg-auto-beige-100 rounded-lg p-4">
                <p className="text-sm text-auto-gray-600 font-medium">Модель</p>
                <p className="text-lg font-semibold text-auto-gray-800">{car.model}</p>
              </div>
              
              <div className="bg-auto-beige-100 rounded-lg p-4">
                <p className="text-sm text-auto-gray-600 font-medium">Год выпуска</p>
                <p className="text-lg font-semibold text-auto-gray-800">{car.productionYear}</p>
              </div>
              
              <div className="bg-auto-beige-100 rounded-lg p-4">
                <p className="text-sm text-auto-gray-600 font-medium">Системы</p>
                <p className="text-lg font-semibold text-auto-gray-800">{systems.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
        <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-6">Системы автомобиля</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map((system) => (
            <div
              key={system.id}
              className="border border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 hover:border-auto-brown-300 transition-all duration-200 shadow-sm"
            >
              <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-2">
                {system.name}
              </h3>
              
              <p className="text-auto-gray-600 mb-4 text-sm leading-relaxed">
                {system.description}
              </p>
              
              <button className="px-4 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors text-sm font-medium">
                Просмотреть схему
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

