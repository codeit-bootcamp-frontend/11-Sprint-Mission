import "./styles/common.css";
import { useLocation } from "react-router-dom";
import Headers from "./layout/Headers";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/notfound" && <Headers />}
      <AppRoutes />
    </>
  );
}

export default App;
