// ============================================================
// PAGE NAVIGATION
// ============================================================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById(pageName)
        .classList.add("active");
}


// ============================================================
// CHAT
// ============================================================

function sendChat() {

    const input = document.getElementById("chatInput");

    const message = input.value.trim();

    if (!message) {
        return;
    }

    const output = document.getElementById("chatOutput");

    output.innerHTML +=
        `<strong>You:</strong> ${message}<br>`;

    const response = botResponse(
        message.toLowerCase()
    );

    output.innerHTML +=
        `<strong>Bob:</strong> ${response}<br><br>`;

    output.scrollTop = output.scrollHeight;

    input.value = "";
}


function botResponse(message) {

    const responses = {

        "hi":
            "Hi! 👋",

        "hello":
            "Hello! How can I help?",

        "hey":
            "Hey! 😎",

        "how are you":
            "I'm doing great! My code is running perfectly.",

        "who are you":
            "I'm Bob, your Python personal assistant.",

        "what is your name":
            "My name is Bob.",

        "who made you":
            "You made me using code! 🐍",

        "are you human":
            "Nope! I'm a computer program.",

        "thanks":
            "You're welcome! 😎",

        "thank you":
            "Anytime!",

        "good morning":
            "Good morning! ☀️",

        "good night":
            "Good night! 😴",

        "i am bored":
            "Try one of the games! 🎮",

        "i am happy":
            "That's great to hear! 😄",

        "i am sad":
            "I'm sorry you're feeling that way. I hope things get better.",

        "do you like python":
            "Of course! Python is what started me! 🐍",

        "good bot":
            "Thank you! 😎"

    };

    if (responses[message]) {
        return responses[message];
    }

    if (message.includes("joke")) {
        return getJoke();
    }

    if (message.includes("time")) {
        return new Date().toLocaleTimeString();
    }

    if (message.includes("date")) {
        return new Date().toLocaleDateString();
    }

    return "I don't understand that yet. Try something else.";
}


// ============================================================
// CALCULATOR
// ============================================================

function calculate() {

    const a = Number(
        document.getElementById("num1").value
    );

    const b = Number(
        document.getElementById("num2").value
    );

    const op =
        document.getElementById("operation").value;

    let result;

    if (op === "+") {
        result = a + b;
    }

    else if (op === "-") {
        result = a - b;
    }

    else if (op === "*") {
        result = a * b;
    }

    else if (op === "/") {

        if (b === 0) {
            result = "Cannot divide by zero.";
        }

        else {
            result = a / b;
        }
    }

    else if (op === "%") {
        result = a % b;
    }

    else if (op === "//") {

        if (b === 0) {
            result = "Cannot divide by zero.";
        }

        else {
            result = Math.floor(a / b);
        }
    }

    else if (op === "**") {
        result = a ** b;
    }

    document.getElementById(
        "calcResult"
    ).textContent =
        "Result: " + result;
}


// ============================================================
// DATE & TIME
// ============================================================

function updateClock() {

    const now = new Date();

    const date =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    const time =
        now.toLocaleTimeString();

    document.getElementById(
        "clock"
    ).innerHTML =
        `${date}<br><br>${time}`;
}


setInterval(
    updateClock,
    1000
);

updateClock();


// ============================================================
// CONVERTER
// ============================================================

function convertUnits() {

    const value = Number(
        document.getElementById(
            "conversionValue"
        ).value
    );

    const type =
        document.getElementById(
            "conversion"
        ).value;

    let result;

    switch (type) {

        case "km-miles":
            result = value * 0.621371;
            break;

        case "miles-km":
            result = value * 1.60934;
            break;

        case "kg-lb":
            result = value * 2.20462;
            break;

        case "lb-kg":
            result = value * 0.453592;
            break;

        case "c-f":
            result = (value * 9 / 5) + 32;
            break;

        case "f-c":
            result = (value - 32) * 5 / 9;
            break;
    }

    document.getElementById(
        "conversionResult"
    ).textContent =
        "Result: " + result.toFixed(2);
}


// ============================================================
// MEMORY
// ============================================================

function saveName() {

    const name =
        document.getElementById(
            "nameInput"
        ).value.trim();

    if (!name) {
        return;
    }

    localStorage.setItem(
        "bobName",
        name
    );

    renderMemory();

    alert(
        `Nice to meet you, ${name}!`
    );
}


function addMemory() {

    const input =
        document.getElementById(
            "memoryInput"
        );

    const value =
        input.value.trim();

    if (!value) {
        return;
    }

    let memory =
        JSON.parse(
            localStorage.getItem(
                "bobMemory"
            )
        ) || [];

    memory.push(value);

    localStorage.setItem(
        "bobMemory",
        JSON.stringify(memory)
    );

    input.value = "";

    renderMemory();
}


function renderMemory() {

    const list =
        document.getElementById(
            "memoryList"
        );

    list.innerHTML = "";

    const name =
        localStorage.getItem(
            "bobName"
        );

    if (name) {

        const li =
            document.createElement("li");

        li.textContent =
            "Name: " + name;

        list.appendChild(li);
    }

    const memory =
        JSON.parse(
            localStorage.getItem(
                "bobMemory"
            )
        ) || [];

    memory.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);
    });
}


function clearMemory() {

    localStorage.removeItem(
        "bobName"
    );

    localStorage.removeItem(
        "bobMemory"
    );

    renderMemory();
}


renderMemory();


// ============================================================
// NOTES
// ============================================================

function addNote() {

    const input =
        document.getElementById(
            "noteInput"
        );

    const note =
        input.value.trim();

    if (!note) {
        return;
    }

    let notes =
        JSON.parse(
            localStorage.getItem(
                "bobNotes"
            )
        ) || [];

    notes.push(note);

    localStorage.setItem(
        "bobNotes",
        JSON.stringify(notes)
    );

    input.value = "";

    renderNotes();
}


function deleteNote(index) {

    let notes =
        JSON.parse(
            localStorage.getItem(
                "bobNotes"
            )
        ) || [];

    notes.splice(index, 1);

    localStorage.setItem(
        "bobNotes",
        JSON.stringify(notes)
    );

    renderNotes();
}


function renderNotes() {

    const list =
        document.getElementById(
            "notesList"
        );

    list.innerHTML = "";

    const notes =
        JSON.parse(
            localStorage.getItem(
                "bobNotes"
            )
        ) || [];

    notes.forEach(
        (note, index) => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `${note}
                <button onclick="deleteNote(${index})">
                    Delete
                </button>`;

            list.appendChild(li);
        }
    );
}


renderNotes();


// ============================================================
// TODO
// ============================================================

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );

    const task =
        input.value.trim();

    if (!task) {
        return;
    }

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "bobTasks"
            )
        ) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem(
        "bobTasks",
        JSON.stringify(tasks)
    );

    input.value = "";

    renderTasks();
}


function completeTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "bobTasks"
            )
        ) || [];

    tasks[index].completed =
        !tasks[index].completed;

    localStorage.setItem(
        "bobTasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}


function deleteTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "bobTasks"
            )
        ) || [];

    tasks.splice(index, 1);

    localStorage.setItem(
        "bobTasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}


function renderTasks() {

    const list =
        document.getElementById(
            "taskList"
        );

    list.innerHTML = "";

    const tasks =
        JSON.parse(
            localStorage.getItem(
                "bobTasks"
            )
        ) || [];

    tasks.forEach(
        (task, index) => {

            const li =
                document.createElement("li");

            const status =
                task.completed
                    ? "✓"
                    : "○";

            li.innerHTML =
                `${status} ${task.text}
                <button onclick="completeTask(${index})">
                    Complete
                </button>
                <button onclick="deleteTask(${index})">
                    Delete
                </button>`;

            list.appendChild(li);
        }
    );
}


renderTasks();


// ============================================================
// NUMBER GUESSING GAME
// ============================================================

let secretNumber = 0;

function startGuessGame() {

    secretNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;

    document.getElementById(
        "guessResult"
    ).textContent =
        "New game started!";
}


function makeGuess() {

    const guess =
        Number(
            document.getElementById(
                "guessInput"
            ).value
        );

    const result =
        document.getElementById(
            "guessResult"
        );

    if (!secretNumber) {
        startGuessGame();
    }

    if (guess < secretNumber) {

        result.textContent =
            "Too low! ⬇️";
    }

    else if (guess > secretNumber) {

        result.textContent =
            "Too high! ⬆️";
    }

    else {

        result.textContent =
            "🎉 Correct! You won!";

        secretNumber = 0;
    }
}


// ============================================================
// ROCK PAPER SCISSORS
// ============================================================

let rpsRound = 1;
let rpsPlayerScore = 0;
let rpsBobScore = 0;
let rpsDraws = 0;


function startRPS() {

    rpsRound = 1;

    rpsPlayerScore = 0;

    rpsBobScore = 0;

    rpsDraws = 0;

    document.getElementById(
        "rpsRound"
    ).textContent =
        "Round 1 / 5";

    document.getElementById(
        "rpsResult"
    ).textContent =
        "Choose your move!";

    document.getElementById(
        "rpsScore"
    ).textContent =
        "You: 0 | Bob: 0 | Draws: 0";

    document.getElementById(
        "rpsHistory"
    ).innerHTML = "";
}


function playRPS(playerChoice) {

    if (rpsRound > 5) {
        return;
    }

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];

    const bobChoice =
        choices[
            Math.floor(
                Math.random() * choices.length
            )
        ];

    let result;

    if (playerChoice === bobChoice) {

        result = "DRAW 🤝";

        rpsDraws++;
    }

    else if (

        (
            playerChoice === "rock" &&
            bobChoice === "scissors"
        )

        ||

        (
            playerChoice === "paper" &&
            bobChoice === "rock"
        )

        ||

        (
            playerChoice === "scissors" &&
            bobChoice === "paper"
        )

    ) {

        result = "YOU WIN THIS ROUND! 🏆";

        rpsPlayerScore++;
    }

    else {

        result = "BOB WINS THIS ROUND! 🤖";

        rpsBobScore++;
    }


    document.getElementById(
        "rpsResult"
    ).innerHTML =

        `You chose: <strong>${playerChoice.toUpperCase()}</strong><br>
         Bob chose: <strong>${bobChoice.toUpperCase()}</strong><br><br>
         ${result}`;


    document.getElementById(
        "rpsScore"
    ).textContent =

        `You: ${rpsPlayerScore} | ` +
        `Bob: ${rpsBobScore} | ` +
        `Draws: ${rpsDraws}`;


    document.getElementById(
        "rpsHistory"
    ).innerHTML +=

        `Round ${rpsRound}: ` +
        `You = ${playerChoice} | ` +
        `Bob = ${bobChoice} | ` +
        `${result}<br>`;


    if (rpsRound === 5) {

        let finalResult;

        if (rpsPlayerScore > rpsBobScore) {

            finalResult =
                "🏆 YOU WIN THE MATCH!";

        }

        else if (rpsBobScore > rpsPlayerScore) {

            finalResult =
                "🤖 BOB WINS THE MATCH!";

        }

        else {

            finalResult =
                "🤝 MATCH DRAW!";
        }


        document.getElementById(
            "rpsRound"
        ).textContent =
            "🏁 MATCH FINISHED";


        document.getElementById(
            "rpsResult"
        ).innerHTML +=
            `<br><br>
            <strong>${finalResult}</strong><br>
            Final Score: ${rpsPlayerScore} - ${rpsBobScore}`;


        return;
    }


    rpsRound++;

    document.getElementById(
        "rpsRound"
    ).textContent =
        `Round ${rpsRound} / 5`;
}


// ============================================================
// FUN
// ============================================================

function getJoke() {

    const jokes = [

        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",

        "Why was the Python programmer cold? He left his Windows open! 😂",

        "There are 10 kinds of people: those who understand binary and those who don't.",

        "Why did the programmer quit his job? Because he didn't get arrays! 😂"

    ];

    return jokes[
        Math.floor(
            Math.random() * jokes.length
        )
    ];
}


function joke() {

    document.getElementById(
        "funResult"
    ).textContent =
        getJoke();
}


function dice() {

    const number =
        Math.floor(
            Math.random() * 6
        ) + 1;

    document.getElementById(
        "funResult"
    ).textContent =
        `🎲 You rolled ${number}!`;
}


function coin() {

    const result =
        Math.random() < 0.5
            ? "Heads"
            : "Tails";

    document.getElementById(
        "funResult"
    ).textContent =
        `🪙 ${result}!`;
}


function randomNumber() {

    const number =
        Math.floor(
            Math.random() * 100
        ) + 1;

    document.getElementById(
        "funResult"
    ).textContent =
        `🔢 Random number: ${number}`;
}


// ============================================================
// PYTHON MANUAL
// ============================================================

const pythonManual = {

    "print()": {
        meaning:
            "Displays output on the screen.",

        syntax:
            "print(value)",

        example:
            'print("Hello World")',

        output:
            "Hello World"
    },

    "input()": {
        meaning:
            "Takes input from the user.",

        syntax:
            'input("message")',

        example:
            'name = input("Enter your name: ")',

        output:
            "Stores user input."
    },

    "variable": {
        meaning:
            "A name used to store a value.",

        syntax:
            "name = value",

        example:
            'name = "Bob"',

        output:
            "Bob"
    },

    "string": {
        meaning:
            "Text data.",

        syntax:
            'text = "Hello"',

        example:
            'name = "Bob"',

        output:
            "Bob"
    },

    "integer": {
        meaning:
            "A whole number.",

        syntax:
            "number = 10",

        example:
            "age = 20",

        output:
            "20"
    },

    "float": {
        meaning:
            "A decimal number.",

        syntax:
            "number = 3.14",

        example:
            "price = 99.99",

        output:
            "99.99"
    },

    "boolean": {
        meaning:
            "True or False value.",

        syntax:
            "value = True",

        example:
            "logged_in = True",

        output:
            "True"
    },

    "list": {
        meaning:
            "An ordered collection of values.",

        syntax:
            "items = [values]",

        example:
            'fruits = ["apple", "banana"]',

        output:
            "Stores multiple values."
    },

    "dictionary": {
        meaning:
            "Stores key-value pairs.",

        syntax:
            "data = {key: value}",

        example:
            'person = {"name": "Bob"}',

        output:
            "name → Bob"
    },

    "if": {
        meaning:
            "Runs code when a condition is true.",

        syntax:
            "if condition:",

        example:
            'if age >= 18:\n    print("Adult")',

        output:
            "Adult"
    },

    "elif": {
        meaning:
            "Checks another condition.",

        syntax:
            "elif condition:",

        example:
            'elif age >= 13:\n    print("Teen")',

        output:
            "Teen"
    },

    "else": {
        meaning:
            "Runs when previous conditions are false.",

        syntax:
            "else:",

        example:
            'else:\n    print("Child")',

        output:
            "Child"
    },

    "for": {
        meaning:
            "Repeats code over a sequence.",

        syntax:
            "for item in sequence:",

        example:
            "for i in range(5):\n    print(i)",

        output:
            "0 1 2 3 4"
    },

    "while": {
        meaning:
            "Repeats while a condition is true.",

        syntax:
            "while condition:",

        example:
            "while x < 5:\n    x += 1",

        output:
            "Repeats until condition becomes false."
    },

    "function": {
        meaning:
            "A reusable block of code.",

        syntax:
            "def function_name():",

        example:
            'def greet():\n    print("Hello")',

        output:
            "Creates a function."
    },

    "return": {
        meaning:
            "Sends a value back from a function.",

        syntax:
            "return value",

        example:
            "return x + y",

        output:
            "Returns the result."
    },

    "import": {
        meaning:
            "Loads a Python module.",

        syntax:
            "import module",

        example:
            "import random",

        output:
            "Makes the module available."
    },

    "try": {
        meaning:
            "Attempts code that might cause an error.",

        syntax:
            "try:",

        example:
            "try:\n    number = int(input())",

        output:
            "Attempts the operation."
    },

    "except": {
        meaning:
            "Handles an error.",

        syntax:
            "except ErrorType:",

        example:
            'except ValueError:\n    print("Invalid")',

        output:
            "Handles the error."
    },

    "class": {
        meaning:
            "A blueprint for creating objects.",

        syntax:
            "class ClassName:",

        example:
            "class Person:",

        output:
            "Creates a class."
    },

    "object": {
        meaning:
            "An instance of a class.",

        syntax:
            "object = Class()",

        example:
            "person = Person()",

        output:
            "Creates an object."
    },

    "len()": {
        meaning:
            "Returns the length of something.",

        syntax:
            "len(value)",

        example:
            'len("Hello")',

        output:
            "5"
    },

    "range()": {
        meaning:
            "Generates a sequence of numbers.",

        syntax:
            "range(start, stop)",

        example:
            "range(5)",

        output:
            "0, 1, 2, 3, 4"
    },

    "type()": {
        meaning:
            "Returns the type of a value.",

        syntax:
            "type(value)",

        example:
            "type(10)",

        output:
            "<class 'int'>"
    },

    "int()": {
        meaning:
            "Converts a value to an integer.",

        syntax:
            "int(value)",

        example:
            'int("25")',

        output:
            "25"
    },

    "float()": {
        meaning:
            "Converts a value to a floating point number.",

        syntax:
            "float(value)",

        example:
            'float("3.14")',

        output:
            "3.14"
    },

    "str()": {
        meaning:
            "Converts a value to a string.",

        syntax:
            "str(value)",

        example:
            "str(123)",

        output:
            '"123"'
    }
};


function loadManual() {

    const list =
        document.getElementById(
            "manualList"
        );

    Object.keys(
        pythonManual
    ).forEach(term => {

        const button =
            document.createElement("button");

        button.className =
            "manual-button";

        button.textContent =
            term;

        button.onclick = () =>
            showManual(term);

        list.appendChild(button);
    });
}


function showManual(term) {

    const info =
        pythonManual[term];

    document.getElementById(
        "manualInfo"
    ).innerHTML =

        `<h2>${term}</h2>

        <h3>Meaning</h3>
        <p>${info.meaning}</p>

        <h3>Syntax</h3>
        <pre>${info.syntax}</pre>

        <h3>Example</h3>
        <pre>${info.example}</pre>

        <h3>Output / Result</h3>
        <pre>${info.output}</pre>`;
}


loadManual();


// ============================================================
// START
// ============================================================

startGuessGame();
startRPS();
showPage("home");
