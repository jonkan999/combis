export async function fetchBotResponse(userInput) {
  const response = await fetch(
    "https://combis.netlify.app/.netlify/functions/getBotResponse",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.text();
}
