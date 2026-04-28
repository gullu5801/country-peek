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
    // Reset if empty input
    if (!query.trim()) {
      setCountries([]);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => {
          // 🔥 Better error differentiation
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("No countries found");
            } else {
              throw new Error("API error");
            }
          }
          return res.json();
        })
        .then((data) => {
          // 🔥 Edge case: empty/invalid response
          if (!Array.isArray(data) || data.length === 0) {
            setCountries([]);
            setError("No countries match your search.");
          } else {
            setCountries(data);
            setError(null);
          }
        })
        .catch((err) => {
          setCountries([]);

          if (err.message === "No countries found") {
            setError("No countries match your search.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {/* Loading */}
      {loading && (
        <p className="home__status">Fetching countries...</p>
      )}

      {/* Error */}
      {error && (
        <p className="home__status home__status--error">
          {error}
        </p>
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