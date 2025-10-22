const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add a message to chat
function addMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Typing animation for AI
function typeMessage(text, callback) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "ai-msg");
  chatWindow.appendChild(msgDiv);
  let i = 0;
  const interval = setInterval(() => {
    msgDiv.textContent += text.charAt(i);
    i++;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    if (i === text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 20);
}

// Send message to backend
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user-msg");
  userInput.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    typeMessage(data.reply);
  } catch (err) {
    typeMessage("⚠️ Error connecting to AI server.");
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
