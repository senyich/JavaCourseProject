import React, { useState, useEffect } from 'react';
import { catalogApi } from '../service/axios.service';
import type { Car } from '../service/types';

interface CarListProps {
  onCarSelect: (carId: number) => void;
}

export const CarList: React.FC<CarListProps> = ({ onCarSelect }) => {  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const carsData = await catalogApi.getCars();
        setCars(carsData);
      } catch (err) {
        setError('Ошибка при загрузке списка автомобилей');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  if (loading) {
    return (
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-8 border border-auto-beige-200">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-auto-brown-200 border-t-auto-brown-600 rounded-full animate-spin mb-4"></div>
          <p className="text-auto-gray-600 font-heading font-medium">Загрузка автомобилей...</p>
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

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-6">Каталог автомобилей</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 hover:border-auto-brown-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="aspect-video bg-auto-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {/* <img
                src={`http://localhost:8080${car.imageUrl}`}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-car.png';
                }}
              /> */}
            </div>
            
            <h3 className="text-xl font-heading font-bold text-auto-gray-800 mb-2">
              {car.brand} {car.model}
            </h3>
            
            <p className="text-auto-gray-600 mb-3">
              Год выпуска: <span className="font-semibold">{car.productionYear}</span>
            </p>
            
              <button 
                onClick={() => onCarSelect(car.id)}
                className="w-full px-4 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors font-medium"
            >
                Выбрать автомобиль
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

