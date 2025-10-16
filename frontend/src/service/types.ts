export interface Car {
  id: number;
  brand: string;
  model: string;
  productionYear: number;
  imageUrl: string;
}

export interface System {
  id: number;
  name: string;
  description: string;
  carId: number;
}

export interface Part {
  id: number;
  partNumber: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  manufacturer: string;
}

export interface Diagram {
  id: number;
  name: string;
  imageUrl: string;
  parts: Part[];
}