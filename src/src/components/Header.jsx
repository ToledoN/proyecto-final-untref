import { Link } from "react-router-dom";
import "../css/Header.css";
import logo from '../img/toledoMotors-light.png'

export default function Header() {
  return (
    <div className="container-fluid">
      <div className="container">
        <header>
          <nav>
            <Link to="/">
              <img src={logo} alt="Toledo Motors" />
            </Link>
            <Link to="/historial">
              <button className="btn">HISTORIAL</button>
            </Link>
          </nav>
        </header>
      </div>
    </div>
  );
}
