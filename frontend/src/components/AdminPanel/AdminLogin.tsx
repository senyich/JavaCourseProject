import React, { useState } from 'react';
import { adminApi } from '../../service/api';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.login({ username, password });
      if (response.success) {
        onLoginSuccess();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="bg-auto-beige-50 rounded-xl shadow-md p-8 border border-auto-beige-200 w-full max-w-md">
        <h2 className="text-2xl font-heading font-bold text-auto-gray-800 mb-6 text-center">
          Вход в админ-панель
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              Логин
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-auto-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-auto-beige-100 border border-auto-beige-300 rounded-lg focus:ring-2 focus:ring-auto-brown-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-auto-brown-600 hover:bg-auto-brown-700 text-auto-beige-100 rounded-lg font-heading font-semibold disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              ⚠️ {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;