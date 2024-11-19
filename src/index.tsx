import ReactDOM from "react-dom/client";
import Routers from "router/Routers";
import "./style/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <Routers />
  // </React.StrictMode>
);
