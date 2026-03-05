import React, { useState } from 'react';
import { adminApi } from '../../service/api';

interface UploadDiagramProps {
  onSuccess: (message: string) => void;
}

const UploadDiagram: React.FC<UploadDiagramProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    subGroupId: '',
    name: '',
    description: '',
    file: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file || !formData.subGroupId || !formData.name) {
      setError('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.uploadDiagram(
        parseInt(formData.subGroupId),
        formData.name,
        formData.file,
        formData.description
      );

      if (response.success) {
        onSuccess(`Схема "${formData.name}" загружена`);
        setFormData({ subGroupId: '', name: '', description: '', file: null });
        // Сброс input file
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при загрузке схемы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-4">
        Загрузить схему
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            ID подгруппы *
          </label>
          <input
            type="number"
            value={formData.subGroupId}
            onChange={(e) => setFormData({ ...formData, subGroupId: e.target.value })}
            placeholder="1"
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Название схемы *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Схема рамы передняя"
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-auto-gray-700 mb-2">
            Файл схемы (JPEG/PNG) *
          </label>
          <input
            type="file"
            id="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-auto-beige-100 border border-auto-beige-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Загрузка...' : 'Загрузить схему'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default UploadDiagram;