import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Background from "../components/Background.jsx";
import Welcome from "../components/Welcome.jsx";

export default function Home() {
  const location = useLocation();
  return (
    <div>
      <Header />
      <Background />
      {location.pathname === "/" ? (
        <div>
          <Welcome />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
