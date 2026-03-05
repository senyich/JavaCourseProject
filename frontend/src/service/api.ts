// api.ts
import axios from 'axios';
import type {
  ApiResponse, PartGroup, SubGroup, Diagram,
  OemPart, LoginRequest, LoginResponse, Vehicle
} from './types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Интерцептор для добавления токена авторизации
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Публичные API
export const partsApi = {
  // Поиск по Frame номеру
  searchByFrame: async (frame: string): Promise<ApiResponse<PartGroup[]>> => {
    const response = await api.get(`/parts/search?frame=${frame}`);
    return response.data;
  },

  // Получить подгруппы для группы
  getSubGroups: async (groupId: number): Promise<ApiResponse<SubGroup[]>> => {
    const response = await api.get(`/parts/groups/${groupId}/subgroups`);
    return response.data;
  },

  // Получить схему для подгруппы
  getDiagram: async (subGroupId: number): Promise<ApiResponse<Diagram>> => {
    const response = await api.get(`/parts/diagrams/${subGroupId}`);
    return response.data;
  },

  // Получить информацию по OEM номеру
  getOemPart: async (oemNumber: string): Promise<ApiResponse<OemPart>> => {
    const response = await api.get(`/parts/oem/${oemNumber}`);
    return response.data;
  }
};

// Админ API (требуют авторизацию)
export const adminApi = {
  // Вход
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/admin/login', data);
    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },

  // Выход
  logout: async (): Promise<void> => {
    await api.post('/admin/logout');
    localStorage.removeItem('adminToken');
  },

  // Добавить автомобиль (Frame)
  addVehicle: async (vehicle: Vehicle): Promise<ApiResponse<Vehicle>> => {
    const response = await api.post('/admin/vehicles', vehicle);
    return response.data;
  },

  // Добавить группу
  addGroup: async (name: string, description: string): Promise<ApiResponse<PartGroup>> => {
    const response = await api.post('/admin/groups', { name, description });
    return response.data;
  },

  // Добавить подгруппу
  addSubGroup: async (groupId: number, name: string, description: string): Promise<ApiResponse<SubGroup>> => {
    const response = await api.post(`/admin/groups/${groupId}/subgroups`, { name, description });
    return response.data;
  },

  // Привязать группу к Frame
  linkGroupToFrame: async (frame: string, groupId: number): Promise<ApiResponse<null>> => {
    const response = await api.post(`/admin/vehicles/${frame}/groups?groupId=${groupId}`);
    return response.data;
  },

  // Загрузить схему
  uploadDiagram: async (subGroupId: number, name: string, file: File, description?: string): Promise<ApiResponse<string>> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subGroupId', subGroupId.toString());
    formData.append('name', name);
    if (description) formData.append('description', description);

    const response = await api.post('/admin/upload/diagram', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Добавить OEM номер
  addOemPart: async (oemNumber: string, name: string, description?: string): Promise<ApiResponse<OemPart>> => {
    const response = await api.post('/admin/oem-parts', { oemNumber, name, description });
    return response.data;
  },

  // Добавить деталь на схему
 addPartToDiagram: async (
   diagramId: number,
   oemPartId: number,
   positionX: number,
   positionY: number,
   label: string,
   description?: string
 ) => {
   const response = await api.post(`/admin/diagrams/${diagramId}/parts?oemPartId=${oemPartId}`, {
     positionX,
     positionY,
     label,
     description
     // НЕ передаем oemPartId в теле!
   });
   return response.data;
 }
};