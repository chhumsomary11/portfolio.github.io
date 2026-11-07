import AboutStrip from "../component/AboutStrip";
import Contact from "../component/Contact";
import EducationAwards from "../component/EducationAwards";
import Experience from "../component/Experience";
import Footer from "../component/Footer";
import HeroScene from "../component/HeroScene";
import MiniMary from "../component/MiniMary";
import Nav from "../component/Nav";
import SelectedWork from "../component/SelectedWork";
import SpeechBox from "../component/SpeechBox";

// Nav, hero + speech box, About, Experience, Selected work, Education & awards, Contact, Footer.
export default function Index() {
  return (
    <div className="lotus min-h-screen">
      <Nav />
      <main>
        {/* relative wrapper: the speech box floats over the scene on desktop */}
        <div className="relative">
          <HeroScene />
          <SpeechBox />
        </div>
        <AboutStrip />
        <Experience />
        <SelectedWork />
        <EducationAwards />
        <Contact />
      </main>
      <Footer />
      <MiniMary />
    </div>
  );
}
