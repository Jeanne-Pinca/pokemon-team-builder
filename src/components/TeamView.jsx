export default function TeamView({ team, removeFromTeam }) {
  return (
    <div className="team-view">
      {team.map((pokemon) => (
        <div
          key={pokemon.id}
          className="team-slot"
          onClick={() => removeFromTeam(pokemon.id)}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="team-img"
          />
          <p className="capitalize">{pokemon.name}</p>
        </div>
      ))}

      {/* Empty slots */}
      {Array.from({ length: 6 - team.length }).map((_, i) => (
        <div key={i} className="team-slot empty">
          Empty
        </div>
      ))}
    </div>
  );
}
