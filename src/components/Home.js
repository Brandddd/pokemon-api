import { useEffect, useState } from "react";
import { useAuth } from "../context/Authentication"; // Nos permite utilizar el context y traer la información del usuario

export function Home() {
  const { user, logout, loading } = useAuth();

  // Objeto tipo pokemon y funcion setPokemon
  const [pokemon, setPokemon] = useState([]);

  // Hook useEffect para tener un cambio secundario dentro de la pagina, y llamar el url con la API
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/").then((result) =>
    // Result se almacena en un json con su metodo 
      console.log(result.json())
    );
  });

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <h1>Cargando...</h1>;

  return (
    <div>
      <h1>Bienvido a su sesión {user.email}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
