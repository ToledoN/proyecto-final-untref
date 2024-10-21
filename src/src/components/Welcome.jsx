import "../css/Welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container welcome d-flex flex-column text-center my-5 py-5">
      <div className="welcomeTexto mb-3">
        <h1>Toledo Motors Seguros</h1>
        <p>
          En cada póliza que otorgamos, reflejamos el mismo estándar de excelencia
          que usted espera de su automóvil de lujo. Descubra la diferencia de una
          cobertura de seguros que excede las expectativas.{" "}
        </p>
        <b>Bienvenido a un mundo de seguridad y elegancia sin igual.</b>
      </div>
      <div className="p-3">
        <Link to="/cotizador">
          <button className="btn toCotizador">Cotizar</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
