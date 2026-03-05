import React, { useState } from 'react';
import { partsApi } from '../service/api';
import type { PartGroup } from '../service/types';

interface FrameSearchProps {
  onSearchResult: (groups: PartGroup[], frame: string) => void;
}

const FrameSearch: React.FC<FrameSearchProps> = ({ onSearchResult }) => {
  const [frame, setFrame] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frame.trim()) {
      setError('Введите Frame номер');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await partsApi.searchByFrame(frame);

      if (response.success) {
        onSearchResult(response.data, frame);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при поиске. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-4">
        Поиск по Frame номеру
      </h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Frame номер (например, L048G-3004771)
          </label>
          <input
            type="text"
            value={frame}
            onChange={(e) => setFrame(e.target.value.toUpperCase())}
            placeholder="L048G-3004771"
            className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500 focus:border-auto-brown-500 text-auto-gray-800 font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors font-heading font-semibold disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-auto-beige-100 border-t-transparent rounded-full animate-spin"></div>
              <span>Поиск...</span>
            </span>
          ) : (
            'Найти'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default FrameSearch;