import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication"; // Nos permite utilizar el context y traer la información del usuario

export function Home() {
  const { user, logout, loading } = useAuth();

  const navigate = useNavigate();

  // Objeto tipo pokemon y funcion setPokemon
  const [pokemonArray, setPokemonArray] = useState([]);

  // Hook useEffect para tener un cambio secundario dentro de la pagina, y llamar el url con la API
  useEffect(() => {
    // Almacenando resultado en un json para así usarlo en la pagina
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((result) => result.json())
      .then((data) => setPokemonArray(data.results));
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handlePokemon = (name) => {
    console.log(name);
    navigate("/pokemon/" + name);
  };

  if (loading) return <h1>Cargando...</h1>;

  return (
    <div className="w-full m-auto">
      <div className="grid grid-cols-4 gap-8 mx-10">
        {pokemonArray.map((pokemon, pokemonIndex) => (
          <div
            className="bg-white shadow rounded-md w-full h-20 flex justify-center items-center cursor-pointer hover:bg-gray-300 active:bg-gray-500 uppercase"
            key={pokemonIndex}
            onClick={() => handlePokemon(pokemon.name)}
          >
            <p className="font-sans font-semibold">{pokemon.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-md h-20 flex justify-around mt-6 mx-10 items-center">
        <p className="font-sans font-semibold">Bienvenido {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 font-sans text-white flex rounded-md border border-transparent py-2 px-4 text-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
