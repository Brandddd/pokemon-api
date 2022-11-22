import { useAuth } from "../context/Authentication"; // Nos permite utilizar el context y traer la información del usuario

export function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <h1>Cargando...</h1>

  return (
    <div>
      <h1>Bienvido a su sesión {user.email}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
