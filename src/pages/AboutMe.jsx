import DownloadResume from "../component/DownloadResume";
// import {porfolioImage}

const AboutMe = () => {
  return (
    <section
      id="about"
      className="introduction p-30 flex flex-col md:flex-row  justify-evenly items-center gap-10"
    >
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
        <DownloadResume />
      </div>
      <div className="shadow-2xl bg-amber-500 p-8 rounded-4xl relative  w-80 h-88 ">
        <div className="absolute text-milky-500 bg-forest-500 dark:bg-brown-500 z-50 top-40 left-[-50px] p-5 rounded-4xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          Confidence
        </div>
        <img
          src="/images/profile.JPG"
          alt="portfolio"
          className="w-70 h-80 object-cover rounded-t-full  absolute top-14 left-5 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        />

        <div className="absolute text-forest-500 bg-yellow-400 z-50 top-60 right-[-50px] p-5 rounded-4xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          Creativity
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
