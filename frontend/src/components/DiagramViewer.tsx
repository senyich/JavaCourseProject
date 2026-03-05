import React, { useState, useEffect } from 'react';
import { partsApi } from '../service/api';
import type { Diagram } from '../service/types';

interface DiagramViewerProps {
  subGroupId: number;
}

const DiagramViewer: React.FC<DiagramViewerProps> = ({ subGroupId }) => {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);

  useEffect(() => {
    const loadDiagram = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await partsApi.getDiagram(subGroupId);
        if (response.success) {
          setDiagram(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Ошибка при загрузке схемы');
      } finally {
        setLoading(false);
      }
    };

    loadDiagram();
  }, [subGroupId]);

  if (loading) {
    return (
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-8 text-center">
        <div className="w-16 h-16 border-4 border-auto-brown-200 border-t-auto-brown-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-auto-gray-600">Загрузка схемы...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        ⚠️ {error}
      </div>
    );
  }

  if (!diagram) {
    return null;
  }

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-4">
        {diagram.name}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Схема слева */}
        <div className="lg:col-span-2">
          <div className="border-2 border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 relative">
            <img
              src={`http://localhost:8080${diagram.imageUrl}`}
              alt={diagram.name}
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-diagram.png';
              }}
            />

            {/* Маркеры на схеме (для будущей интерактивности) */}
            {diagram.parts.map((part) => (
              <div
                key={part.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${part.positionX}px`, top: `${part.positionY}px` }}
                onClick={() => setSelectedPart(part.id)}
                onMouseEnter={() => setSelectedPart(part.id)}
                onMouseLeave={() => setSelectedPart(null)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  selectedPart === part.id
                    ? 'bg-auto-brown-600 text-auto-beige-100 scale-125'
                    : 'bg-auto-brown-400 text-auto-beige-100'
                }`}>
                  {part.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Список OEM номеров справа */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-4 pb-2 border-b border-auto-beige-300">
            OEM номера
          </h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {diagram.parts.map((part) => (
              <div
                key={part.id}
                className={`border rounded-xl p-4 transition-all cursor-pointer ${
                  selectedPart === part.id
                    ? 'border-auto-brown-500 bg-auto-brown-50'
                    : 'border-auto-beige-300 bg-auto-beige-100 hover:border-auto-brown-300'
                }`}
                onMouseEnter={() => setSelectedPart(part.id)}
                onMouseLeave={() => setSelectedPart(null)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="w-6 h-6 bg-auto-brown-600 text-auto-beige-100 rounded-full flex items-center justify-center text-xs font-bold">
                    {part.label}
                  </span>
                  <span className="font-mono text-auto-brown-700 font-medium">
                    {part.part.oemNumber}
                  </span>
                </div>

                <h4 className="font-heading font-medium text-auto-gray-800 mb-1">
                  {part.part.name}
                </h4>

                {part.part.description && (
                  <p className="text-sm text-auto-gray-600">
                    {part.part.description}
                  </p>
                )}

                {part.description && (
                  <p className="text-sm text-auto-brown-600 mt-2 italic">
                    {part.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramViewer;