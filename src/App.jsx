import Index from "./pages/Index.jsx";

// import { Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
function App() {
  return (
    <div className=" bg-milky-500 text-forest-500 dark:bg-forest-500 dark:text-milky-500">
      <Nav />
      <div className=" page">
        <Index />
      </div>
    </div>
  );
}

export default App;
