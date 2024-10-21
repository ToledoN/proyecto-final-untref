import fondo from '../img/astonmartin-2.jpg'

export default function Background() {
  return (
    <div className="container-fluid" id="home">
      <img
        src={fondo}
        alt="Seguros Home"
        className="img-fluid"
        style={{ width: "100%", filter: "brightness(0.5)", objectFit: "cover" }}
      />
    </div>
  );
}
