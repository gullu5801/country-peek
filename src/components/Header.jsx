import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/", { replace: true }); // clears history
  };

  return (
    <header className="header">
      <h1 className="header__brand">CountryPeek</h1>

      <nav className="header__nav">
        <button onClick={handleHomeClick} className="nav-btn">
          Home
        </button>

        <Link to="/favourites">Favourites</Link>
      </nav>
    </header>
  );
}

export default Header;