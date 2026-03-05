// types.ts
export interface Vehicle {
  frame: string;
  brand: string;
  model: string;
  year: number;
}

export interface PartGroup {
  id: number;
  name: string;
  description: string;
  subGroups?: SubGroup[];
}

export interface SubGroup {
  id: number;
  name: string;
  description: string;
  groupId: number;
  hasDiagram: boolean;
}

export interface Diagram {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
  subGroupId: number;
  parts: DiagramPart[];
}

export interface OemPart {
  id: number;
  oemNumber: string;
  name: string;
  description?: string;
}

export interface DiagramPart {
  id: number;
  positionX: number;
  positionY: number;
  label: string;
  description?: string;
  part: OemPart;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}