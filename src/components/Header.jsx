import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleHomeClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      <h1 className="header__brand">CountryPeek</h1>

      <nav className="header__nav">
        <button className="nav-btn" onClick={handleHomeClick}>
          Home
        </button>

        <Link to="/favourites">Favourites</Link>

        {/* 🌙 THEME TOGGLE */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;