import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(initialQuery);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 Update query + URL
  const handleSearch = (value) => {
    setQuery(value);

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
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
          if (!Array.isArray(data) || data.length === 0) {
            setCountries([]);
            setError("No countries match your search.");
          } else {
            setCountries(data);
            setError(null);
          }
        })
        .catch(() => {
          setCountries([]);
          setError("Something went wrong. Please try again.");
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={handleSearch} />

      {loading && <p className="home__status">Loading...</p>}

      {error && (
        <p className="home__status home__status--error">{error}</p>
      )}

      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}

      {!loading && !error && countries.length === 0 && query && (
        <p className="home__status">No results found.</p>
      )}

      {!loading && !error && countries.length === 0 && !query && (
        <p className="home__status">
          Start searching to explore countries.
        </p>
      )}
    </div>
  );
}

export default Home;