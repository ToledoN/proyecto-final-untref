import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Historial() {
  const cotizacionesGuardadas =
    JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
  
  
    const handleClearButton = () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Los datos serán eliminados permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Historial borrado exitosamente.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  };

  return (
    <div className="container historial">
      <ToastContainer />
      <div className="text-center card mt-5 p-5">
        <h1>HISTORIAL DE COTIZACIONES</h1>
        <table className="historial-tabla table table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Año</th>
              <th>Modificaciones</th>
              <th>Precio del Seguro</th>
            </tr>
          </thead>
          <tbody>
            {cotizacionesGuardadas.map((cotizacion, index) => (
              <tr key={index}>
                <td>{cotizacion.fechaCotizacion}</td>
                <td>{cotizacion.marca}</td>
                <td>{cotizacion.tipo}</td>
                <td>{cotizacion.anio}</td>
                <td>{cotizacion.tieneModificaciones ? "Sí" : "No"}</td>
                <td>
                  <strong>${cotizacion.precio}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="botones d-flex justify-content-between">
          <Link to="/cotizador">
            <button className="btn">Volver</button>
          </Link>
          <button className="btn" onClick={handleClearButton}>
            Borrar historial
          </button>
        </div>
      </div>
    </div>
  );
}
