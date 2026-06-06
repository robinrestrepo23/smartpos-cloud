import { api } from "./api";

export interface Categoria {
  id: string;
  nombre: string;
  orden: number;
}

export interface IngredienteProducto {
  insumoId: string;
  cantidad: number;
  unidad: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  imagenUrl?: string;
  categoriaId?: string;
  categoriaNombre?: string;
}

export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId?: string;
  disponible: boolean;
  imagenUrl?: string;
  ingredientes: IngredienteProducto[];
}

export async function getCategorias() {
  const response = await api.get("/menu/categorias");
  return response.data;
}

export async function crearCategoria(nombre: string) {
  const response = await api.post("/menu/categorias", {
    nombre,
  });

  return response.data;
}

export async function getProductos() {
  const response = await api.get("/menu/productos");
  return response.data;
}

export async function crearProducto(producto: ProductoRequest) {
  const response = await api.post("/menu/productos", producto);
  return response.data;
}

export async function getRecetaProducto(productoId: string) {
  const response = await api.get(`/menu/productos/${productoId}/receta`);

  return response.data;
}

export async function actualizarProducto(
  id: string,
  producto: ProductoRequest,
) {
  const response = await api.put(`/menu/productos/${id}`, producto);

  return response.data;
}

export async function cambiarDisponibilidad(id: string, disponible: boolean) {
  await api.patch(`/menu/productos/${id}/disponibilidad`, null, {
    params: { disponible },
  });
}

export async function deleteProducto(id: string) {
  await api.delete(`/menu/productos/${id}`);
}
