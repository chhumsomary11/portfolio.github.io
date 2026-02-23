import { useState } from "react";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
function App() {
  return (
    <div className=" bg-milky-500 text-forest-500 dark:bg-forest-500 dark:text-milky-500">
      <Nav />
      <div className=" page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
