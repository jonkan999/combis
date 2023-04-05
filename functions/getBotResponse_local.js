export async function getBotResponse(userInput) {
  try {
    const response = await fetch("http://localhost:3000/getBotResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (!response.ok) {
      throw new Error("Error with server request");
    }

    const botResponse = await response.text();
    return botResponse;
  } catch (error) {
    console.error(`Error with server request: ${error.message}`);
    // handle error appropriately
  }
}
