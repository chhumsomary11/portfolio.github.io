const base_url = "http://localhost:3000/api";

const postPrompt = async (prompt) => {
  const body = { prompt };
  try {
    const response = await fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting prompt:", error);
    throw new Error("Failed to post prompt");
  }
};

postPrompt("Hello, how are you?")
  .then((response) => {
    console.log("Response from API:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export { postPrompt };
