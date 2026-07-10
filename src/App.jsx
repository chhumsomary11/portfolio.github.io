import Index from "./pages/Index.jsx";
import ProjectsShowcase from "./pages/ProjectShowcase.jsx";
import { Routes, Route } from "react-router-dom";

import Nav from "./component/Nav";

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-milky-500
        text-forest-500
        dark:bg-forest-500
        dark:text-milky-500
      "
    >
      <Nav />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<ProjectsShowcase />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
