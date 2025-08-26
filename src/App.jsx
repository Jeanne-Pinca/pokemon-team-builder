// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import useFetch from "./hooks/useFetch";
import { POKEMON_LIST_API } from "./utils/api";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const { data, loading, error } = useFetch(POKEMON_LIST_API);

  // team + persistence
  const [team, setTeam] = useState(() => {
    try {
      const saved = localStorage.getItem("pokemonTeam");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pokemonTeam", JSON.stringify(team));
    } catch {}
  }, [team]);

  // search & type helpers
  const [query, setQuery] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [typePokemonMap, setTypePokemonMap] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [typeError, setTypeError] = useState(null);

  // Load type list
  useEffect(() => {
    let cancelled = false;
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load types");
        return res.json();
      })
      .then((json) => {
        if (!cancelled && json?.results) {
          setTypeList(json.results.map((r) => r.name));
        }
      })
      .catch((err) => {
        if (!cancelled) setTypeError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch Pokémon per type when needed
  useEffect(() => {
    if (!query || typeList.length === 0) return;
    const q = query.trim().toLowerCase();
    if (!q) return;

    const matchingTypes = typeList.filter((t) => t.includes(q));
    const missing = matchingTypes.filter((t) => !typePokemonMap[t]);
    if (missing.length === 0) return;

    let cancelled = false;
    setLoadingTypes(true);
    Promise.all(
      missing.map((typeName) =>
        fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Type ${typeName} fetch failed`);
            return res.json();
          })
          .then((json) => {
            const names = new Set(json.pokemon.map((p) => p.pokemon.name));
            return { typeName, names };
          })
      )
    )
      .then((results) => {
        if (cancelled) return;
        setTypePokemonMap((prev) => {
          const next = { ...prev };
          results.forEach(({ typeName, names }) => {
            next[typeName] = names;
          });
          return next;
        });
      })
      .catch((err) => {
        if (!cancelled) setTypeError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingTypes(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, typeList, typePokemonMap]);

  // Add / remove helpers
  const addToTeam = (pokemon) => {
    if (team.length >= 6) return;
    if (team.find((p) => p.id === pokemon.id)) return;
    setTeam((prev) => [...prev, pokemon]);
  };

  const removeFromTeam = (id) => {
    setTeam((prev) => prev.filter((p) => p.id !== id));
  };

  // Filtering by name or type
  const filteredPokemon = useMemo(() => {
    if (!data?.results) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data.results;

    const matchingTypes = typeList.filter((t) => t.includes(q));
    const typeNameSet = new Set();
    matchingTypes.forEach((t) => {
      const s = typePokemonMap[t];
      if (s) s.forEach((n) => typeNameSet.add(n));
    });

    return data.results.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const typeMatch = typeNameSet.size > 0 && typeNameSet.has(p.name);
      return nameMatch || typeMatch;
    });
  }, [data, query, typeList, typePokemonMap]);

  if (loading) return <p>Loading Pokédex...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <h1>Pokédex</h1>

      {/* Team View */}
      <h2>Your Team</h2>
      <div className="team-grid">
        {[...Array(6)].map((_, idx) => {
          const pokemon = team[idx];
          return (
            <div
              key={idx}
              onClick={() => pokemon && removeFromTeam(pokemon.id)}
              className={`team-slot ${pokemon ? "filled" : "empty"}`}
              title={pokemon ? `Click to remove ${pokemon.name}` : "Empty slot"}
            >
              {pokemon ? (
                <>
                  <img src={pokemon.image} alt={pokemon.name} width="72" height="72" />
                  <p>
                    #{pokemon.id} {pokemon.name}
                  </p>
                  <small className="remove-text">Click to Remove</small>
                </>
              ) : (
                <p className="empty-text">Empty Slot</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <SearchBar onSearch={(val) => setQuery(val)} />
        <div className="search-status">
          {loadingTypes
            ? "Looking up types..."
            : typeError
            ? `Type error: ${typeError}`
            : ""}
        </div>
      </div>

      {/* Pokédex Grid */}
      <h2>Pokédex</h2>
      <div className="pokedex-grid">
        {filteredPokemon.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const formatted = {
            id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };

          const isInTeam = team.some((p) => p.id === formatted.id);
          const teamFull = team.length >= 6;

          return (
            <div key={id} className="pokemon-card">
              <img src={formatted.image} alt={formatted.name} width="96" height="96" />
              <h3>
                #{formatted.id} {formatted.name}
              </h3>
              <button
                onClick={() => addToTeam(formatted)}
                disabled={isInTeam || teamFull}
                className="add-btn"
              >
                {isInTeam ? "In Team" : teamFull ? "Team Full" : "Add to Team"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
