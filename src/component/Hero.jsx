const Hero = ({ text }) => {
  const objects = [
    {
      img: "src/assets/images/photos/portfolio.jpeg",
      title: "Movie Application",
      description: "This is the description for Card 1.",
    },
    {
      img: "src/assets/images/photos/portfolio.jpeg",
      title: "POSE UP-AI posture assistance",
      description: "This is the description for Card 1.",
    },
    {
      img: "src/assets/images/photos/portfolio.jpeg",
      title: "Weather Application",
      description: "This is the description for Card 1.",
    },
  ];

  return (
    <div className="text-center p-10 mt-10 bg-forest-500 text-brown-100 dark:bg-milky-500 dark:text-forest-500">
      <h2 className="text-2xl mb-7">{text}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-100 overflow-x-scroll">
        {objects.map((card, index) => {
          return (
            <div
              key={index}
              className="card p-6 max-h-100 rounded-2xl border-2 flex flex-col gap-6 items-center justify-center"
            >
              <img
                className="object-cover w-full h-48 rounded-2xl"
                src={card.img}
                alt="project"
              />
              <p className="text-xl font-semibold">{card.title}</p>
              <p className="description">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
