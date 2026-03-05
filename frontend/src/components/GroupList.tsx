import React from 'react';
import type { PartGroup } from '../service/types';

interface GroupListProps {
  groups: PartGroup[];
  frame: string;
  onSelectGroup: (groupId: number) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, frame, onSelectGroup }) => {
  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <div className="mb-4 pb-4 border-b border-auto-beige-300">
        <h2 className="text-xl font-heading font-bold text-auto-gray-800">
          Frame: <span className="text-auto-brown-600">{frame}</span>
        </h2>
        <p className="text-auto-gray-600">Выберите группу запчастей:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="border border-auto-beige-300 rounded-xl p-4 bg-auto-beige-100 hover:border-auto-brown-300 transition-all cursor-pointer"
            onClick={() => onSelectGroup(group.id)}
          >
            <h3 className="text-lg font-heading font-semibold text-auto-gray-800 mb-2">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-auto-gray-600 text-sm">{group.description}</p>
            )}
            {group.subGroups && group.subGroups.length > 0 && (
              <div className="mt-2 text-sm text-auto-brown-600">
                {group.subGroups.length} подгрупп
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;