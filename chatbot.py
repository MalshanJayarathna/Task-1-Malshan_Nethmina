
# ============================================================
#   Rule-Based AI Chatbot - DecodeLabs Project 1
#   Author  : AI Engineer Intern
#   Model   : IPO (Input -> Process -> Output)
#   Method  : if-else control flow + dictionary knowledge base
# ============================================================

import sys
import io

# Force UTF-8 output so emoji and Unicode work on Windows terminals
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stdin  = io.TextIOWrapper(sys.stdin.buffer,  encoding='utf-8', errors='replace')

# ──────────────────────────────────────────────
#  KNOWLEDGE BASE  (dictionary-based responses)
# ──────────────────────────────────────────────
responses = {
    # ── Greetings ──────────────────────────────
    "hello"         : "👋 Hello there! I'm ByteBot, your rule-based AI assistant. How can I help you today?",
    "hi"            : "👋 Hi! Great to see you. What's on your mind?",
    "hey"           : "😊 Hey! I'm here and ready to chat. Ask me anything!",
    "good morning"  : "🌅 Good morning! Hope your day is off to a wonderful start!",
    "good afternoon": "☀️  Good afternoon! How's your day going so far?",
    "good evening"  : "🌙 Good evening! How can I assist you tonight?",
    "good night"    : "🌙 Good night! Sweet dreams. Come back anytime you need help.",
    "how are you"   : "🤖 I'm just a rule-based bot, but I'm functioning perfectly! Thanks for asking. How about you?",
    "what is your name" : "🤖 My name is ByteBot! I'm a rule-based AI chatbot built at DecodeLabs.",
    "who are you"   : "🤖 I'm ByteBot — a deterministic, rule-based AI chatbot. I respond using explicit logic, not machine learning!",
    "what can you do": "💡 I can answer greetings, reply to common questions, share fun facts, and help you understand rule-based AI concepts!",

    # ── AI / Project Questions ─────────────────
    "what is ai"                : "🧠 Artificial Intelligence (AI) is the simulation of human intelligence by machines. It includes problem-solving, learning, and decision-making.",
    "what is a chatbot"         : "💬 A chatbot is a software program that simulates human conversation through text or voice, using rules or AI models.",
    "what is rule-based ai"     : "📏 Rule-Based AI uses explicitly programmed if-else rules and decision trees to respond — no learning involved. It's deterministic and traceable!",
    "what is machine learning"  : "📊 Machine Learning is a subset of AI where systems learn patterns from data automatically, without being explicitly programmed.",
    "what is deep learning"     : "🔬 Deep Learning uses multi-layered neural networks to learn complex patterns from large datasets — powering things like image recognition and ChatGPT.",
    "what is ipo model"         : "📦 The IPO model stands for Input → Process → Output. This chatbot follows it: takes your input, processes it with rules, then outputs a response.",
    "what is python"            : "🐍 Python is a high-level, beginner-friendly programming language widely used in AI, data science, web development, and automation.",
    "what is a dictionary"      : "📚 In Python, a dictionary is a key-value data structure. This chatbot uses one as its knowledge base to map user inputs to responses!",
    "what is control flow"      : "🔀 Control flow refers to the order in which code executes — managed by if-else statements, loops, and functions in Python.",
    "what is a knowledge base"  : "🗂️  A knowledge base is a structured collection of information. Here, it's a Python dictionary storing all predefined question-answer pairs.",

    # ── Fun / General Questions ────────────────
    "tell me a joke"    : "😂 Why do programmers prefer dark mode?\n   👉 Because light attracts bugs! 🐛",
    "tell me a fact"    : "🌍 Fun fact: The first computer bug was an actual bug — a moth found inside a Harvard computer relay in 1947!",
    "what is the time"  : "⏰ I don't have access to a real-time clock, but you can check the time on your device!",
    "what is the date"  : "📅 I can't fetch live dates, but your system clock has you covered!",
    "motivate me"       : "🚀 'The journey of a thousand miles begins with a single step.' — Keep coding. Every line you write makes you better!",
    "give me a quote"   : "💭 'Programs must be written for people to read, and only incidentally for machines to execute.' — Harold Abelson",
    "thank you"         : "🙏 You're very welcome! It's my pleasure to assist. Is there anything else I can help with?",
    "thanks"            : "😊 Anytime! Don't hesitate to ask if you need anything else.",
    "help"              : "🆘 Sure! You can ask me about:\n   • Greetings (hi, hello, good morning)\n   • AI concepts (what is AI, chatbot, ML, deep learning)\n   • Fun stuff (joke, fact, quote)\n   • Project info (what is IPO model, rule-based AI)\n   • Type 'bye', 'exit', or 'quit' to end the chat.",
}

# ──────────────────────────────────────────────
#  EXIT COMMANDS
# ──────────────────────────────────────────────
exit_commands = {"bye", "exit", "quit", "goodbye", "see you", "stop"}

# ──────────────────────────────────────────────
#  FALLBACK RESPONSE
# ──────────────────────────────────────────────
FALLBACK = (
    "🤔 Hmm, I don't have a rule for that yet! "
    "Try asking about AI, greetings, jokes, or type 'help' for a list of topics."
)

# ──────────────────────────────────────────────
#  PROCESS FUNCTION  (the brain of the chatbot)
# ──────────────────────────────────────────────
def get_response(user_input: str) -> str:
    """
    Process the user input and return an appropriate response.

    Steps:
      1. Sanitize  — lowercase + strip whitespace
      2. Check exit commands
      3. Lookup in knowledge-base dictionary
      4. Fallback if no match found
    """
    # ── Step 1 : Input Sanitization ──
    cleaned = user_input.lower().strip()

    # ── Step 2 : Exit Detection ──
    if cleaned in exit_commands:
        return "EXIT"   # sentinel value handled in main loop

    # ── Step 3 : Dictionary Lookup ──
    if cleaned in responses:
        return responses[cleaned]

    # ── Step 3b : Partial / keyword matching (extra intelligence) ──
    for key in responses:
        if key in cleaned:          # user input CONTAINS a known key
            return responses[key]

    # ── Step 4 : Fallback ──
    return FALLBACK


# ──────────────────────────────────────────────
#  DISPLAY HELPERS
# ──────────────────────────────────────────────
DIVIDER = "-" * 55

def print_banner():
    """Print a styled welcome banner."""
    print("\n" + "=" * 55)
    print("   🤖  ByteBot - Rule-Based AI Chatbot")
    print("   📌  DecodeLabs | Project 1")
    print("   🏗️   Architecture : IPO Model + Dictionary KB")
    print("=" * 55)
    print(" Type 'help' to see what I know.")
    print(" Type 'bye', 'exit', or 'quit' to end the chat.")
    print(DIVIDER + "\n")

def chatbot_says(message: str):
    """Print a formatted chatbot response."""
    print(f"\n  ByteBot >> {message}\n")
    print(DIVIDER)

def user_prompt() -> str:
    """Read and return user input."""
    return input("  You     >> ")


# ──────────────────────────────────────────────
#  MAIN LOOP  (continuous execution)
# ──────────────────────────────────────────────
def main():
    """Entry point — runs the chatbot in a continuous loop."""
    print_banner()

    while True:                          # ── continuous loop ──
        try:
            user_input = user_prompt()   # INPUT

            if not user_input.strip():   # ignore blank lines
                chatbot_says("It looks like you didn't type anything. Try saying 'hello' or 'help'! 😊")
                continue

            response = get_response(user_input)   # PROCESS

            if response == "EXIT":               # exit sentinel
                print("\n" + "=" * 55)
                print("  ByteBot >> 👋 Goodbye! It was great chatting with you.")
                print("           Thanks for being part of DecodeLabs Project 1!")
                print("=" * 55 + "\n")
                break

            chatbot_says(response)               # OUTPUT

        except KeyboardInterrupt:
            # Graceful exit on Ctrl+C
            print("\n\n  ByteBot » ⚡ Session interrupted. Goodbye!\n")
            break


# ──────────────────────────────────────────────
#  ENTRY POINT
# ──────────────────────────────────────────────
if __name__ == "__main__":
    main()
