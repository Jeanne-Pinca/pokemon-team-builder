import { POKEMON_LIST_API } from "../utils/api.js";
import useFetch from "../hooks/useFetch.js";
import PokemonCard from "./PokemonCard.jsx";

export default function Pokedex() {
  const { data, loading, error } = useFetch(POKEMON_LIST_API);

  if (loading) return <p>Loading Pokédex...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.results.map((pokemon, index) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} id={index + 1} />
      ))}
    </div>
  );
}
