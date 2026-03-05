import React from 'react';
import type { SubGroup } from '../service/types';

interface SubGroupListProps {
  subgroups: SubGroup[];
  onSelectSubGroup: (subgroupId: number) => void;
}

const SubGroupList: React.FC<SubGroupListProps> = ({ subgroups, onSelectSubGroup }) => {
  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-4">
        Подгруппы:
      </h3>

      <div className="space-y-3">
        {subgroups.map((sub) => (
          <div
            key={sub.id}
            className={`border rounded-lg p-4 transition-all cursor-pointer ${
              sub.hasDiagram
                ? 'border-auto-brown-300 bg-auto-beige-100 hover:border-auto-brown-500'
                : 'border-auto-beige-300 bg-auto-beige-50 opacity-75'
            }`}
            onClick={() => sub.hasDiagram && onSelectSubGroup(sub.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-heading font-medium text-auto-gray-800">
                  {sub.name}
                </h4>
                {sub.description && (
                  <p className="text-sm text-auto-gray-600 mt-1">{sub.description}</p>
                )}
              </div>
              {sub.hasDiagram ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Есть схема
                </span>
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                  Нет схемы
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubGroupList;