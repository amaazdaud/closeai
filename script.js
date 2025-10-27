async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = `🧍‍♂️ You: ${userMessage}`;
  chatBox.appendChild(userDiv);
  input.value = "";

  // Scroll down
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // Send message to backend
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    // Show bot reply
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.textContent = `🤖 CloseAI: ${data.reply}`;
    chatBox.appendChild(botDiv);

    // Scroll down
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    const errDiv = document.createElement("div");
    errDiv.className = "message bot error";
    errDiv.textContent = "⚠️ Connection error. Make sure your backend is running.";
    chatBox.appendChild(errDiv);
  }
}
