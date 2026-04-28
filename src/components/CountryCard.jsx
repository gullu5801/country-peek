import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const {
    name,
    flags,
    population,
    region,
    capital,
    cca3,
  } = country;

  return (
    <Link to={`/country/${cca3}`} className="card">
      {/* FLAG (safe fallback) */}
      <img
        src={
          flags?.svg ||
          "https://via.placeholder.com/300x160?text=No+Flag"
        }
        alt={name?.common || "Country flag"}
        className="card__flag"
      />

      <div className="card__body">
        <h3 className="card__name">
          {name?.common || "Unknown Country"}
        </h3>

        <p>
          <span>Population:</span>{" "}
          {population ? population.toLocaleString() : "N/A"}
        </p>

        <p>
          <span>Region:</span> {region || "Unknown"}
        </p>

        <p>
          <span>Capital:</span> {capital?.[0] ?? "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;