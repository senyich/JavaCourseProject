import React, { useState } from 'react';
import { catalogApi } from '../service/axios.service';
import type { Part } from '../service/types'

const PartSearch: React.FC = () => {
  const [partNumber, setPartNumber] = useState('');
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!partNumber.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const partData = await catalogApi.getPartByNumber(partNumber);
      setPart(partData);
    } catch (err) {
      setError('Деталь не найдена или произошла ошибка при поиске');
      setPart(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-6">Поиск деталей</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
              placeholder="Введите номер детали (например, TKB-001)"
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 placeholder-auto-gray-400 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-all duration-200 font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-auto-beige-100 border-t-transparent rounded-full animate-spin"></div>
                <span>Поиск...</span>
              </span>
            ) : (
              'Найти деталь'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {part && (
        <div className="border border-auto-beige-300 rounded-xl p-6 bg-auto-beige-100 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading font-semibold text-auto-gray-800">
              {part.name}
            </h3>
            <span className="px-3 py-1 bg-auto-brown-100 text-auto-brown-700 rounded-full text-sm font-medium">
              {part.partNumber}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-auto-gray-600 font-medium">Производитель:</p>
                <p className="text-lg font-semibold text-auto-gray-800">{part.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-auto-gray-600 font-medium">Описание:</p>
                <p className="text-auto-gray-800 leading-relaxed">{part.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-auto-gray-600 font-medium">Цена:</p>
                <p className="text-3xl font-bold text-green-600">
                  ${part.price.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-auto-gray-600 font-medium">В наличии:</p>
                <p className={`text-xl font-heading font-semibold ${
                  part.quantity > 5 
                    ? 'text-green-600' 
                    : part.quantity > 0 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                }`}>
                  {part.quantity} шт.
                </p>
                <div className="w-full bg-auto-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      part.quantity > 5 
                        ? 'bg-green-500' 
                        : part.quantity > 0 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((part.quantity / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartSearch;