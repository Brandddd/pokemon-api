import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Pokemon() {
  // Declaracion de los Hooks
  const parameters = useParams();
  const navigate = useNavigate();
  const [pokemonInfo, setPokemonInfo] = useState({});

  const fetchPokemonInfo = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + parameters.name
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchPokemonInfo().then((data) => setPokemonInfo(data));
  }, []);

  return (
    <div className="w-full max-w-xs m-auto">
      <div className="bg-white shadow-md rounded-lg px-8 pt-8 pb-10 mb-10">
        <h1 className="text-lg font-bold mb-4 flex justify-center m-auto uppercase">
          {pokemonInfo?.name}
        </h1>
        <img
          src={pokemonInfo?.sprites?.other["official-artwork"]?.front_default}
          alt="Imagen"
        />
        <ul>
          <h3 className="font-semibold mb-4 flex justify-center m-auto">
            Habilidades:{" "}
          </h3>
          {pokemonInfo?.abilities?.map((abilities, abilitiesIndex) => (
            <div
              key={abilitiesIndex}
              className="mb-4 flex justify-center m-auto"
            >
              <li>{abilities.ability?.name}</li>
            </div>
          ))}
        </ul>

        <div className="mb-4 flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 font-sans flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
