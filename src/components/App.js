import "./css/App.css";
import Nav from "./Nav";

const App = ({ children }) => {
  return (
    <>
      <Nav></Nav>
      <div className="container">{children}</div>
    </>
  );
};

export default App;
