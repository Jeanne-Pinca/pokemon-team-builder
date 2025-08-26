import PokemonCard from "./PokemonCard";

export default function PokedexGrid({ data, team, addToTeam, search }) {
  // Filter Pokémon by name (case insensitive)
  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pokedex-grid">
      {filteredData.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          id={index + 1} // Pokémon ID = index + 1
          addToTeam={addToTeam}
          isInTeam={team.some((p) => p.id === index + 1)}
          isFull={team.length >= 6}
        />
      ))}
    </div>
  );
}
