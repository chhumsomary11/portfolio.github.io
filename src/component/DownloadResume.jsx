const DownloadResume = () => {
  const fileUrl = "src/public/CV.pdf";
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = fileUrl; // Path to your resume file
    link.download = "Resume.pdf"; // Name of the downloaded file

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link element
    document.body.removeChild(link);
  };
  return (
    <div
      onClick={handleDownload}
      className="bg-brown-500 border-2 border-brown-100  text-milky-500 rounded-3xl  w-48 mt-10 p-3 text-center cursor-pointer scaleTransition"
    >
      Download my Resume
    </div>
  );
};

export default DownloadResume;
