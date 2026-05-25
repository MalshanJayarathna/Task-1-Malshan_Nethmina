// ============================================================
//   ByteBot — Rule-Based AI Chatbot (Web Version)
//   DecodeLabs Project 1
//   Architecture : IPO Model + Dictionary Knowledge Base
// ============================================================

// ── KNOWLEDGE BASE (Dictionary) ───────────────────────────
const responses = {
  // Greetings
  "hello"              : "👋 Hello there! I'm ByteBot, your rule-based AI assistant. How can I help you today?",
  "hi"                 : "👋 Hi! Great to see you. What's on your mind?",
  "hey"                : "😊 Hey! I'm here and ready to chat. Ask me anything!",
  "good morning"       : "🌅 Good morning! Hope your day is off to a wonderful start!",
  "good afternoon"     : "☀️ Good afternoon! How's your day going so far?",
  "good evening"       : "🌙 Good evening! How can I assist you tonight?",
  "good night"         : "🌙 Good night! Sweet dreams. Come back anytime you need help.",
  "how are you"        : "🤖 I'm just a rule-based bot, but I'm functioning perfectly! Thanks for asking. How about you?",
  "what is your name"  : "🤖 My name is ByteBot! I'm a rule-based AI chatbot built at DecodeLabs.",
  "who are you"        : "🤖 I'm ByteBot — a deterministic, rule-based AI chatbot. I respond using explicit logic, not machine learning!",
  "what can you do"    : "💡 I can answer greetings, reply to common questions, share fun facts, and help you understand rule-based AI concepts!",

  // AI & Project Concepts
  "what is ai"                 : "🧠 Artificial Intelligence (AI) is the simulation of human intelligence by machines. It includes problem-solving, learning, and decision-making.",
  "what is a chatbot"          : "💬 A chatbot is a software program that simulates human conversation through text or voice, using rules or AI models.",
  "what is rule-based ai"      : "📏 Rule-Based AI uses explicitly programmed if-else rules and decision trees to respond — no learning involved. It's deterministic and traceable!",
  "what is machine learning"   : "📊 Machine Learning is a subset of AI where systems learn patterns from data automatically, without being explicitly programmed.",
  "what is deep learning"      : "🔬 Deep Learning uses multi-layered neural networks to learn complex patterns from large datasets — powering things like image recognition and ChatGPT.",
  "what is ipo model"          : "📦 The IPO model stands for Input → Process → Output. This chatbot follows it: takes your input, processes it with rules, then outputs a response.",
  "what is python"             : "🐍 Python is a high-level, beginner-friendly programming language widely used in AI, data science, web development, and automation.",
  "what is a dictionary"       : "📚 In Python, a dictionary is a key-value data structure. This chatbot uses one as its knowledge base to map user inputs to responses!",
  "what is control flow"       : "🔀 Control flow refers to the order in which code executes — managed by if-else statements, loops, and functions in Python.",
  "what is a knowledge base"   : "🗂️ A knowledge base is a structured collection of information. Here, it's a dictionary storing all predefined question-answer pairs.",
  "what is nlp"                : "🔤 NLP stands for Natural Language Processing — a branch of AI that helps computers understand, interpret, and generate human language.",
  "what is decodelabs"         : "🏢 DecodeLabs is an organization focused on hands-on AI and tech projects. This chatbot is Project 1 of your AI Engineer internship!",

  // Fun
  "tell me a joke"    : "😂 Why do programmers prefer dark mode?\n👉 Because light attracts bugs! 🐛",
  "tell me a fact"    : "🌍 Fun fact: The first computer bug was an actual bug — a moth found inside a Harvard computer relay in 1947!",
  "what is the time"  : "⏰ I don't have access to a real-time clock, but you can check the time on your device!",
  "what is the date"  : "📅 I can't fetch live dates, but your system clock has you covered!",
  "motivate me"       : "🚀 'The journey of a thousand miles begins with a single step.' — Keep coding. Every line you write makes you better!",
  "give me a quote"   : "💭 'Programs must be written for people to read, and only incidentally for machines to execute.' — Harold Abelson",
  "thank you"         : "🙏 You're very welcome! It's my pleasure to assist. Is there anything else I can help with?",
  "thanks"            : "😊 Anytime! Don't hesitate to ask if you need anything else.",

  // Help
  "help": `🆘 Here's what I know:\n\n👋 Greetings — hello, hi, hey, good morning, how are you\n🧠 AI Concepts — what is AI, chatbot, ML, deep learning, NLP\n📦 Project — what is IPO model, rule-based AI, Python, dictionary\n😂 Fun — tell me a joke, tell me a fact, give me a quote, motivate me\n🚪 Exit — type "bye", "exit", or "quit" to say goodbye`,
};

// ── EXIT COMMANDS ─────────────────────────────────────────
const exitCommands = new Set(["bye", "exit", "quit", "goodbye", "see you", "stop"]);

// ── FALLBACK ──────────────────────────────────────────────
const FALLBACK = "🤔 Hmm, I don't have a rule for that yet! Try asking about AI, greetings, jokes, or type 'help' for all topics.";

// ── PROCESS FUNCTION ──────────────────────────────────────
function getResponse(userInput) {
  // Step 1: Sanitize
  const cleaned = userInput.toLowerCase().trim();
  if (!cleaned) return null;

  // Step 2: Check exit
  if (exitCommands.has(cleaned)) return "EXIT";

  // Step 3: Exact match
  if (responses[cleaned]) return responses[cleaned];

  // Step 4: Keyword / partial match
  for (const key of Object.keys(responses)) {
    if (cleaned.includes(key)) return responses[key];
  }

  // Step 5: Fallback
  return FALLBACK;
}

// ══════════════════════════════════════════════════════════
//   DOM LOGIC
// ══════════════════════════════════════════════════════════
const messagesArea = document.getElementById("messagesArea");
const userInput    = document.getElementById("userInput");
const sendBtn      = document.getElementById("sendBtn");
const clearBtn     = document.getElementById("clearBtn");
const themeBtn     = document.getElementById("themeBtn");

// ── Helpers ───────────────────────────────────────────────
function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function scrollToBottom() {
  messagesArea.scrollTo({ top: messagesArea.scrollHeight, behavior: "smooth" });
}

function removeWelcomeCard() {
  const card = messagesArea.querySelector(".welcome-card");
  if (card) card.remove();
}

// ── Render user message ───────────────────────────────────
function appendUserMessage(text) {
  removeWelcomeCard();
  const row = document.createElement("div");
  row.className = "msg-row user";
  row.innerHTML = `
    <div>
      <div class="bubble user">${escapeHtml(text)}</div>
      <div class="msg-meta">${formatTime()}</div>
    </div>
    <div class="avatar user"><i class="fa-solid fa-user"></i></div>
  `;
  messagesArea.appendChild(row);
  scrollToBottom();
}

// ── Render bot message ────────────────────────────────────
function appendBotMessage(text) {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.innerHTML = `
    <div class="avatar bot"><i class="fa-solid fa-robot"></i></div>
    <div>
      <div class="bubble bot">${escapeHtml(text)}</div>
      <div class="msg-meta">ByteBot · ${formatTime()}</div>
    </div>
  `;
  messagesArea.appendChild(row);
  scrollToBottom();
}

// ── Typing indicator ──────────────────────────────────────
function showTyping() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.id = "typingRow";
  row.innerHTML = `
    <div class="avatar bot"><i class="fa-solid fa-robot"></i></div>
    <div class="typing-indicator">
      <span></span><span></span><span></span>
    </div>
  `;
  messagesArea.appendChild(row);
  scrollToBottom();
}
function hideTyping() {
  const row = document.getElementById("typingRow");
  if (row) row.remove();
}

// ── Safety: escape HTML ───────────────────────────────────
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
}

// ── Goodbye overlay ───────────────────────────────────────
function showGoodbye() {
  appendBotMessage("👋 Goodbye! It was great chatting with you.\nThanks for trying ByteBot — DecodeLabs Project 1! 🚀");
  userInput.disabled = true;
  sendBtn.disabled   = true;
  userInput.placeholder = "Chat session ended. Refresh to restart.";
}

// ── Main send logic ───────────────────────────────────────
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendUserMessage(text);
  userInput.value = "";
  userInput.style.height = "auto";

  // Typing delay for realism
  showTyping();
  const delay = 500 + Math.random() * 600;

  setTimeout(() => {
    hideTyping();
    const response = getResponse(text);

    if (response === "EXIT") {
      showGoodbye();
    } else {
      appendBotMessage(response);
    }
  }, delay);
}

// ── Event Listeners ───────────────────────────────────────
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize textarea
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

// Clear chat
clearBtn.addEventListener("click", () => {
  messagesArea.innerHTML = "";
  userInput.disabled     = false;
  sendBtn.disabled       = false;
  userInput.placeholder  = "Type a message... (Press Enter to send)";

  // Re-add welcome card
  const card = document.createElement("div");
  card.className = "welcome-card";
  card.innerHTML = `
    <div class="welcome-icon"><i class="fa-solid fa-robot"></i></div>
    <h2>Chat cleared! I'm back 👋</h2>
    <p>Ask me anything about AI, greetings, or fun stuff!</p>
    <div class="chip-row">
      <span class="chip" data-msg="what is ai">What is AI?</span>
      <span class="chip" data-msg="tell me a joke">Tell a joke</span>
      <span class="chip" data-msg="what is ipo model">IPO Model</span>
      <span class="chip" data-msg="help">Help</span>
    </div>
  `;
  messagesArea.appendChild(card);
  bindChips();
  bindQuickItems();
});

// Light / Dark toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const icon = themeBtn.querySelector("i");
  if (document.body.classList.contains("light-mode")) {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
});

// ── Chip & Quick-item click ──────────────────────────────
function bindChips() {
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      userInput.value = chip.dataset.msg;
      sendMessage();
    });
  });
}

function bindQuickItems() {
  document.querySelectorAll(".quick-item").forEach(item => {
    item.addEventListener("click", () => {
      userInput.value = item.dataset.msg;
      sendMessage();
      userInput.focus();
    });
  });
}

// ── Init ──────────────────────────────────────────────────
bindChips();
bindQuickItems();
userInput.focus();
