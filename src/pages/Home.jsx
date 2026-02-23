import Hero from "../component/hero";

const Home = () => {
  const scrollY = () => {
    const targetDiv = document.querySelector(".introduction");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen  text-center py-12">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 underline underline-offset-8 und">
        Welcome to My Portfolio
      </h1>
      <div className="relative mx-auto w-76 h-76">
        <img
          className="object-cover mask-b-from-50% mask-t-from-90% mask-radial-[50%_50%] mask-radial-from-80%"
          src="src/assets/images/photos/portfolio.jpeg"
          alt="mountains"
        />
      </div>

      <p className="text-8xl text-center brandName mt-10"> Chhumsomary</p>
      <p>ICT Student </p>
      <p>English For Teaching Student</p>

      <div className="contact-icons flex justify-center gap-6 mt-6 mb-6">
        <a href="">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-milky-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a href="">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a href="">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div
        onClick={scrollY}
        className="bg-forest-500 text-milky-500 dark:bg-milky-500 dark:text-forest-500 border-2 border-brown-100 rounded-2xl w-40 mx-auto p-2 animate-bounce mb-10 transition delay-100"
      >
        Scroll Down &#8595;
      </div>
      <Hero text={"Discover my projects and skills"} />
      <section className="introduction p-30 flex flex-col md:flex-row  justify-evenly items-center gap-10">
        <div className="text-left md:w-1/2">
          <p className="text-5xl font-bold">Hello, </p>
          <p className="text-5xl font-bold">I'm Mary!</p>
          <div className="bg-brown-100 h-1 w-50 my-2"></div>

          <p className="mt-5 text-xl text-gray-600 dark:text-white">
            Coffee a Day makes mind awake!
          </p>
          <p className="mt-5 ">
            Junior student in ICT and senior majoring in English Teaching.
            Interested in AI, education, and research, with experience from
            participating in various events and winning First Prize in the
            National AI in Education Competition. Enjoy exploring cross-cultural
            perspectives and sharing knowledge through teaching and content.
          </p>
          <div className="bg-brown-500 border-2 border-brown-100  text-milky-500 rounded-3xl  w-48 mt-10 p-3 text-center cursor-pointer scaleTransition">
            Download my Resume
          </div>
        </div>
        <div className="shadow-2xl bg-amber-500 p-8 rounded-4xl relative  w-80 h-88 ">
          <div className="absolute text-milky-500 bg-forest-500 dark:bg-brown-500 z-50 top-40 left-[-50px] p-5 rounded-4xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            Confidence
          </div>
          <img
            src="src/assets/images/photos/profile.JPG"
            alt="portfolio"
            className="w-70 h-80 object-cover rounded-t-full  absolute top-14 left-5 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          />

          <div className="absolute text-forest-500 bg-yellow-400 z-50 top-60 right-[-50px] p-5 rounded-4xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            Creativity
          </div>
        </div>
      </section>
      {/* <section class="mt-10 flex flex-col md:flex-row gap-10">
        <div class="text-center md:text-left
          <p class="text-5xl font-bold">Hello, I'm Han!</p>
          <p class="mt-5 text-xl text-gray-600">
            Self-taught Graphic Designer with experience in marketing &
            communication.
          </p>
        </div>
        <div class="flex justify-center md:justify-start">
          <img
            src="src/assets/images/photos/portfolio.jpeg"
            alt="Han's photo"
            class="w-64 h-64 rounded-full object-cover shadow-lg"
          />
        </div>
      </section> */}
    </div>
  );
};
export default Home;
