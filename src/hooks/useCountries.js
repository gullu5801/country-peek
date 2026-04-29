import { useState, useEffect } from "react";

function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    setLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Country not found");
          }
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        // API returns an array → take first item
        if (Array.isArray(data) && data.length > 0) {
          setCountry(data[0]);
        } else {
          setCountry(null);
          setError("No data available");
        }
      })
      .catch((err) => {
        setCountry(null);
        setError(
          err.message === "Country not found"
            ? "Country not found."
            : "Something went wrong. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }, [code]);

  return { country, loading, error };
}

export default useCountry;