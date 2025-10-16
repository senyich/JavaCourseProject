import React, { useState, useEffect } from 'react';
import { catalogApi } from '../service/axios.service';
import type { Diagram } from '../service/types';

interface DiagramViewerProps {
  diagramId: number;
}

const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagramId }) => {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiagram = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const diagramData = await catalogApi.getDiagram(diagramId);
        setDiagram(diagramData);
      } catch (err) {
        setError('Диаграмма не найдена или произошла ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    loadDiagram();
  }, [diagramId]);

  const handleRetry = () => {
    const loadDiagram = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const diagramData = await catalogApi.getDiagram(diagramId);
        setDiagram(diagramData);
      } catch (err) {
        setError('Диаграмма не найдена или произошла ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    loadDiagram();
  };

  if (loading) {
    return (
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-8 border border-auto-beige-200">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-auto-brown-200 border-t-auto-brown-600 rounded-full animate-spin mb-4"></div>
          <p className="text-auto-gray-600 font-heading font-medium">Загрузка схемы системы...</p>
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
              <button 
                onClick={handleRetry}
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!diagram) {
    return null;
  }

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-auto-gray-800">{diagram.name}</h2>
        <span className="px-3 py-1 bg-auto-brown-100 text-auto-brown-700 rounded-full text-sm font-medium">
          {diagram.parts.length} компонентов
        </span>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="border-2 border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 shadow-inner">
          <div className="aspect-video bg-auto-gray-100 rounded-lg flex items-center justify-center">
            {/* <img //TODO сделать обработку картинок
              src={`http://localhost:8080${diagram.imageUrl}`}
              alt={diagram.name}
              className="w-full h-auto rounded-lg max-h-96 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-diagram.png';
              }}
            /> */}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-4 pb-2 border-b border-auto-beige-300">
            Компоненты системы
          </h3>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {diagram.parts.map((part, index) => (
              <div
                key={part.id}
                className="border border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 hover:border-auto-brown-300 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="w-6 h-6 bg-auto-brown-600 text-auto-beige-100 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <h4 className="font-heading font-semibold text-auto-gray-800">{part.name}</h4>
                    </div>
                    <p className="text-sm text-auto-gray-600 font-mono bg-auto-beige-200 px-2 py-1 rounded inline-block">
                      {part.partNumber}
                    </p>
                  </div>
                  <span className="text-xl font-heading font-bold text-green-600">
                    ${part.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-sm text-auto-gray-700 mb-3 leading-relaxed">{part.description}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-auto-gray-600 bg-auto-beige-200 px-2 py-1 rounded font-medium">
                    {part.manufacturer}
                  </span>
                  <span className={`px-3 py-1 rounded-full font-medium ${
                    part.quantity > 5 
                      ? 'bg-green-100 text-green-800' 
                      : part.quantity > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {part.quantity > 0 ? `${part.quantity} в наличии` : 'Нет в наличии'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramViewer;