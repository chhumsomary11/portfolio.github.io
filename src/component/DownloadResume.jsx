const DownloadResume = () => {
  return (
    <a
      href="/files/generalCV.pdf"
      download="Resume.pdf"
      className="bg-brown-500 border-2 border-brown-100 text-milky-500 rounded-3xl w-48 mt-10 p-3 text-center cursor-pointer scaleTransition block"
    >
      Download my Resume
    </a>
  );
};

export default DownloadResume;
