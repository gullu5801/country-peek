import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCountry from "../hooks/useCountries";
import "../styles/App.css";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { country, loading, error } = useCountry(code);

  // 🔙 Smart back navigation
  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1); // go back to search page
    } else {
      navigate("/"); // fallback
    }
  };

  if (loading) {
    return <p className="page-status">Loading country...</p>;
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>;
  }

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

  const languageList = languages ? Object.values(languages) : [];
  const currencyList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : [];

  return (
    <div className="country-page">
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>

      <div className="country-page__layout">
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
            {name?.official || "N/A"}
          </p>

          <div className="country-page__details">
            <div>
              <p><strong>Population:</strong> {population?.toLocaleString() || "N/A"}</p>
              <p><strong>Region:</strong> {region || "N/A"}</p>
              <p><strong>Subregion:</strong> {subregion || "N/A"}</p>
              <p><strong>Capital:</strong> {capital?.[0] ?? "N/A"}</p>
            </div>

            <div>
              <p><strong>Languages:</strong> {languageList.join(", ") || "N/A"}</p>
              <p><strong>Currencies:</strong> {currencyList.join(", ") || "N/A"}</p>
            </div>
          </div>

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