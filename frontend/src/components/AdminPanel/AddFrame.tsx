import React, { useState } from 'react';
import { adminApi } from '../../service/api';

interface AddFrameProps {
  onSuccess: (message: string) => void;
}

const AddFrame: React.FC<AddFrameProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    frame: '',
    brand: 'Mitsubishi',
    model: 'Pajero',
    year: new Date().getFullYear()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.addVehicle(formData);
      if (response.success) {
        onSuccess(`Frame ${formData.frame} добавлен`);
        setFormData({ ...formData, frame: '' });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при добавлении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-4">
        Добавить Frame номер
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Frame номер *
          </label>
          <input
            type="text"
            value={formData.frame}
            onChange={(e) => setFormData({ ...formData, frame: e.target.value.toUpperCase() })}
            placeholder="L048G-3004771"
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Бренд
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Модель
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Год выпуска
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            min="1980"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Добавление...' : 'Добавить Frame'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default AddFrame;