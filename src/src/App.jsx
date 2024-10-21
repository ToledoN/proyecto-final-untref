import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Historial from "./pages/Historial";
import Cotizador from "./components/Cotizador";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="historial" element={<Historial />} />
            <Route path="cotizador" element={<Cotizador />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
