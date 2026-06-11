import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register(form);
      navigate("/");
    } catch (err: any) {
      setError("Error al registrar restaurante");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Registrar Restaurante</h1>

        <p className="text-slate-400 mb-6">
          Crea tu cuenta para empezar a gestionar tu negocio
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre completo"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
            required
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
          />

          <input
            name="direccion"
            placeholder="Dirección"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción del restaurante"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              p-3
              rounded-xl
              font-semibold
            "
          >
            {loading ? "Creando cuenta..." : "Registrar restaurante"}
          </button>
        </form>
      </div>
    </div>
  );
}
