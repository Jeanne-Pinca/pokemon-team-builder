import React from "react";
import "./SearchRulesText.css"; // scoped styles for this component

export default function SearchRules() {
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
      </ul>
    </div>
  );
}
