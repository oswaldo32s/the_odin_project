import { Outlet } from "react-router-dom";
import Header from "./Pages/Core/Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <footer></footer>
    </>
  );
}

export default App;
