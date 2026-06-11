import { api } from "./api";

export const obtenerDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

export const obtenerRecomendacionIA = async () => {
  const { data } = await api.get("/dashboard/recomendacion-ia");
  return data;
};
