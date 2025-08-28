// src/components/TeamView.jsx
import React from "react";
import { useTeam } from "../contexts/TeamContext";

export default function TeamView() {
  const { team, removeFromTeam } = useTeam();
  const slots = [...team, ...Array(6 - team.length).fill(null)];

  return (
    <div className="team-container">
      <div className="team-grid">
        {slots.map((pokemon, i) =>
          pokemon ? (
            <div key={pokemon.id} className="team-slot filled">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="team-img"
              />
              <p className="capitalize">{pokemon.name}</p>

              <button
                className="remove-btn"
                onClick={() => removeFromTeam(pokemon.id)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div key={`empty-${i}`} className="team-slot empty">
              Empty
            </div>
          )
        )}
      </div>
    </div>
  );
}
