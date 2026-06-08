import { api } from "./api";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  disponible: boolean;
  categoriaId: string;
  categoriaNombre: string;
}

export interface CartItem {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  nota?: string;
}

export const getProducts = async () => {
  const response = await api.get("/menu/productos");
  return response.data;
};
