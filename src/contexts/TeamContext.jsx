//contexts/TeamContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("pokemon-team");
    return saved ? JSON.parse(saved) : [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("pokemon-team", JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length >= 6) return;
    if (team.find((p) => p.id === pokemon.id)) return;
    setTeam([...team, pokemon]);
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

export const useTeam = () => useContext(TeamContext);
