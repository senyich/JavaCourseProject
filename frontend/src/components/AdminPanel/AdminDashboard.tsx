import React, { useState } from 'react';
import { adminApi } from '../../service/api';
import AddFrame from './AddFrame';
import AddGroup from './AddGroup';
import AddSubGroup from './AddSubGroup';
import UploadDiagram from './UploadDiagram';
import AddOemPart from './AddOemPart';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('frames');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogout = async () => {
    await adminApi.logout();
    window.location.reload();
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-auto-beige-50 rounded-xl shadow-md p-6 border border-auto-beige-200">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-auto-beige-300">
        <h2 className="text-2xl font-heading font-bold text-auto-gray-800">
          Админ-панель
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Выйти
        </button>
      </div>

      {/* Вкладки */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'frames', label: 'Frame номера' },
          { id: 'groups', label: 'Группы' },
          { id: 'subgroups', label: 'Подгруппы' },
          { id: 'diagrams', label: 'Схемы' },
          { id: 'oem', label: 'OEM номера' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-auto-brown-600 text-auto-beige-100'
                : 'bg-auto-beige-200 text-auto-gray-700 hover:bg-auto-brown-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Сообщения */}
      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Контент вкладок */}
      <div className="mt-4">
        {activeTab === 'frames' && (
          <AddFrame onSuccess={(msg) => showMessage('success', msg)} />
        )}
        {activeTab === 'groups' && (
          <AddGroup onSuccess={(msg) => showMessage('success', msg)} />
        )}
        {activeTab === 'subgroups' && (
         <AddSubGroup onSuccess={(msg: string) => showMessage('success', msg)} />
        )}
        {activeTab === 'diagrams' && (
          <UploadDiagram onSuccess={(msg) => showMessage('success', msg)} />
        )}
        {activeTab === 'oem' && (
          <AddOemPart onSuccess={(msg) => showMessage('success', msg)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;