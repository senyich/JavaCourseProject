import React, { useState, useEffect } from 'react';
import { adminApi } from '../../service/api';

interface AddGroupProps {
  onSuccess: (message: string) => void;
}

const AddGroup: React.FC<AddGroupProps> = ({ onSuccess }) => {
  const [frames, setFrames] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frame: '',
    groupId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'group' | 'link'>('group');

  // Здесь нужно получить список Frame из БД
  // Для примера пока статические данные
  useEffect(() => {
    // В реальности запрос к API
    setFrames(['L048G-3004771', 'V73W-0000123']);
  }, []);

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.addGroup(formData.name, formData.description);
      if (response.success) {
        onSuccess(`Группа "${formData.name}" добавлена`);
        setFormData({ ...formData, name: '', description: '' });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при добавлении группы');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.frame || !formData.groupId) {
      setError('Выберите Frame и группу');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.linkGroupToFrame(
        formData.frame,
        parseInt(formData.groupId)
      );
      if (response.success) {
        onSuccess(`Группа привязана к ${formData.frame}`);
        setFormData({ ...formData, frame: '', groupId: '' });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при привязке группы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode('group')}
          className={`px-4 py-2 rounded-lg ${mode === 'group' ? 'bg-auto-brown-600 text-white' : 'bg-auto-beige-200'}`}
        >
          Новая группа
        </button>
        <button
          onClick={() => setMode('link')}
          className={`px-4 py-2 rounded-lg ${mode === 'link' ? 'bg-auto-brown-600 text-white' : 'bg-auto-beige-200'}`}
        >
          Привязать к Frame
        </button>
      </div>

      {mode === 'group' ? (
        <form onSubmit={handleAddGroup} className="space-y-4 max-w-md">
          <h3 className="text-lg font-heading font-semibold">Добавить группу</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Название группы *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Рама"
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
            {loading ? 'Добавление...' : 'Добавить группу'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLinkGroup} className="space-y-4 max-w-md">
          <h3 className="text-lg font-heading font-semibold">Привязать группу к Frame</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Выберите Frame</label>
            <select
              value={formData.frame}
              onChange={(e) => setFormData({ ...formData, frame: e.target.value })}
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            >
              <option value="">Выберите Frame</option>
              {frames.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">ID группы</label>
            <input
              type="number"
              value={formData.groupId}
              onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
              placeholder="1"
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-white rounded-lg"
          >
            {loading ? 'Привязка...' : 'Привязать'}
          </button>
        </form>
      )}

      {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
    </div>
  );
};

export default AddGroup;