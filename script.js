// ============================================================
// BOB - PROGRAMMING ASSISTANT
// ============================================================

// ------------------------------------------------------------
// PAGE NAVIGATION
// ------------------------------------------------------------

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);
    if (page) page.classList.add("active");
}

// ------------------------------------------------------------
// CHAT
// ------------------------------------------------------------

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function quickChat(message) {
    document.getElementById("chatInput").value = message;
    sendChat();
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();

    if (!message) return;

    const output = document.getElementById("chatOutput");

    output.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${escapeHTML(message)}
        </div>
    `;

    const response = botResponse(message.toLowerCase());

    output.innerHTML += `
        <div class="bot-message">
            <strong>Bob:</strong> ${response}
        </div>
    `;

    output.scrollTop = output.scrollHeight;
    input.value = "";
    input.focus();
}

function botResponse(message) {
    const responses = {
        "hi": "Hi! 👋",
        "hello": "Hello! How can I help?",
        "hey": "Hey! 😎",
        "how are you": "I'm doing great! My code is running perfectly.",
        "who are you": "I'm Bob, your programming assistant.",
        "what is your name": "My name is Bob.",
        "who made you": "You made me using code! 👨‍💻",
        "are you human": "Nope! I'm a computer program.",
        "thanks": "You're welcome! 😎",
        "thank you": "Anytime!",
        "good morning": "Good morning! ☀️",
        "good night": "Good night! 😴",
        "i am bored": "Try one of the games! 🎮",
        "im bored": "Try one of the games! 🎮",
        "i am happy": "That's great to hear! 😄",
        "im happy": "That's great to hear! 😄",
        "i am sad": "I'm sorry you're feeling that way. I hope things get better.",
        "im sad": "I'm sorry you're feeling that way. I hope things get better.",
        "do you like python": "Of course! Python is one of the languages in my programming manual. 🐍",
        "good bot": "Thank you! 😎",
        "bad bot": "😭 I'll try to improve!",
        "what can you do": "I can chat, calculate, convert units, save notes and tasks, play games, and teach programming languages."
    };

    if (responses[message]) return responses[message];

    if (message.includes("joke")) return getJoke();

    if (message.includes("time")) {
        return new Date().toLocaleTimeString("en-IN");
    }

    if (message.includes("date")) {
        return new Date().toLocaleDateString("en-IN");
    }

    if (message.includes("python")) {
        return "Open 📚 Programming Manual → Python to learn Python.";
    }

    if (message.includes("c++")) {
        return "Open 📚 Programming Manual → C++ to learn C++.";
    }

    if (message.includes("java")) {
        return "Open 📚 Programming Manual → Java to learn Java.";
    }

    if (message.includes("javascript")) {
        return "Open 📚 Programming Manual → JavaScript to learn JavaScript.";
    }

    if (message.includes("html")) {
        return "Open 📚 Programming Manual → HTML to learn HTML.";
    }

    if (message.includes("css")) {
        return "Open 📚 Programming Manual → CSS to learn CSS.";
    }

    return "I don't understand that yet. Try a quick-response button or ask about a programming language.";
}

// ------------------------------------------------------------
// CALCULATOR
// ------------------------------------------------------------

function calculate() {
    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value;
    const op = document.getElementById("operation").value;

    if (n1 === "" || n2 === "") {
        document.getElementById("calcResult").textContent = "⚠️ Enter both numbers.";
        return;
    }

    const a = Number(n1);
    const b = Number(n2);
    let result;

    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else if (op === "/") result = b === 0 ? "Cannot divide by zero." : a / b;
    else if (op === "%") result = b === 0 ? "Cannot divide by zero." : a % b;
    else if (op === "//") result = b === 0 ? "Cannot divide by zero." : Math.floor(a / b);
    else if (op === "**") result = a ** b;

    document.getElementById("calcResult").textContent = "Result: " + result;
}

// ------------------------------------------------------------
// DATE & TIME
// ------------------------------------------------------------

function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const time = now.toLocaleTimeString("en-IN");

    const clock = document.getElementById("clock");
    if (clock) clock.innerHTML = `${date}<br><br>${time}`;
}

setInterval(updateClock, 1000);
updateClock();

// ------------------------------------------------------------
// CONVERTER
// ------------------------------------------------------------

function convertUnits() {
    const raw = document.getElementById("conversionValue").value;

    if (raw === "") {
        document.getElementById("conversionResult").textContent = "⚠️ Enter a value.";
        return;
    }

    const value = Number(raw);
    const type = document.getElementById("conversion").value;
    let result;

    switch (type) {
        case "km-miles": result = value * 0.621371; break;
        case "miles-km": result = value * 1.60934; break;
        case "kg-lb": result = value * 2.20462; break;
        case "lb-kg": result = value * 0.453592; break;
        case "c-f": result = (value * 9 / 5) + 32; break;
        case "f-c": result = (value - 32) * 5 / 9; break;
    }

    document.getElementById("conversionResult").textContent =
        "Result: " + result.toFixed(2);
}

// ------------------------------------------------------------
// MEMORY
// ------------------------------------------------------------

function saveName() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) return;

    localStorage.setItem("bobName", name);
    renderMemory();
    alert(`Nice to meet you, ${name}!`);
}

function addMemory() {
    const input = document.getElementById("memoryInput");
    const value = input.value.trim();
    if (!value) return;

    const memory = JSON.parse(localStorage.getItem("bobMemory")) || [];
    memory.push(value);

    localStorage.setItem("bobMemory", JSON.stringify(memory));
    input.value = "";
    renderMemory();
}

function renderMemory() {
    const list = document.getElementById("memoryList");
    if (!list) return;

    list.innerHTML = "";

    const name = localStorage.getItem("bobName");

    if (name) {
        const li = document.createElement("li");
        li.textContent = "Name: " + name;
        list.appendChild(li);
    }

    const memory = JSON.parse(localStorage.getItem("bobMemory")) || [];

    memory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function clearMemory() {
    localStorage.removeItem("bobName");
    localStorage.removeItem("bobMemory");
    renderMemory();
}

// ------------------------------------------------------------
// NOTES
// ------------------------------------------------------------

function addNote() {
    const input = document.getElementById("noteInput");
    const note = input.value.trim();

    if (!note) return;

    const notes = JSON.parse(localStorage.getItem("bobNotes")) || [];
    notes.push(note);

    localStorage.setItem("bobNotes", JSON.stringify(notes));
    input.value = "";
    renderNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("bobNotes")) || [];
    notes.splice(index, 1);

    localStorage.setItem("bobNotes", JSON.stringify(notes));
    renderNotes();
}

function renderNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;

    list.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem("bobNotes")) || [];

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => deleteNote(index);

        li.appendChild(button);
        list.appendChild(li);
    });
}

// ------------------------------------------------------------
// TODO
// ------------------------------------------------------------

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return;

    const tasks = JSON.parse(localStorage.getItem("bobTasks")) || [];
    tasks.push({ text, completed: false });

    localStorage.setItem("bobTasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
}

function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("bobTasks")) || [];
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("bobTasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("bobTasks")) || [];
    tasks.splice(index, 1);

    localStorage.setItem("bobTasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("bobTasks")) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.completed ? "✓" : "○"} ${task.text}`;

        const complete = document.createElement("button");
        complete.textContent = task.completed ? "Undo" : "Complete";
        complete.onclick = () => completeTask(index);

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.onclick = () => deleteTask(index);

        li.appendChild(complete);
        li.appendChild(remove);
        list.appendChild(li);
    });
}

// ------------------------------------------------------------
// NUMBER GUESSING GAME
// ------------------------------------------------------------

let secretNumber = null;
let guessAttempts = 0;
let guessGameActive = false;

function startGuessGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessAttempts = 0;
    guessGameActive = true;

    const input = document.getElementById("guessInput");
    input.value = "";
    input.focus();

    document.getElementById("guessResult").textContent =
        "🎮 Game started! Make your first guess.";

    document.getElementById("guessAttempts").textContent =
        "Attempts: 0";
}

function makeGuess() {
    if (!guessGameActive) {
        document.getElementById("guessResult").textContent =
            "⚠️ Click 'Start New Game' first.";
        return;
    }

    const input = document.getElementById("guessInput");
    const guess = Number(input.value);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        document.getElementById("guessResult").textContent =
            "⚠️ Enter a whole number between 1 and 100.";
        input.focus();
        return;
    }

    guessAttempts++;

    document.getElementById("guessAttempts").textContent =
        `Attempts: ${guessAttempts}`;

    if (guess === secretNumber) {
        document.getElementById("guessResult").textContent =
            `🎉 CORRECT! You guessed it in ${guessAttempts} attempts!`;
        guessGameActive = false;
        input.value = "";
        return;
    }

    const difference = Math.abs(guess - secretNumber);

    if (guess < secretNumber) {
        if (difference <= 5) {
            document.getElementById("guessResult").textContent =
                "🔥 VERY CLOSE, BUT TOO LOW! Go a little higher.";
        } else if (difference <= 10) {
            document.getElementById("guessResult").textContent =
                "🟡 NEAR, BUT TOO LOW! Try a little higher.";
        } else {
            document.getElementById("guessResult").textContent =
                "⬇️ TOO LOW! Try a higher number.";
        }
    } else {
        if (difference <= 5) {
            document.getElementById("guessResult").textContent =
                "🔥 VERY CLOSE, BUT TOO HIGH! Go a little lower.";
        } else if (difference <= 10) {
            document.getElementById("guessResult").textContent =
                "🟡 NEAR, BUT TOO HIGH! Try a little lower.";
        } else {
            document.getElementById("guessResult").textContent =
                "⬆️ TOO HIGH! Try a lower number.";
        }
    }

    input.value = "";
    input.focus();
}

// ------------------------------------------------------------
// ROCK PAPER SCISSORS
// ------------------------------------------------------------

let rpsRound = 1;
let rpsPlayerScore = 0;
let rpsBobScore = 0;
let rpsDraws = 0;

function showGame(gameId) {
    document.querySelectorAll(".game-panel").forEach(game => {
        game.classList.add("hidden");
    });

    document.getElementById(gameId).classList.remove("hidden");
}

function startRPS() {
    rpsRound = 1;
    rpsPlayerScore = 0;
    rpsBobScore = 0;
    rpsDraws = 0;

    document.getElementById("rpsRound").textContent = "Round 1 / 5";
    document.getElementById("rpsResult").textContent = "Choose your move!";
    document.getElementById("rpsScore").textContent = "You: 0 | Bob: 0 | Draws: 0";
    document.getElementById("rpsHistory").innerHTML = "";
}

function playRPS(playerChoice) {
    if (rpsRound > 5) return;

    const choices = ["rock", "paper", "scissors"];
    const bobChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;

    if (playerChoice === bobChoice) {
        result = "DRAW 🤝";
        rpsDraws++;
    } else if (
        (playerChoice === "rock" && bobChoice === "scissors") ||
        (playerChoice === "paper" && bobChoice === "rock") ||
        (playerChoice === "scissors" && bobChoice === "paper")
    ) {
        result = "YOU WIN THIS ROUND! 🏆";
        rpsPlayerScore++;
    } else {
        result = "BOB WINS THIS ROUND! 🤖";
        rpsBobScore++;
    }

    document.getElementById("rpsResult").innerHTML =
        `You chose: <strong>${playerChoice.toUpperCase()}</strong><br>
         Bob chose: <strong>${bobChoice.toUpperCase()}</strong><br><br>
         ${result}`;

    document.getElementById("rpsScore").textContent =
        `You: ${rpsPlayerScore} | Bob: ${rpsBobScore} | Draws: ${rpsDraws}`;

    document.getElementById("rpsHistory").innerHTML +=
        `Round ${rpsRound}: You = ${playerChoice} | Bob = ${bobChoice} | ${result}<br>`;

    if (rpsRound === 5) {
        let finalResult;

        if (rpsPlayerScore > rpsBobScore) {
            finalResult = "🏆 YOU WIN THE MATCH!";
        } else if (rpsBobScore > rpsPlayerScore) {
            finalResult = "🤖 BOB WINS THE MATCH!";
        } else {
            finalResult = "🤝 MATCH DRAW!";
        }

        document.getElementById("rpsRound").textContent = "🏁 MATCH FINISHED";

        document.getElementById("rpsResult").innerHTML +=
            `<br><strong>${finalResult}</strong><br>
             Final Score: You ${rpsPlayerScore} - Bob ${rpsBobScore}`;

        return;
    }

    rpsRound++;
    document.getElementById("rpsRound").textContent = `Round ${rpsRound} / 5`;
}

// ------------------------------------------------------------
// FUN
// ------------------------------------------------------------

function getJoke() {
    const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why was the Python programmer cold? He left his Windows open! 😂",
        "There are 10 kinds of people: those who understand binary and those who don't.",
        "Why did the programmer quit his job? Because he didn't get arrays! 😂",
        "A SQL query walks into a bar and asks: Can I JOIN you? 😂",
        "Why do programmers hate nature? It has too many bugs! 🐛",
        "Why did the computer go to the doctor? It had a virus! 😂"
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
}

function joke() {
    document.getElementById("funResult").textContent = getJoke();
}

function dice() {
    const number = Math.floor(Math.random() * 6) + 1;
    document.getElementById("funResult").textContent = `🎲 You rolled ${number}!`;
}

function coin() {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    document.getElementById("funResult").textContent = `🪙 ${result}!`;
}

function randomNumber() {
    const number = Math.floor(Math.random() * 100) + 1;
    document.getElementById("funResult").textContent = `🔢 Random number: ${number}`;
}

// ------------------------------------------------------------
// PROGRAMMING MANUAL
// ------------------------------------------------------------

const programmingManual = {
    Python: {
        "print()": {
            meaning: "Displays output on the screen.",
            syntax: "print(value)",
            example: 'print("Hello World")',
            output: "Hello World"
        },
        "input()": {
            meaning: "Takes input from the user.",
            syntax: 'input("message")',
            example: 'name = input("Enter your name: ")',
            output: "Stores user input."
        },
        "if": {
            meaning: "Runs code when a condition is true.",
            syntax: "if condition:",
            example: 'if age >= 18:\n    print("Adult")',
            output: "Adult"
        },
        "elif": {
            meaning: "Checks another condition if the previous one was false.",
            syntax: "elif condition:",
            example: 'elif age >= 13:\n    print("Teen")',
            output: "Teen"
        },
        "else": {
            meaning: "Runs when previous conditions are false.",
            syntax: "else:",
            example: 'else:\n    print("Child")',
            output: "Child"
        },
        "for": {
            meaning: "Repeats code over a sequence.",
            syntax: "for item in sequence:",
            example: "for i in range(5):\n    print(i)",
            output: "0 1 2 3 4"
        },
        "while": {
            meaning: "Repeats code while a condition is true.",
            syntax: "while condition:",
            example: "while x < 5:\n    x += 1",
            output: "Repeats until false."
        },
        "def": {
            meaning: "Defines a reusable function.",
            syntax: "def function_name():",
            example: 'def greet():\n    print("Hello")',
            output: "Creates a function."
        },
        "return": {
            meaning: "Sends a value back from a function.",
            syntax: "return value",
            example: "return x + y",
            output: "Returns a result."
        },
        "list": {
            meaning: "An ordered, changeable collection.",
            syntax: "items = [value1, value2]",
            example: 'fruits = ["apple", "banana"]',
            output: "Stores multiple values."
        },
        "dictionary": {
            meaning: "Stores key-value pairs.",
            syntax: "data = {key: value}",
            example: 'person = {"name": "Bob"}',
            output: "name → Bob"
        },
        "try / except": {
            meaning: "Handles errors without crashing the program.",
            syntax: "try:\n    code\nexcept Error:",
            example: 'try:\n    x = int("abc")\nexcept ValueError:\n    print("Invalid")',
            output: "Invalid"
        }
    },

    C: {
        "printf()": {
            meaning: "Prints formatted output.",
            syntax: 'printf("text");',
            example: 'printf("Hello World");',
            output: "Hello World"
        },
        "scanf()": {
            meaning: "Takes formatted input.",
            syntax: 'scanf("%d", &number);',
            example: 'scanf("%d", &age);',
            output: "Stores user input."
        },
        "int": {
            meaning: "Declares an integer variable.",
            syntax: "int variable;",
            example: "int age = 20;",
            output: "Creates an integer variable."
        },
        "if": {
            meaning: "Runs code when a condition is true.",
            syntax: "if (condition) { }",
            example: 'if (age >= 18) {\n    printf("Adult");\n}',
            output: "Adult"
        },
        "for": {
            meaning: "Repeats code using a loop.",
            syntax: "for (initialization; condition; update)",
            example: 'for(int i = 0; i < 5; i++) {\n    printf("%d", i);\n}',
            output: "0 1 2 3 4"
        },
        "function": {
            meaning: "A reusable block of C code.",
            syntax: "return_type name(parameters) { }",
            example: 'int add(int a, int b) {\n    return a + b;\n}',
            output: "Returns the sum."
        }
    },

    "C++": {
        "cout": {
            meaning: "Prints output to the console.",
            syntax: "cout << value;",
            example: 'cout << "Hello World";',
            output: "Hello World"
        },
        "cin": {
            meaning: "Takes input from the user.",
            syntax: "cin >> variable;",
            example: "cin >> age;",
            output: "Stores user input."
        },
        "vector": {
            meaning: "A dynamic array from the C++ Standard Library.",
            syntax: "vector<type> name;",
            example: "vector<int> numbers;",
            output: "Creates a vector."
        },
        "class": {
            meaning: "Defines a blueprint for objects.",
            syntax: "class Name { };",
            example: "class Person {\n};",
            output: "Creates a class."
        },
        "if": {
            meaning: "Runs code when a condition is true.",
            syntax: "if (condition) { }",
            example: 'if (age >= 18) {\n    cout << "Adult";\n}',
            output: "Adult"
        },
        "for": {
            meaning: "Repeats code using a loop.",
            syntax: "for (initialization; condition; update)",
            example: 'for(int i = 0; i < 5; i++) {\n    cout << i;\n}',
            output: "0 1 2 3 4"
        }
    },

    Java: {
        "System.out.println()": {
            meaning: "Prints output and moves to a new line.",
            syntax: "System.out.println(value);",
            example: 'System.out.println("Hello World");',
            output: "Hello World"
        },
        "Scanner": {
            meaning: "Reads input from the user.",
            syntax: "Scanner sc = new Scanner(System.in);",
            example: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();",
            output: "Reads user input."
        },
        "class": {
            meaning: "Defines a class.",
            syntax: "class ClassName { }",
            example: "class Person {\n}",
            output: "Creates a class."
        },
        "if": {
            meaning: "Runs code when a condition is true.",
            syntax: "if (condition) { }",
            example: 'if(age >= 18) {\n    System.out.println("Adult");\n}',
            output: "Adult"
        },
        "for": {
            meaning: "Repeats code using a loop.",
            syntax: "for(initialization; condition; update)",
            example: 'for(int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
            output: "0 1 2 3 4"
        }
    },

    JavaScript: {
        "console.log()": {
            meaning: "Prints information to the browser console.",
            syntax: "console.log(value)",
            example: 'console.log("Hello World");',
            output: "Hello World"
        },
        "let": {
            meaning: "Declares a block-scoped variable.",
            syntax: "let variable = value;",
            example: "let age = 20;",
            output: "Creates a variable."
        },
        "const": {
            meaning: "Declares a variable that cannot be reassigned.",
            syntax: "const variable = value;",
            example: "const pi = 3.14159;",
            output: "Creates a constant."
        },
        "function": {
            meaning: "Creates a reusable function.",
            syntax: "function name() { }",
            example: 'function greet() {\n    console.log("Hello");\n}',
            output: "Creates a function."
        },
        "if": {
            meaning: "Runs code when a condition is true.",
            syntax: "if (condition) { }",
            example: 'if(age >= 18) {\n    console.log("Adult");\n}',
            output: "Adult"
        },
        "for": {
            meaning: "Repeats code using a loop.",
            syntax: "for(initialization; condition; update)",
            example: 'for(let i = 0; i < 5; i++) {\n    console.log(i);\n}',
            output: "0 1 2 3 4"
        }
    },

    HTML: {
        "<html>": {
            meaning: "Defines the root of an HTML document.",
            syntax: "<html> ... </html>",
            example: "<html>\n</html>",
            output: "Root of the document."
        },
        "<head>": {
            meaning: "Contains metadata and resources.",
            syntax: "<head> ... </head>",
            example: "<head>\n    <title>Bob</title>\n</head>",
            output: "Contains page metadata."
        },
        "<body>": {
            meaning: "Contains visible page content.",
            syntax: "<body> ... </body>",
            example: "<body>\n    <h1>Hello</h1>\n</body>",
            output: "Displays page content."
        },
        "<h1>": {
            meaning: "Creates a large heading.",
            syntax: "<h1>Text</h1>",
            example: "<h1>Hello World</h1>",
            output: "Displays a heading."
        },
        "<p>": {
            meaning: "Creates a paragraph.",
            syntax: "<p>Text</p>",
            example: "<p>This is Bob.</p>",
            output: "Displays paragraph text."
        },
        "<button>": {
            meaning: "Creates a clickable button.",
            syntax: "<button>Text</button>",
            example: "<button>Click Me</button>",
            output: "Creates a button."
        },
        "<a>": {
            meaning: "Creates a hyperlink.",
            syntax: '<a href="URL">Text</a>',
            example: '<a href="https://example.com">Visit</a>',
            output: "Creates a link."
        }
    },

    CSS: {
        "color": {
            meaning: "Changes text color.",
            syntax: "color: value;",
            example: "color: red;",
            output: "Changes text color."
        },
        "background": {
            meaning: "Changes an element's background.",
            syntax: "background: value;",
            example: "background: black;",
            output: "Changes background."
        },
        "font-size": {
            meaning: "Changes text size.",
            syntax: "font-size: value;",
            example: "font-size: 20px;",
            output: "Makes text 20px."
        },
        "margin": {
            meaning: "Creates space outside an element.",
            syntax: "margin: value;",
            example: "margin: 20px;",
            output: "Adds outside spacing."
        },
        "padding": {
            meaning: "Creates space inside an element.",
            syntax: "padding: value;",
            example: "padding: 20px;",
            output: "Adds inside spacing."
        },
        "display: flex": {
            meaning: "Enables Flexbox layout.",
            syntax: "display: flex;",
            example: ".container {\n    display: flex;\n}",
            output: "Creates a flexible layout."
        }
    }
};

let selectedLanguage = "Python";

function loadLanguages() {
    const container = document.getElementById("languageButtons");
    container.innerHTML = "";

    Object.keys(programmingManual).forEach(language => {
        const button = document.createElement("button");
        button.textContent = language;
        button.onclick = () => selectLanguage(language);
        if (language === selectedLanguage) button.classList.add("selected");
        container.appendChild(button);
    });
}

function selectLanguage(language) {
    selectedLanguage = language;

    document.querySelectorAll("#languageButtons button").forEach(button => {
        button.classList.toggle("selected", button.textContent === language);
    });

    loadTopics(language);
}

function loadTopics(language) {
    const list = document.getElementById("manualList");
    list.innerHTML = "";

    Object.keys(programmingManual[language]).forEach(topic => {
        const button = document.createElement("button");
        button.className = "manual-button";
        button.textContent = topic;
        button.onclick = () => showManualTopic(language, topic);
        list.appendChild(button);
    });

    const firstTopic = Object.keys(programmingManual[language])[0];
    if (firstTopic) showManualTopic(language, firstTopic);
}

function showManualTopic(language, topic) {
    const info = programmingManual[language][topic];

    document.getElementById("manualInfo").innerHTML = `
        <h2>${escapeHTML(language)} → ${escapeHTML(topic)}</h2>

        <h3>Meaning</h3>
        <p>${escapeHTML(info.meaning)}</p>

        <h3>Syntax</h3>
        <pre>${escapeHTML(info.syntax)}</pre>

        <h3>Example</h3>
        <pre>${escapeHTML(info.example)}</pre>

        <h3>Output / Result</h3>
        <pre>${escapeHTML(info.output)}</pre>
    `;
}

// ------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------

renderMemory();
renderNotes();
renderTasks();
loadLanguages();
loadTopics("Python");
startRPS();
showPage("home");
