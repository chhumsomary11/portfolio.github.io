import Contact from "./Contact.jsx";
import Footer from "../component/Footer.jsx";
import Projects from "../component/Projects.jsx";
import Education from "./Education.jsx";
import AboutMe from "./AboutMe.jsx";
import Chatbot from "../component/Chatbot.jsx";
import MarsBackground from "../component/MarsBackground.jsx";
import { contacts } from "../assets/data/contact_icon.jsx";

const Home = () => {
  const scrollY = (section) => {
    const targetDiv = document.querySelector(`.${section}`);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen  home text-center " id="home">
      <MarsBackground />
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4  text-forest-500 dark:text-white  underline underline-offset-8 ">
          Welcome to My Portfolio
        </h1>
        <div className="relative mx-auto w-76 h-76">
          <img
            className="object-cover mask-b-from-50% mask-t-from-90% mask-radial-[50%_50%] mask-radial-from-80%"
            src="/images/portfolio.jpeg"
            alt="mountains"
          />
        </div>
        <p className="text-8xl text-center brandName mt-10 text-amber-500">
          {" "}
          Chhumsomary
        </p>
        <p>ICT Student </p>
        <p>English For Teaching Student</p>
        <div className="contact-icons flex justify-center gap-6 mt-6 mb-6">
          {contacts.map((contact, index) => {
            return (
              <a
                key={index}
                href={contact.link}
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                {contact.svg}
              </a>
            );
          })}
        </div>
      </div>
      <div className="divider"></div>
      <Chatbot />
      <div
        onClick={() => scrollY("introduction")}
        className="bg-forest-500 text-milky-500 dark:bg-milky-500 dark:text-forest-500 border-2 border-brown-100 rounded-2xl w-40 mx-auto p-2 animate-bounce mb-10 transition delay-100"
      >
        Scroll Down &#8595;
      </div>
      {/* about me section */}
      <AboutMe />
      {/* education section */}
      <Education />
      {/* projects section */}
      <Projects className="projects-section" />
      {/* contact section */}
      <Contact />
      <button
        onClick={() => {
          scrollY("home");
        }}
        aria-label="Scroll to top"
        className=" m-0 z-50 sticky left-8 bottom-8 w-10 h-10 flex items-center justify-center rounded-full bg-amber-700 hover:bg-amber-800 text-amber-100 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl animate-bounce"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      </button>
      {/* footer section */}
      <div className="relative">
        <Footer className=" absolute bottom-0 h-full  max-h" />
      </div>
      {/* Scroll to top button */}
    </div>
  );
};
export default Home;
