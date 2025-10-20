const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// REPLACE THIS URL with your Render backend URL once you deploy the server
const SERVER_URL = "https://your-ai-server.onrender.com/api/chat";

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  try {
    const res = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
    });
    const data = await res.json();

    chat.lastChild.remove();
    addMessage(data.reply || "Error: no response", "bot");
  } catch (err) {
    chat.lastChild.remove();
    addMessage("Error: cannot connect to server", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

addMessage("Hi! I’m Chat AI — ask anything (no 15+ questions allowed).", "bot");
