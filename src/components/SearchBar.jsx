import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase());
  };

  return (
    <input
      type="text"
      value={query}
      placeholder="Search by name or type..."
      onChange={handleChange}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
        marginBottom: "20px",
      }}
    />
  );
}

export default SearchBar;
