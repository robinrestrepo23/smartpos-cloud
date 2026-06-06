import { api } from "./api";

export interface Supplier {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  activo: boolean;
}
export interface SupplierRequest {
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  activo?: boolean;
}

export const getSuppliers = async () => {
  const response = await api.get("/proveedores");
  return response.data;
};

export const crearProveedor = async (data: SupplierRequest) => {
  const response = await api.post("/proveedores", data);
  return response.data;
};

export const actualizarProveedor = async (
  id: string,
  data: SupplierRequest,
) => {
  const response = await api.put(`/proveedores/${id}`, data);

  return response.data;
};

export const eliminarProveedor = async (id: string) => {
  await api.delete(`/proveedores/${id}`);
};
