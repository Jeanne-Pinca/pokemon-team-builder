// src/SearchRulesText.jsx
import React from "react";
import "./SearchRulesText.css"; // scoped styles for this component

export default function SearchRules() {
  const availableTypes = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  return (
    <div className="search-rules">
      <h2>Search Rules</h2>
      <ul>
        <li>
          Enter a Pokémon <strong>name</strong> (e.g., "pikachu") to find a
          specific Pokémon.
        </li>
        <li>
          Enter a <strong>type</strong> (e.g., "poison") to show all Pokémon
          with that type.
        </li>
        <li>
          Enter "<strong>type only</strong>" (e.g., "poison only") to show only
          pure Pokémon of that type (no dual typings).
        </li>
        <li>
          Enter multiple <strong>types separated by commas</strong> (e.g.,
          "poison, flying") to show Pokémon that have all those types.
        </li>
      </ul>

      <h2>Available Types</h2>
      <div className="type-list">
        {availableTypes.map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
