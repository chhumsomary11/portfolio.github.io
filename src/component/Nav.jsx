import { Link } from "react-router-dom";
import DarkBtn from "./DarkBtn";
const Nav = () => {
  return (
    <div className=" justify-between items-center flex-row  fixed flex z-10  w-full p-4 bg-milky-500 dark:bg-forest-500 ">
      <Link
        className=" brandName hoverEffect  text-forest-500 text-min text-3xl flex flex-row items-center gap-2 dark:text-milky-500"
        to="/"
      >
        <svg
          class="w-8 h-8 text-brown-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m4 12 6.4267-4.65924c.6372.89667 1.8922 1.10897 2.7888.4718.8967-.63718 1.3493-1.69135.4681-2.80084C13.6373 4.95345 14.9106 4 15 4c.0894 0 5 1 5 8M4 12h16M4 12v8h16v-8M8 15h.01M12 17h.01M16 15h.01"
          />
        </svg>
        M
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/aboutMe" className="hoverEffect">
          About Me
        </Link>

        <Link to="/projects" className="hoverEffect">
          Projects
        </Link>
        <Link
          className="bg-brown-500 border-2 border-brown-100 text-milky-500 p-2 rounded-2xl  hover:scale-105 hover:shadow-2xl transition-all duration-300"
          to="/contact"
        >
          Contact
        </Link>
        <DarkBtn />
      </div>
    </div>
  );
};

export default Nav;
