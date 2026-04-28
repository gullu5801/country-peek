import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import "../styles/App.css";

function Home() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset when input is empty
    if (!query.trim()) {
      setCountries([]);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => {
          if (!res.ok) throw new Error("No countries found");
          return res.json();
        })
        .then((data) => {
          // ✅ Edge case handling
          if (!Array.isArray(data) || data.length === 0) {
            setCountries([]);
            setError("No countries found.");
          } else {
            setCountries(data);
            setError(null);
          }
        })
        .catch(() => {
          setCountries([]);
          setError("No countries found.");
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {/* Loading */}
      {loading && <p className="home__status">Loading...</p>}

      {/* Error */}
      {error && (
        <p className="home__status home__status--error">{error}</p>
      )}

      {/* Cards */}
      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && countries.length === 0 && query && (
        <p className="home__status">No results found.</p>
      )}

      {/* Initial Placeholder */}
      {!loading && !error && countries.length === 0 && !query && (
        <p className="home__status">
          Start searching to explore countries.
        </p>
      )}
    </div>
  );
}

export default Home;