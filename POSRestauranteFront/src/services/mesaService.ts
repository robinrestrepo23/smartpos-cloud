import { api } from "./api";

export interface Mesa {
  id: string;
  numero: string;
  capacidad: number;
  estado: "DISPONIBLE" | "OCUPADA" | "RESERVADA";
}

export const getMesasDisponibles = async (): Promise<Mesa[]> => {
  const response = await api.get("/mesas/disponibles");
  return response.data;
};
