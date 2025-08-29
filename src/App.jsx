// src/App.jsx
import React from "react";
import Pokedex from "./components/Pokedex";
import TeamView from "./components/TeamView";
import SearchRules from "./components/SearchRulesText"; 
import { TeamProvider } from "./contexts/TeamContext";
import "./App.css";

export default function App() {
  return (
    <TeamProvider>
      <div className="app">
        <h1>Pokémon Team Builder</h1>
        <TeamView />
        <h2>Pokédex</h2>
        <SearchRules /> 
        <Pokedex />
      </div>
    </TeamProvider>
  );
}
