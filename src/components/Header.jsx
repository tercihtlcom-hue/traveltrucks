import { Link, NavLink } from "react-router-dom";
import "../styles/header.css";

const navClass = ({ isActive }) =>
  isActive ? "nav__link nav__link--active" : "nav__link";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="TravelTrucks home">
          Travel<span>Trucks</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav">
            <li>
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" end className={navClass}>
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
