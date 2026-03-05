import React, { useState } from 'react';
import { adminApi,partsApi } from '../../service/api';

interface AddOemPartProps {
  onSuccess: (message: string) => void;
}

const AddOemPart: React.FC<AddOemPartProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    oemNumber: '',
    name: '',
    description: '',
    diagramId: '',
    label: '',
    positionX: '',
    positionY: '',
    partDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'oem' | 'link'>('oem');

  const handleAddOem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.addOemPart(
        formData.oemNumber,
        formData.name,
        formData.description
      );

      if (response.success) {
        onSuccess(`OEM номер ${formData.oemNumber} добавлен`);
        setFormData({
          ...formData,
          oemNumber: '',
          name: '',
          description: ''
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при добавлении OEM номера');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkToDiagram = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.diagramId || !formData.oemNumber || !formData.label) {
      setError('Заполните обязательные поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Сначала найти деталь по OEM номеру
      const oemResponse = await partsApi.getOemPart(formData.oemNumber);

      if (!oemResponse.success) {
        setError('OEM номер не найден. Сначала создайте деталь.');
        return;
      }

      const oemPartId = oemResponse.data.id; // ← реальный ID из БД!

      // 2. Привязать найденную деталь к схеме
    const response = await adminApi.addPartToDiagram(
      parseInt(formData.diagramId),     // diagramId
      oemPartId,                          // oemPartId
      parseInt(formData.positionX) || 0,  // positionX
      parseInt(formData.positionY) || 0,  // positionY
      formData.label,                      // label
      formData.partDescription             // description (опционально)
    );

      if (response.success) {
        onSuccess(`Деталь ${formData.oemNumber} привязана к схеме`);
        setFormData({
          ...formData,
          diagramId: '',
          oemNumber: '',  // очищаем поле
          label: '',
          positionX: '',
          positionY: '',
          partDescription: ''
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при привязке детали');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode('oem')}
          className={`px-4 py-2 rounded-lg ${mode === 'oem' ? 'bg-auto-brown-600 text-white' : 'bg-auto-beige-200'}`}
        >
          Новый OEM номер
        </button>
        <button
          onClick={() => setMode('link')}
          className={`px-4 py-2 rounded-lg ${mode === 'link' ? 'bg-auto-brown-600 text-white' : 'bg-auto-beige-200'}`}
        >
          Привязать к схеме
        </button>
      </div>

      {mode === 'oem' ? (
        <form onSubmit={handleAddOem} className="space-y-4 max-w-md">
          <h3 className="text-lg font-heading font-semibold">Добавить OEM номер</h3>

          <div>
            <label className="block text-sm font-medium mb-2">OEM номер *</label>
            <input
              type="text"
              value={formData.oemNumber}
              onChange={(e) => setFormData({ ...formData, oemNumber: e.target.value.toUpperCase() })}
              placeholder="MB123456"
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Название детали *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Кронштейн рамы передний"
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
            {loading ? 'Добавление...' : 'Добавить OEM номер'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLinkToDiagram} className="space-y-4 max-w-md">
          <h3 className="text-lg font-heading font-semibold">Привязать к схеме</h3>

          <div>
            <label className="block text-sm font-medium mb-2">ID схемы *</label>
            <input
              type="number"
              value={formData.diagramId}
              onChange={(e) => setFormData({ ...formData, diagramId: e.target.value })}
              placeholder="1"
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">OEM номер *</label>
            <input
              type="text"
              value={formData.oemNumber}
              onChange={(e) => setFormData({ ...formData, oemNumber: e.target.value.toUpperCase() })}
              placeholder="MB123456"
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Номер на схеме *</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="1, 2, 3..."
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">X координата</label>
              <input
                type="number"
                value={formData.positionX}
                onChange={(e) => setFormData({ ...formData, positionX: e.target.value })}
                placeholder="150"
                className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Y координата</label>
              <input
                type="number"
                value={formData.positionY}
                onChange={(e) => setFormData({ ...formData, positionY: e.target.value })}
                placeholder="200"
                className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Описание позиции</label>
            <input
              type="text"
              value={formData.partDescription}
              onChange={(e) => setFormData({ ...formData, partDescription: e.target.value })}
              placeholder="Передний правый кронштейн"
              className="w-full px-4 py-2 bg-auto-beige-100 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-white rounded-lg"
          >
            {loading ? 'Привязка...' : 'Привязать к схеме'}
          </button>
        </form>
      )}

      {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
    </div>
  );
};

export default AddOemPart;