import React, { useState } from 'react';
import FrameSearch from './components/FrameSearch';
import GroupList from './components/GroupList';
import SubGroupList from './components/SubGroupList';
import DiagramViewer from './components/DiagramViewer';
import AdminLogin from './components/AdminPanel/AdminLogin';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { partsApi } from './service/api';

import type { PartGroup, SubGroup} from './service/types';

type View = 'search' | 'groups' | 'subgroups' | 'diagram' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('search');
  const [currentFrame, setCurrentFrame] = useState<string>('');
  const [groups, setGroups] = useState<PartGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [subgroups, setSubgroups] = useState<SubGroup[]>([]);
  const [selectedSubGroupId, setSelectedSubGroupId] = useState<number | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleSearchResult = (foundGroups: PartGroup[], frame: string) => {
    setGroups(foundGroups);
    setCurrentFrame(frame);
    setCurrentView('groups');
  };

  const handleSelectGroup = async (groupId: number) => {
    setSelectedGroupId(groupId);
    setCurrentView('subgroups');

    // Здесь нужно загрузить подгруппы
    // Для примера используем заглушку
  try {
    const response = await partsApi.getSubGroups(groupId);
    if (response.success) {
      setSubgroups(response.data);
    }
  } catch (error) {
    console.error('Ошибка загрузки подгрупп:', error);
  }
};


  const handleSelectSubGroup = (subGroupId: number) => {
    setSelectedSubGroupId(subGroupId);
    setCurrentView('diagram');
  };

  const handleBack = () => {
    if (currentView === 'groups') {
      setCurrentView('search');
    } else if (currentView === 'subgroups') {
      setCurrentView('groups');
    } else if (currentView === 'diagram') {
      setCurrentView('subgroups');
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const renderView = () => {
    if (currentView === 'admin') {
      return isAdminLoggedIn ? (
         <AdminDashboard />
      ) : (
        <AdminLogin onLoginSuccess={handleAdminLogin} />
      );
    }

    return (
      <div className="space-y-6">
        {currentView !== 'search' && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors"
          >
            ← Назад
          </button>
        )}

        {currentView === 'search' && (
          <FrameSearch onSearchResult={handleSearchResult} />
        )}

        {currentView === 'groups' && (
          <GroupList
            groups={groups}
            frame={currentFrame}
            onSelectGroup={handleSelectGroup}
          />
        )}

        {currentView === 'subgroups' && selectedGroupId && (
          <SubGroupList
            subgroups={subgroups}
            onSelectSubGroup={handleSelectSubGroup}
          />
        )}

        {currentView === 'diagram' && selectedSubGroupId && (
          <DiagramViewer subGroupId={selectedSubGroupId} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-auto-beige-100 bg-car-texture flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-auto-gray-800 mb-2">
              Каталог запчастей Mitsubishi Pajero
            </h1>
            <p className="text-auto-gray-600 text-lg">
              Поиск по Frame номеру и оригинальным OEM каталогам
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setCurrentView('admin')}
              className="px-4 py-2 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg transition-colors"
            >
              Админ-панель
            </button>
          </div>

          {renderView()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;