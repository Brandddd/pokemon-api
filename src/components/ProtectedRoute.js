// Rutas protegidas, valida si el usuario existe, si no es así, se retorna hacia el login
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authentication";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Cargando...</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
