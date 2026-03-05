import React, { useState } from 'react';
import { adminApi } from '../../service/api';

interface AddSubGroupProps {
  onSuccess: (message: string) => void;
}

const AddSubGroup: React.FC<AddSubGroupProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    groupId: '',
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.groupId || !formData.name) {
      setError('Заполните обязательные поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.addSubGroup(
        parseInt(formData.groupId),
        formData.name,
        formData.description
      );

      if (response.success) {
        onSuccess(`Подгруппа "${formData.name}" добавлена`);
        setFormData({ groupId: '', name: '', description: '' });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при добавлении подгруппы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold mb-4">Добавить подгруппу</h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-2">ID группы *</label>
          <input
            type="number"
            value={formData.groupId}
            onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
            className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Название подгруппы *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Рама и крепления кузова"
            className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-white rounded-lg"
        >
          {loading ? 'Добавление...' : 'Добавить подгруппу'}
        </button>

        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AddSubGroup;