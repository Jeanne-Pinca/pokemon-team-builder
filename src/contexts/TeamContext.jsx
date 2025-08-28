// src/contexts/TeamContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("pokemonTeam");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever team changes
  useEffect(() => {
    localStorage.setItem("pokemonTeam", JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some((p) => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (id) => {
    setTeam(team.filter((p) => p.id !== id));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}
