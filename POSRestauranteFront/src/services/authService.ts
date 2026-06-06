import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  rol: string;
  nombre: string;
  restauranteId: string;
  logoUrl?: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("/auth/login", credentials);

  const data = response.data;

  localStorage.setItem("token", data.token);

  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

export async function getPerfil() {
  const response = await api.get("/auth/perfil");
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");

  localStorage.removeItem("user");
}
