const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userMessage");
const chatOutput = document.getElementById("chatOutput");

// Function to send message to backend
async function sendMessageToBot(userMessage) {
  try {
    const response = await fetch("https://distortive-watertight-hank.ngrok-free.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error contacting backend:", error);
    return "Server error — please try again later.";
  }
}

// Event listener for Send button
sendBtn.addEve
