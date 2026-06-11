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
export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
  descripcion?: string;
}

export interface RegisterResponse {
  token: string;
  rol: string;
  nombre: string;
  restauranteId: string;
  logoUrl?: string;
}

export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await api.post("/auth/register", data);

  const result = response.data;

  localStorage.setItem("token", result.token);
  localStorage.setItem("user", JSON.stringify(result));

  return result;
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
