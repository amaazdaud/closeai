async function sendMessageToBot(userMessage) {
  try {
    const response = await fetch("https://distortive-watertight-hank.ngrok-free.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    console.log("Bot reply:", data.reply);
    return data.reply;

  } catch (error) {
    console.error("Error contacting backend:", error);
    return "Server error — please try again later.";
  }
}

// Example usage
sendMessageToBot("Hello!").then(reply => console.log("Chatbot:", reply));
