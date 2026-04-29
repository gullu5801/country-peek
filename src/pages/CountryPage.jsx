import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountries";
import "../styles/App.css";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { country, loading, error } = useCountry(code);

  // Loading
  if (loading) {
    return <p className="page-status">Loading country...</p>;
  }

  // Error
  if (error) {
    return <p className="page-status page-status--error">{error}</p>;
  }

  // Safety
  if (!country) return null;

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country;

  // Convert objects → arrays safely
  const languageList = languages ? Object.values(languages) : [];
  const currencyList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : [];

  return (
    <div className="country-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="country-page__layout">
        {/* Flag */}
        <img
          src={
            flags?.svg ||
            "https://via.placeholder.com/500x300?text=No+Flag"
          }
          alt={name?.common || "Country flag"}
          className="country-page__flag"
        />

        <div className="country-page__info">
          <h2 className="country-page__name">
            {name?.common || "Unknown"}
          </h2>

          <p className="country-page__official">
            {name?.official || "No official name"}
          </p>

          <div className="country-page__details">
            {/* LEFT */}
            <div>
              <p>
                <strong>Population:</strong>{" "}
                {population?.toLocaleString() || "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {region || "N/A"}
              </p>
              <p>
                <strong>Subregion:</strong> {subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {capital?.[0] ?? "N/A"}
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <p>
                <strong>Languages:</strong>{" "}
                {languageList.length
                  ? languageList.join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {currencyList.length
                  ? currencyList.join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Borders */}
          {borders && borders.length > 0 && (
            <div className="country-page__borders">
              <strong>Border Countries:</strong>
              <div>
                {borders.map((b) => (
                  <span key={b} className="border-badge">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;