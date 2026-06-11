import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login({
        email,
        password,
      });

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">POS Restaurante</h1>

        <p className="text-center text-gray-500 mb-6">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500">¿No tienes cuenta? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full border border-slate-900 text-slate-900 py-3 rounded-lg mt-2"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
