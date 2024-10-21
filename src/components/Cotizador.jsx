import Selector from "./selector";
import datosSeguro from "../datosSeguro.json";
import { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import CountUp from "react-countup";

function Cotizador() {
  // Estados para controlar los factores de marca, tipo y año
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [anioSeleccionado, setAnioSeleccionado] = useState("");

  // Estado para controlar si hay modificaciones
  const [tieneModificaciones, setTieneModificaciones] = useState(false);

  // Estado para almacenar el precio calculado
  const [seguroPrecio, setSeguroPrecio] = useState(null);

  // Estado para almacenar si se realizó una cotización
  const [cotizado, setCotizado] = useState(false);

  // Filtra los datos para obtener las opciones específicas de marca, tipo y año
  const marcaOpciones = datosSeguro.filter(
    (item) => item.categoria === "marca"
  );
  const tipoOpciones = datosSeguro.filter((item) => item.categoria === "tipo");
  const anioOpciones = datosSeguro.filter((item) => item.categoria === "año");

  // Cuando se confirman modificaciones
  const handleModificacionesChange = (event) => {
    setTieneModificaciones(event.target.checked);
  };

  // Función para cotizar en base a lo elegido

  const realizarCotizacion = () => {
    let precio = 160000;

    precio = precio * marcaSeleccionada * tipoSeleccionado * anioSeleccionado;

    // Factor adicional para coches con modificaciones

    if (tieneModificaciones) {
      const modificacionesFactor = 1.2;
      precio = precio * modificacionesFactor;
    }

    setSeguroPrecio(precio.toFixed(0));
    setCotizado(true);
  };

  // Validación de datos
  const datosCompletos = () =>
    marcaSeleccionada !== "" &&
    tipoSeleccionado !== "" &&
    anioSeleccionado !== ""
      ? true
      : false;

  // Alerta en caso de no validar datos
  const alertaError = () =>
    Swal.fire({
      title: "Datos no completados",
      text: "Por favor, ingrese todos los datos solicitados.",
      icon: "error",
    });

  const handleCotizacionClick = () => {
    // Si los datos están completos, cotizar; si no, alerta
    datosCompletos() ? realizarCotizacion() : alertaError();
  };

  // En base al factor seleccionado, obtener ID para guardar en el historial
  // TODO: Creo es más conveniente seleccionar el ID en vez de el factor en el select
  const marcaSeleccionadaId = marcaOpciones.find(
    (item) => item.factor === parseFloat(marcaSeleccionada)
  )?.id;
  const tipoSeleccionadoId = tipoOpciones.find(
    (item) => item.factor === parseFloat(tipoSeleccionado)
  )?.id;
  const anioSeleccionadoId = anioOpciones.find(
    (item) => item.factor === parseFloat(anioSeleccionado)
  )?.id;

  // Guardado de cotización en historial
  const guardarCotizacion = () => {
    const cotizacion = {
      fechaCotizacion: new Date().toLocaleString(),
      marca: marcaSeleccionadaId,
      tipo: tipoSeleccionadoId,
      anio: anioSeleccionadoId,
      tieneModificaciones: tieneModificaciones,
      precio: seguroPrecio,
    };

    const historialCotizaciones =
      JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    historialCotizaciones.push(cotizacion);
    localStorage.setItem(
      "historialCotizaciones",
      JSON.stringify(historialCotizaciones)
    );

    toast.success("Cotización guardada exitosamente.", {
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
  };

  return (
    <div className="container cotizador">
      <ToastContainer />
      <div className="card text-center mt-5 py-5 px-4">
        <h1>COTIZADOR DE SEGUROS</h1>
        <Selector
          label="Marca"
          options={marcaOpciones}
          onSelect={(value) => setMarcaSeleccionada(value)}
        />
        <Selector
          label="Tipo"
          options={tipoOpciones}
          onSelect={(value) => setTipoSeleccionado(value)}
        />
        <Selector
          label="Año de fabricación"
          options={anioOpciones}
          onSelect={(value) => setAnioSeleccionado(value)}
        />
        <div className="selector">
          <label>
            ¿Tiene modificaciones?
            <input
              type="checkbox"
              checked={tieneModificaciones}
              onChange={handleModificacionesChange}
            />
          </label>
        </div>
        <button className="btn" onClick={handleCotizacionClick}>
          Cotizar
        </button>
        {cotizado ? (
          <div className="pt-4 d-flex flex-column text-center">
            <h2 className="fs-5">Precio del seguro: </h2>
            <h1>
              <CountUp start={0} end={seguroPrecio} duration={1} prefix="$">
                {({ countUpRef }) => (
                  <div className="pb-4">
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </h1>
            <button className="btn" onClick={guardarCotizacion}>
              Guardar en historial
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cotizador;
