// fetches the cards from useFetch using the API
// src/components/Pokedex.jsx
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useTeam } from "../contexts/TeamContext";
import SearchBar from "./SearchBar";

export default function Pokedex() {
  const { addToTeam, team } = useTeam();
  const { data, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  const [search, setSearch] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  // Fetch detailed data for each Pokémon (to get types)
  useEffect(() => {
    if (!data?.results) return;

    async function fetchDetails() {
      const promises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((t) => t.type.name),
        };
      });

      const detailedList = await Promise.all(promises);
      setPokemonList(detailedList);
    }

    fetchDetails();
  }, [data]);

  if (loading) return <p>Loading Pokédex...</p>;
  if (error) return <p>Error loading Pokédex: {error}</p>;
  if (!pokemonList.length) return <p>Loading Pokémon details...</p>;

  // --- Search Logic ---
  const normalizedSearch = search.toLowerCase().trim();
  const filtered = pokemonList.filter((pokemon) => {
    // Case 1: "type only"
    if (normalizedSearch.endsWith(" only")) {
      const type = normalizedSearch.replace(" only", "").trim();
      return pokemon.types.length === 1 && pokemon.types[0] === type;
    }

    // Case 2: multi-type search (comma or space separated)
    const searchParts = normalizedSearch.split(/[\s,]+/).filter(Boolean);
    if (searchParts.length > 1) {
      // must match *all* search terms as types
      return searchParts.every((term) => pokemon.types.includes(term));
    }

    // Case 3: regular search (name or type match)
    return (
      pokemon.name.toLowerCase().includes(normalizedSearch) ||
      pokemon.types.some((type) =>
        type.toLowerCase().includes(normalizedSearch)
      )
    );
  });

  return (
    <div className="pokedex">
      {/* Search bar component */}
      <SearchBar value={search} onChange={setSearch} />

      <div className="pokedex-grid">
        {filtered.map((pokemon) => {
          const inTeam = team.some((p) => p.id === String(pokemon.id));

          return (
            <div key={pokemon.id} className="pokedex-card">
              {/* Types at the top */}
              <div className="types">
                {pokemon.types.map((type) => (
                  <span key={type} className={`type-badge type-${type}`}>
                    {type}
                  </span>
                ))}
              </div>

              {/* Pokémon sprite */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />

              {/* Pokémon name with dedicated class */}
              <p className="pokemon-name">{pokemon.name}</p>

              {/* Add button */}
              <button
                onClick={() =>
                  addToTeam({ id: String(pokemon.id), name: pokemon.name })
                }
                disabled={inTeam || team.length >= 6}
                className={
                  inTeam
                    ? "btn in-team"
                    : team.length >= 6
                    ? "btn team-full"
                    : "btn add-team"
                }
              >
                {inTeam
                  ? "In Team"
                  : team.length >= 6
                  ? "Team Full"
                  : "Add to Team"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
