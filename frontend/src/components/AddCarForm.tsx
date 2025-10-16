import React, { useState } from 'react';
import { adminApi } from '../service/axios.service';

export const AddCarForm: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    productionYear: new Date().getFullYear(),
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await adminApi.addCar(formData);
      setSuccess(true);
      setFormData({
        brand: '',
        model: '',
        productionYear: new Date().getFullYear(),
        imageUrl: ''
      });
    } catch (err) {
      setError('Ошибка при добавлении автомобиля');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'productionYear' ? parseInt(value) || new Date().getFullYear() : value
    }));
  };

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-6">Добавить автомобиль</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              Бренд *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 placeholder-auto-gray-400 font-medium"
              placeholder="Toyota"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              Модель *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 placeholder-auto-gray-400 font-medium"
              placeholder="Camry"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              Год выпуска *
            </label>
            <input
              type="number"
              name="productionYear"
              value={formData.productionYear}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 placeholder-auto-gray-400 font-medium"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              URL изображения *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 placeholder-auto-gray-400 font-medium"
              placeholder="/static/cars/toyota-camry.jpg"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-all duration-200 font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-auto-beige-100 border-t-transparent rounded-full animate-spin"></div>
              <span>Добавление...</span>
            </span>
          ) : (
            'Добавить автомобиль'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>Автомобиль успешно добавлен!</span>
          </div>
        </div>
      )}
    </div>
  );
};