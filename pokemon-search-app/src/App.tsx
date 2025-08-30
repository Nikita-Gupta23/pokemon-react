import React, { useState } from "react";
import "./App.css";

const PokemonSearchApp: React.FC = () => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState("");

  const getPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setPokemon(null);

      const res = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query.toLowerCase()}`
      );

      if (!res.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await res.json();
      setPokemon(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main>
      <h1>Pokémon Search App</h1>
      <div className="container">
        {/* Search Form */}
        <form role="search" id="search-form" onSubmit={getPokemon}>
          <label htmlFor="search-input">Search for Pokémon Name or ID:</label>
          <input
            type="text"
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button id="search-button" type="submit">
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Output */}
        {pokemon && (
          <div className="output">
            <div className="top-container">
              <div className="name-and-id">
                <span id="pokemon-name">{pokemon.name.toUpperCase()}</span>
                <span id="pokemon-id">#{pokemon.id}</span>
              </div>

              <div className="size">
                <span id="weight">Weight: {pokemon.weight}</span>
                <span id="height">Height: {pokemon.height}</span>
              </div>

              <div id="sprite-container" className="sprite-container">
                <img
                  id="sprite"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </div>

              <div id="types">
                {pokemon.types.map((t: any) => (
                  <span key={t.type.name} className={`type ${t.type.name}`}>
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bottom-container">
              <table>
                <thead>
                  <tr>
                    <th>Base</th>
                    <th>Stats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>HP:</td>
                    <td id="hp">{pokemon.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <td>Attack:</td>
                    <td id="attack">{pokemon.stats[1].base_stat}</td>
                  </tr>
                  <tr>
                    <td>Defense:</td>
                    <td id="defense">{pokemon.stats[2].base_stat}</td>
                  </tr>
                  <tr>
                    <td>Sp. Attack:</td>
                    <td id="special-attack">{pokemon.stats[3].base_stat}</td>
                  </tr>
                  <tr>
                    <td>Sp. Defense:</td>
                    <td id="special-defense">{pokemon.stats[4].base_stat}</td>
                  </tr>
                  <tr>
                    <td>Speed:</td>
                    <td id="speed">{pokemon.stats[5].base_stat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PokemonSearchApp;
