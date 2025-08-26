export default function PokemonCard({ name, id }) {
  // Official Pokémon sprite (using the ID)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="border rounded-lg p-4 text-center shadow hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={name}
        className="mx-auto w-20 h-20"
      />
      <h3 className="capitalize mt-2 text-lg font-semibold">{name}</h3>
      <button
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled
      >
        Add to Team
      </button>
    </div>
  );
}
