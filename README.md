# 🤖 Bob — Python Personal Assistant

Bob is a simple personal assistant and Python learning project converted into a web application.

It provides useful tools, games, a chatbot, and an interactive Python manual — all inside one web interface.

## 🌐 Live Demo

**Live Website:**
(https://bob-web-navy.vercel.app/)
> Replace the URL above with your actual Vercel URL.

---

## ✨ Features

### 💬 Chat

Talk with Bob using simple messages.

Examples:

```text
hello
how are you
who are you
tell me a joke
what is the time
what is the date
```

### 🧮 Calculator

Supports:

```text
+
-
*
/
%
//
**
```

### 📅 Date & Time

Displays the current date and a live clock.

### 🔄 Unit Converter

Supported conversions:

* Kilometers → Miles
* Miles → Kilometers
* Kilograms → Pounds
* Pounds → Kilograms
* Celsius → Fahrenheit
* Fahrenheit → Celsius

### 🧠 Memory

Save:

* Your name
* Information Bob should remember

### 📝 Notes

Create and delete notes.

### ✅ To-Do List

Create tasks, mark them as completed, and delete them.

### 🎮 Games

#### Number Guessing

Guess a random number between 1 and 100.

#### Rock Paper Scissors

Play a five-round match against Bob.

```text
Rock     beats Scissors
Paper    beats Rock
Scissors beats Paper
```

The final score is displayed after Round 5.

### 😂 Fun

Includes:

* Random jokes
* Dice roller
* Coin flip
* Random number generator

### 🐍 Python Manual

An interactive reference for common Python concepts and functions.

Includes:

```text
print()
input()
variables
strings
integers
floats
booleans
lists
dictionaries
if
elif
else
for
while
functions
return
import
try
except
class
object
len()
range()
type()
int()
float()
str()
```

---

# 🛠️ Technologies

Bob Web is built using:

* HTML5
* CSS3
* JavaScript
* Browser LocalStorage
* Git
* GitHub
* Vercel

No external framework is required.

---

# 📁 Project Structure

```text
Bob-Web/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

### `index.html`

Contains the structure and interface of the application.

### `style.css`

Contains the design, layout, colors, buttons, responsive styling, and UI.

### `script.js`

Contains Bob's functionality, games, calculator, chatbot, converter, memory, notes, to-do list, and Python Manual.

### `README.md`

Project documentation.

---

# 🚀 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/devyansh9332/bob-web.git
```

## 2. Enter the project

```bash
cd bob-web
```

## 3. Start a local server

Using Python:

```bash
python3 -m http.server 8000
```

## 4. Open Bob

Open:

```text
http://localhost:8000
```

That's it.

No `npm install` or build process is required.

---

# 💾 Data Storage

Bob currently uses browser **LocalStorage** for:

* Memory
* Notes
* To-Do List

This means the data is stored locally in the user's browser.

For example:

```text
Browser
   ↓
LocalStorage
   ↓
Bob's saved data
```

Different users have separate local data.

There is currently no online database or user account system.

---

# 🔐 Privacy

Bob does not currently require an account or send Memory, Notes, or To-Do data to a server.

The saved information is stored locally in the browser.

Deleting browser site data may delete the saved information.

---

# 🎯 Project Purpose

Bob was created as a learning project to practice:

* Python programming concepts
* JavaScript
* HTML
* CSS
* Functions
* Variables
* Conditions
* Loops
* Arrays
* Objects
* LocalStorage
* Git
* GitHub
* Web deployment

---

# 📚 Learning

The built-in **Python Manual** helps beginners understand common Python terms directly inside the application.

Select a term such as:

```python
print()
```

and Bob explains its:

* Meaning
* Syntax
* Example
* Output

---

# 🤝 Contributing

Want to improve Bob?

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit them.

```bash
git add .
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

# 🗺️ Future Improvements

Possible future versions:

* 🤖 Better chatbot responses
* 🎤 Voice input
* 🔊 Text-to-speech
* 🌦️ Weather
* 🔍 Web search
* 👤 User accounts
* ☁️ Cloud database
* 🧠 Server-side memory
* 📱 Better mobile UI
* 🌙 Theme customization
* 📊 Statistics for games
* 🏆 Game leaderboard
* 🐍 More Python lessons

---

# 📜 License

This project is open for learning and personal use.

---

# 👨‍💻 Author

**Devansh**

GitHub:

https://github.com/devyansh9332

---

## ⭐ If you like Bob

Give the repository a ⭐ on GitHub and feel free to improve it!
