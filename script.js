// ============================================================
// GEEKsy - TECH COMMUNITY + AI ASSISTANT
// ============================================================

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    const page = document.getElementById(pageName);
    if (page) page.classList.add("active");
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ---------------- CHAT ----------------

function quickChat(message) {
    document.getElementById("chatInput").value = message;
    sendChat();
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (!message) return;

    const output = document.getElementById("chatOutput");
    output.innerHTML += `<div class="user-message"><strong>You:</strong> ${escapeHTML(message)}</div>`;

    let response = smartChatCommand(message);
    if (!response) response = botResponse(message.toLowerCase());

    output.innerHTML += `<div class="bot-message"><strong>AI Assistant:</strong> ${escapeHTML(response)}</div>`;
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
        "who are you": "I'm your AI assistant inside Geeksy.",
        "what is your name": "I am Geeksy AI Assistant.",
        "who made you": "You made me using code! 👨‍💻",
        "are you human": "Nope! I'm a computer program.",
        "thanks": "You're welcome! 😎",
        "thank you": "Anytime!",
        "good morning": "Good morning! ☀️",
        "good night": "Good night! 😴",
        "i am bored": "Try one of the games! 🎮",
        "im bored": "Try one of the games! 🎮",
        "do you like python": "Python is one of the languages in my programming manual. 🐍",
        "good bot": "Thank you! 😎",
        "bad bot": "😭 I'll try to improve!",
        "what can you do": "I can chat, calculate, convert units, save notes/tasks, play games and teach programming languages."
    };

    if (responses[message]) return responses[message];
    if (message.includes("joke")) return getJoke();
    if (message.includes("time")) return new Date().toLocaleTimeString("en-IN");
    if (message.includes("date")) return new Date().toLocaleDateString("en-IN");
    if (message.includes("manual") || message.includes("learn")) return "Open 📚 Programming Manual. You can search topics across Python, C, C++, Java, JavaScript, HTML and CSS.";

    // Lightweight local AI-style knowledge lookup: use the built-in manual to answer
    // common programming questions without pretending this is a remote LLM.
    if (typeof programmingManual !== "undefined") {
        const q = message.toLowerCase();
        for (const [language, categories] of Object.entries(programmingManual)) {
            for (const [category, topics] of Object.entries(categories)) {
                for (const topic of topics) {
                    const name = String(topic[0]).toLowerCase();
                    if (q === name || q.includes(name)) {
                        return `${language} — ${topic[0]}: ${topic[1]} Syntax: ${topic[2]} Example: ${topic[3]}`;
                    }
                }
            }
        }
    }
    return "I'm Geeksy AI Assistant, a lightweight browser chatbot. Try asking about programming, games, tools, Bhagavad Gita, or say \"open games\".";
}


// ---------------- SMART CHAT COMMAND ROUTER ----------------
// The AI assistant can control Geeksy menus from the Chat screen.
// Examples: "open calculator", "give me a joke", "roll a d20",
// "play tic tac toe", "show Bhagavad Gita", "add todo: study DSA".

function smartChatCommand(message) {
    const m = message.toLowerCase().trim();

    if (m.includes("bhagavad gita") || m.includes("gita") || m.includes("geeta") || m.includes("shloka") || m.includes("shlok")) {
        showPage("gita");
        randomGitaVerse();
        return "🕉️ Opening Bhagavad Gita and showing a random shloka.";
    }

    if (m.includes("open") || m.includes("show") || m.includes("go to")) {
        if (m.includes("manual") || m.includes("programming guide") || m.includes("learn")) {
            showPage("manual"); return "📚 Opening the Programming Manual.";
        }
        if (m.includes("game")) {
            showPage("games"); return "🎮 Opening Games.";
        }
        if (m.includes("fun") || m.includes("random")) {
            showPage("fun"); return "😂 Opening Fun & Random.";
        }
        if (m.includes("calculator") || m.includes("calculate")) {
            showPage("calculator"); return "🧮 Opening Calculator.";
        }
        if (m.includes("note")) {
            showPage("notes"); return "📝 Opening Notes.";
        }
        if (m.includes("todo") || m.includes("to-do") || m.includes("task")) {
            showPage("todo"); return "✅ Opening To-Do.";
        }
        if (m.includes("memory")) {
            showPage("memory"); return "🧠 Opening Memory.";
        }
        if (m.includes("converter") || m.includes("convert")) {
            showPage("converter"); return "🔄 Opening Converter.";
        }
    }

    if (m.includes("joke")) { showPage("fun"); joke(); return "😂 Here's a joke."; }
    if (m.includes("riddle")) { showPage("fun"); riddle(); return "🧠 Here's a riddle."; }
    if (m.includes("fun fact")) { showPage("fun"); funFact(); return "💡 Here's a fun fact."; }
    if (m.includes("would you rather")) { showPage("fun"); wouldYouRather(); return "🤔 Here's your choice."; }
    if (m.includes("roast ai") || m === "roast me") { showPage("fun"); roastAssistant(); return "🔥 Roast incoming."; }
    if (m.includes("compliment")) { showPage("fun"); compliment(); return "💬 Here's a compliment."; }
    if (m.includes("magic 8") || m.includes("magic eight")) { showPage("fun"); magic8(); return "🎱 Magic 8 Ball says..."; }
    if (m.includes("fortune")) { showPage("fun"); fortune(); return "🔮 Here's your fortune."; }
    if (m.includes("mood")) { showPage("fun"); mood(); return "🎭 Random mood generated."; }
    if (m.includes("coding challenge")) { showPage("fun"); codingChallenge(); return "💻 Here's your coding challenge."; }

    const diceMatch = m.match(/(?:roll|throw)\s+(?:a\s+)?(?:d|dice\s+)?(\d+)/);
    if (diceMatch) {
        const sides = Number(diceMatch[1]);
        if (sides >= 2 && sides <= 1000) {
            showPage("fun"); rollDice(sides);
            return `🎲 Rolled a d${sides}.`;
        }
    }
    if (m.includes("dice")) { showPage("fun"); rollDice(6); return "🎲 Rolled a d6."; }
    if (m.includes("coin") || m.includes("heads or tails")) { showPage("fun"); coin(); return "🪙 Coin flipped."; }
    if (m.includes("random color")) { showPage("fun"); randomColor(); return "🎨 Random color generated."; }
    if (m.includes("random word")) { showPage("fun"); randomWord(); return "🔠 Random word generated."; }
    if (m.includes("random letter")) { showPage("fun"); randomLetter(); return "🔤 Random letter generated."; }
    if (m.includes("random name")) { showPage("fun"); randomName(); return "👤 Random name generated."; }
    if (m.includes("random date")) { showPage("fun"); randomDate(); return "📅 Random date generated."; }
    if (m.includes("random time")) { showPage("fun"); randomTime(); return "⏱️ Random time generated."; }
    if (m.includes("password")) { showPage("fun"); passwordGenerator(); return "🔐 Password generated locally."; }
    if (m.includes("random choice") || m.includes("choose for me")) { showPage("fun"); randomChoice(); return "🎯 I chose for you."; }
    if (m.includes("slot machine") || m.includes("slot")) { showPage("fun"); slotMachine(); return "🎰 Slot machine spun."; }

    if (m.includes("word scramble") || m.includes("scramble")) {
        showPage("fun"); startWordScramble(); return "🔤 Word Scramble started.";
    }
    if (m.includes("math challenge") || m.includes("math game")) {
        showPage("fun"); startMathChallenge(); return "➗ Math Challenge started.";
    }
    if (m.includes("reaction timer") || m.includes("reaction test")) {
        showPage("fun"); startReactionTimer(); return "⚡ Reaction Timer started.";
    }
    if (m.includes("tic tac toe") || m.includes("tic-tac-toe")) {
        showPage("fun"); newTicTacToe(); return "❌ Tic-Tac-Toe started.";
    }
    if (m.includes("higher lower") || m.includes("higher or lower")) {
        showPage("fun"); higherLower(); return "🃏 Higher / Lower generated.";
    }
    if (m.includes("color guess")) {
        showPage("fun"); colorGuess(); return "🎨 Color Guess started.";
    }
    if (m.includes("heads streak") || m.includes("coin streak")) {
        showPage("fun"); headsTailsStreak(); return "🪙 Heads streak generated.";
    }

    if (m.includes("rock paper scissors") || m === "rps") {
        showPage("games"); showGame("rpsGame"); startRPS(); return "✊ Rock Paper Scissors started — 5 rounds.";
    }
    if (m.includes("number guessing") || m.includes("guess number")) {
        showPage("games"); showGame("guessGame"); startGuessGame(); return "🎯 Number Guessing started — 1 to 100.";
    }

    if (m.includes("what time") || m === "time" || m.includes("current time")) {
        showPage("datetime"); return `🕐 It's ${new Date().toLocaleTimeString("en-IN")}.`;
    }
    if (m.includes("what date") || m === "date" || m.includes("today date")) {
        showPage("datetime"); return `📅 Today is ${new Date().toLocaleDateString("en-IN")}.`;
    }

    const noteMatch = message.match(/^(?:add|save|write)\s+(?:a\s+)?note(?:\s*[:\-]\s*|\s+)(.+)$/i);
    if (noteMatch) {
        document.getElementById("noteInput").value = noteMatch[1].trim();
        addNote(); showPage("notes");
        return `📝 Saved note: "${noteMatch[1].trim()}"`;
    }

    const todoMatch = message.match(/^(?:add|create)\s+(?:a\s+)?(?:todo|to-do|task)(?:\s*[:\-]\s*|\s+)(.+)$/i);
    if (todoMatch) {
        document.getElementById("taskInput").value = todoMatch[1].trim();
        addTask(); showPage("todo");
        return `✅ Added task: "${todoMatch[1].trim()}"`;
    }

    // Manual search from Chat: "explain python print" / "teach me css flex"
    const learnMatch = message.match(/^(?:explain|teach me|what is|what does)\s+(?:(python|c\+\+|c|java|javascript|html|css)\s+)?(.+)$/i);
    if (learnMatch && document.getElementById("manualSearch")) {
        showPage("manual");
        const term = learnMatch[2].trim();
        document.getElementById("manualSearch").value = term;
        filterManual();
        return `📚 Searching the Programming Manual for "${term}".`;
    }

    return null;
}


// ---------------- CALCULATOR ----------------

function calculate() {
    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value;
    const op = document.getElementById("operation").value;

    if (n1 === "" || n2 === "") {
        document.getElementById("calcResult").textContent = "⚠️ Enter both numbers.";
        return;
    }

    const a = Number(n1), b = Number(n2);
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

// ---------------- DATE/TIME ----------------

function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", {day:"numeric",month:"long",year:"numeric"});
    const time = now.toLocaleTimeString("en-IN");
    const clock = document.getElementById("clock");
    if (clock) clock.innerHTML = `${date}<br><br>${time}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---------------- CONVERTER ----------------

function convertUnits() {
    const raw = document.getElementById("conversionValue").value;
    if (raw === "") {
        document.getElementById("conversionResult").textContent = "⚠️ Enter a value.";
        return;
    }

    const value = Number(raw);
    const type = document.getElementById("conversion").value;
    let result;

    switch(type) {
        case "km-miles": result=value*0.621371; break;
        case "miles-km": result=value*1.60934; break;
        case "kg-lb": result=value*2.20462; break;
        case "lb-kg": result=value*0.453592; break;
        case "c-f": result=(value*9/5)+32; break;
        case "f-c": result=(value-32)*5/9; break;
    }
    document.getElementById("conversionResult").textContent = "Result: " + result.toFixed(2);
}

// ---------------- MEMORY ----------------

function saveName() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) return;
    localStorage.setItem("geeksyName", name);
    renderMemory();
    alert(`Nice to meet you, ${name}!`);
}

function addMemory() {
    const input=document.getElementById("memoryInput"), value=input.value.trim();
    if (!value) return;
    const memory=JSON.parse(localStorage.getItem("geeksyMemory"))||[];
    memory.push(value);
    localStorage.setItem("geeksyMemory",JSON.stringify(memory));
    input.value="";
    renderMemory();
}

function renderMemory() {
    const list=document.getElementById("memoryList");
    if(!list) return;
    list.innerHTML="";
    const name=localStorage.getItem("geeksyName");
    if(name) {
        const li=document.createElement("li");
        li.textContent="Name: "+name;
        list.appendChild(li);
    }
    const memory=JSON.parse(localStorage.getItem("geeksyMemory"))||[];
    memory.forEach(item=>{const li=document.createElement("li");li.textContent=item;list.appendChild(li);});
}

function clearMemory() {
    localStorage.removeItem("geeksyName");
    localStorage.removeItem("geeksyMemory");
    renderMemory();
}

// ---------------- NOTES ----------------

function addNote() {
    const input=document.getElementById("noteInput"), note=input.value.trim();
    if(!note) return;
    const notes=JSON.parse(localStorage.getItem("geeksyNotes"))||[];
    notes.push(note);
    localStorage.setItem("geeksyNotes",JSON.stringify(notes));
    input.value="";
    renderNotes();
}

function deleteNote(index) {
    const notes=JSON.parse(localStorage.getItem("geeksyNotes"))||[];
    notes.splice(index,1);
    localStorage.setItem("geeksyNotes",JSON.stringify(notes));
    renderNotes();
}

function renderNotes() {
    const list=document.getElementById("notesList");
    if(!list) return;
    list.innerHTML="";
    const notes=JSON.parse(localStorage.getItem("geeksyNotes"))||[];
    notes.forEach((note,index)=>{
        const li=document.createElement("li");
        li.textContent=note;
        const btn=document.createElement("button");
        btn.textContent="Delete";
        btn.onclick=()=>deleteNote(index);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

// ---------------- TODO ----------------

function addTask() {
    const input=document.getElementById("taskInput"), text=input.value.trim();
    if(!text) return;
    const tasks=JSON.parse(localStorage.getItem("geeksyTasks"))||[];
    tasks.push({text,completed:false});
    localStorage.setItem("geeksyTasks",JSON.stringify(tasks));
    input.value="";
    renderTasks();
}

function completeTask(index) {
    const tasks=JSON.parse(localStorage.getItem("geeksyTasks"))||[];
    tasks[index].completed=!tasks[index].completed;
    localStorage.setItem("geeksyTasks",JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks=JSON.parse(localStorage.getItem("geeksyTasks"))||[];
    tasks.splice(index,1);
    localStorage.setItem("geeksyTasks",JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list=document.getElementById("taskList");
    if(!list) return;
    list.innerHTML="";
    const tasks=JSON.parse(localStorage.getItem("geeksyTasks"))||[];
    tasks.forEach((task,index)=>{
        const li=document.createElement("li");
        li.textContent=`${task.completed?"✓":"○"} ${task.text}`;
        const complete=document.createElement("button");
        complete.textContent=task.completed?"Undo":"Complete";
        complete.onclick=()=>completeTask(index);
        const remove=document.createElement("button");
        remove.textContent="Delete";
        remove.onclick=()=>deleteTask(index);
        li.appendChild(complete); li.appendChild(remove); list.appendChild(li);
    });
}

// ---------------- NUMBER GUESSING ----------------

let secretNumber=null, guessAttempts=0, guessGameActive=false;

function startGuessGame() {
    secretNumber=Math.floor(Math.random()*100)+1;
    guessAttempts=0; guessGameActive=true;
    const input=document.getElementById("guessInput");
    input.value=""; input.focus();
    document.getElementById("guessResult").textContent="🎮 Game started! Make your first guess.";
    document.getElementById("guessAttempts").textContent="Attempts: 0";
}

function makeGuess() {
    if(!guessGameActive) {
        document.getElementById("guessResult").textContent="⚠️ Click 'Start New Game' first.";
        return;
    }
    const input=document.getElementById("guessInput"), guess=Number(input.value);
    if(!Number.isInteger(guess)||guess<1||guess>100) {
        document.getElementById("guessResult").textContent="⚠️ Enter a whole number between 1 and 100.";
        input.focus(); return;
    }
    guessAttempts++;
    document.getElementById("guessAttempts").textContent=`Attempts: ${guessAttempts}`;

    if(guess===secretNumber) {
        document.getElementById("guessResult").textContent=`🎉 CORRECT! You guessed it in ${guessAttempts} attempts!`;
        guessGameActive=false; input.value=""; return;
    }

    const d=Math.abs(guess-secretNumber);
    if(guess<secretNumber) {
        document.getElementById("guessResult").textContent =
            d<=5 ? "🔥 VERY CLOSE, BUT TOO LOW! Go a little higher." :
            d<=10 ? "🟡 NEAR, BUT TOO LOW! Try a little higher." :
            "⬇️ TOO LOW! Try a higher number.";
    } else {
        document.getElementById("guessResult").textContent =
            d<=5 ? "🔥 VERY CLOSE, BUT TOO HIGH! Go a little lower." :
            d<=10 ? "🟡 NEAR, BUT TOO HIGH! Try a little lower." :
            "⬆️ TOO HIGH! Try a lower number.";
    }
    input.value=""; input.focus();
}

// ---------------- ROCK PAPER SCISSORS ----------------

let rpsRound=1,rpsPlayerScore=0,rpsAIScore=0,rpsDraws=0;

function showGame(gameId) {
    document.querySelectorAll(".game-panel").forEach(g=>g.classList.add("hidden"));
    document.getElementById(gameId).classList.remove("hidden");
}

function startRPS() {
    rpsRound=1;rpsPlayerScore=0;rpsAIScore=0;rpsDraws=0;
    document.getElementById("rpsRound").textContent="Round 1 / 5";
    document.getElementById("rpsResult").textContent="Choose your move!";
    document.getElementById("rpsScore").textContent="You: 0 | AI: 0 | Draws: 0";
    document.getElementById("rpsHistory").innerHTML="";
}

function playRPS(playerChoice) {
    if(rpsRound>5)return;
    const choices=["rock","paper","scissors"];
    const aiChoice=choices[Math.floor(Math.random()*3)];
    let result;

    if(playerChoice===aiChoice){result="DRAW 🤝";rpsDraws++;}
    else if((playerChoice==="rock"&&aiChoice==="scissors")||(playerChoice==="paper"&&aiChoice==="rock")||(playerChoice==="scissors"&&aiChoice==="paper")){result="YOU WIN THIS ROUND! 🏆";rpsPlayerScore++;}
    else{result="AI WINS THIS ROUND! 🤖";rpsAIScore++;}

    document.getElementById("rpsResult").innerHTML=`You chose: <strong>${playerChoice.toUpperCase()}</strong><br>AI chose: <strong>${aiChoice.toUpperCase()}</strong><br><br>${result}`;
    document.getElementById("rpsScore").textContent=`You: ${rpsPlayerScore} | AI: ${rpsAIScore} | Draws: ${rpsDraws}`;
    document.getElementById("rpsHistory").innerHTML+=`Round ${rpsRound}: You = ${playerChoice} | AI = ${aiChoice} | ${result}<br>`;

    if(rpsRound===5) {
        const finalResult=rpsPlayerScore>rpsAIScore?"🏆 YOU WIN THE MATCH!":rpsAIScore>rpsPlayerScore?"🤖 AI WINS THE MATCH!":"🤝 MATCH DRAW!";
        document.getElementById("rpsRound").textContent="🏁 MATCH FINISHED";
        document.getElementById("rpsResult").innerHTML+=`<br><strong>${finalResult}</strong><br>Final Score: You ${rpsPlayerScore} - AI ${rpsAIScore}`;
        return;
    }
    rpsRound++;
    document.getElementById("rpsRound").textContent=`Round ${rpsRound} / 5`;
}

// ---------------- FUN ----------------

function getJoke() {
    const jokes=[
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why was the Python programmer cold? He left his Windows open! 😂",
        "There are 10 kinds of people: those who understand binary and those who don't.",
        "Why did the programmer quit his job? Because he didn't get arrays! 😂",
        "A SQL query walks into a bar and asks: Can I JOIN you? 😂",
        "Why do programmers hate nature? It has too many bugs! 🐛"
    ];
    return jokes[Math.floor(Math.random()*jokes.length)];
}
function joke(){document.getElementById("funResult").textContent=getJoke();}
function dice(){document.getElementById("funResult").textContent=`🎲 You rolled ${Math.floor(Math.random()*6)+1}!`;}
function coin(){document.getElementById("funResult").textContent=`🪙 ${Math.random()<.5?"Heads":"Tails"}!`;}
function randomNumber(){document.getElementById("funResult").textContent=`🔢 Random number: ${Math.floor(Math.random()*100)+1}`;}


// ---------------- DETAILED MANUAL EXPLANATIONS ----------------

const beginnerTips = {
    "print()": "Think of print() as Python's screen/display command. Give it a value and Python shows that value in the console.",
    "input()": "input() pauses the program and waits for the user to type something. The returned value is text unless you convert it.",
    "if": "An if statement is a decision. Python/C/C++/Java/JavaScript checks a condition and runs the block only when it is true.",
    "for": "A for loop repeats a block for each item in a sequence or for each value in a range.",
    "while": "A while loop keeps repeating as long as its condition remains true. Make sure something eventually changes the condition.",
    "function": "A function is a reusable piece of code. Instead of writing the same instructions again, define them once and call the function whenever needed.",
    "def": "def creates a reusable Python function. The function can receive inputs through parameters and can send a result back with return.",
    "return": "return sends a value from a function back to the code that called it. It also immediately ends that function call.",
    "class": "A class is a blueprint for objects. It groups data and behavior together so you can create multiple objects with the same structure.",
    "object": "An object is an actual instance created from a class. It has its own data and can use the class's methods.",
    "list": "A list stores multiple values in order and can be changed after creation. It is one of Python's most commonly used collections.",
    "dict": "A dictionary stores data as key-value pairs. It is useful when you want to look up a value using a meaningful key.",
    "vector": "A C++ vector is like a resizable array. It stores elements in contiguous memory and can grow or shrink automatically.",
    "pointer": "A pointer stores a memory address. The address-of operator & gets an address and * can access the value stored at that address.",
    "malloc()": "malloc dynamically reserves a block of memory. In C, memory obtained with malloc should eventually be released with free.",
    "printf()": "printf prints formatted text in C. Format specifiers such as %d and %f tell printf what kind of value should be inserted.",
    "scanf()": "scanf reads formatted input in C. For ordinary variables you normally pass their address using &.",
    "cout": "std::cout sends output to the C++ standard output stream using the << operator.",
    "cin": "std::cin reads input from the C++ standard input stream using the >> operator.",
    "main()": "main is the entry point used when a normal C, C++ or Java application starts.",
    "System.out.println()": "System.out.println prints a value in Java and then moves the cursor to a new line.",
    "ArrayList": "ArrayList is a resizable Java collection. It is useful when you need an ordered list whose size can change.",
    "console.log()": "console.log writes debugging or informational output to the browser or JavaScript runtime console.",
    "let": "let creates a block-scoped JavaScript variable that can be reassigned.",
    "const": "const creates a block-scoped binding that cannot be reassigned to another value.",
    "map()": "map creates a new array by transforming every element using a callback function.",
    "filter()": "filter creates a new array containing only the elements that pass a condition.",
    "reduce()": "reduce processes an array and combines its values into one final result such as a sum.",
    "Promise": "A Promise represents a value that may become available later. It can be fulfilled or rejected.",
    "async": "async makes a JavaScript function return a Promise and allows await to be used inside it.",
    "await": "await pauses an async function until a Promise settles, making asynchronous code easier to read.",
    "fetch()": "fetch sends an HTTP request from JavaScript and returns a Promise for the server response.",
    "<h1>–<h6>": "HTML heading elements create a hierarchy of headings. Use them to describe the structure of your page, not just to make text look big.",
    "<a>": "The anchor element creates links. Its href attribute tells the browser where the link should go.",
    "<img>": "The img element displays an image. Always provide useful alt text when the image conveys information.",
    "<form>": "A form groups controls used to collect and submit user input.",
    "<input>": "input creates many types of form controls such as text, email, password, number, checkbox and radio controls.",
    "<button>": "button creates a clickable control. In forms, its type determines whether it submits the form or acts as a normal button.",
    "<div>": "div is a generic block container. Use semantic elements such as section, article or nav when they better describe the content.",
    "selector": "A CSS selector tells the browser which elements should receive a set of styles.",
    ".class": "A class selector targets every element carrying that class. Classes are commonly used for reusable styles.",
    "#id": "An ID selector targets an element with a specific id. IDs should normally be unique within a page.",
    "display: flex": "Flexbox lays items out along one main axis. It is excellent for rows, columns, alignment and spacing.",
    "display: grid": "CSS Grid creates a two-dimensional layout with rows and columns. It is useful for cards and page layouts.",
    "justify-content": "justify-content controls how flex/grid content is distributed along the relevant main axis.",
    "align-items": "align-items controls alignment on the cross axis in flexbox and the corresponding axis in grid.",
    "position": "position controls how an element participates in document layout and where positioned elements are placed.",
    "@media": "A media query applies CSS only when a condition such as viewport width is satisfied. It is a key tool for responsive design."
};

const languagePurpose = {
    Python: "Python is a high-level general-purpose language known for readable syntax and a large ecosystem. It is widely used for automation, web development, data work and scripting.",
    C: "C is a compiled systems programming language. It gives direct control over memory and is widely used in operating systems, embedded systems and performance-sensitive software.",
    "C++": "C++ builds on C with powerful abstractions such as classes, templates and the STL. It is used for systems, games, competitive programming and high-performance software.",
    Java: "Java is a statically typed, object-oriented language designed around the JVM. It is widely used for enterprise applications, backend systems and Android-related development.",
    JavaScript: "JavaScript is the main programming language of the web. It runs in browsers and also on servers and other runtimes.",
    HTML: "HTML describes the structure and meaning of web pages. It is a markup language, not a general-purpose programming language.",
    CSS: "CSS controls the presentation and layout of HTML. It handles typography, spacing, colors, responsive layouts, animation and more."
};

function buildDetailedExplanation(language, category, entry) {
    const name = entry[0];
    const meaning = entry[1];
    const syntax = entry[2];
    const example = entry[3];
    const result = entry[4];

    const beginner = beginnerTips[name] ||
        `In simple terms, ${name} is used to ${meaning.toLowerCase().replace(/\.$/, "")}. ` +
        `Start by understanding the syntax and then change the example to see what happens.`;

    const commonMistake =
        name.includes("input") ? "Remember that user input often starts as text; convert it when you need a number." :
        name.includes("scanf") ? "For ordinary C variables, scanf usually needs the variable's address, such as &age." :
        name === "pointer" ? "Do not dereference an invalid or uninitialized pointer." :
        name === "malloc()" ? "Check the returned pointer and release the memory with free when it is no longer needed." :
        name === "for" || name === "while" ? "Make sure the loop condition can eventually become false, or you may create an infinite loop." :
        name === "if" ? "Use comparison operators such as == when you want to compare values; do not confuse comparison with assignment where the language distinguishes them." :
        name === "const" ? "const prevents reassignment of the binding; it does not automatically make every nested object property immutable." :
        name === "<img>" ? "Do not omit meaningful alt text for informative images." :
        name === "<a>" ? "Check that href points to the intended destination and use clear link text." :
        name.includes("flex") || name.includes("grid") ? "Remember that the parent is normally the layout container; child alignment rules depend on the layout mode." :
        "Start with the smallest working example, then change one part at a time. This makes errors much easier to understand.";

    const related = [];
    if (name.includes("print") || name === "printf()" || name === "cout" || name === "System.out.println()" || name === "console.log()") {
        related.push("input", "variables", "strings");
    } else if (name.includes("loop") || ["for","while","do while","break","continue"].includes(name)) {
        related.push("if", "variables", "arrays");
    } else if (name === "function" || name === "def" || name === "lambda" || name === "arrow function") {
        related.push("parameters", "return", "scope");
    } else if (name === "class" || name === "object" || name === "constructor") {
        related.push("inheritance", "encapsulation", "methods");
    } else if (name === "vector" || name === "ArrayList" || name === "list" || name === "array") {
        related.push("loops", "indexing", "sorting");
    } else if (name === "map()" || name === "filter()" || name === "reduce()") {
        related.push("arrays", "arrow function", "callback");
    } else if (name.startsWith("<")) {
        related.push("attributes", "CSS", "DOM");
    } else if (name.includes("display") || name === "justify-content" || name === "align-items" || name === "gap") {
        related.push("Flexbox", "Grid", "responsive design");
    } else {
        related.push(category, "syntax", "examples");
    }

    return `
        <div class="manual-header">
            <div class="badge">${escapeHTML(language)}</div>
            <div class="badge">${escapeHTML(category)}</div>
        </div>
        <h2>${escapeHTML(name)}</h2>

        <div class="learn-section">
            <h3>🧠 What is it?</h3>
            <p>${escapeHTML(meaning)}</p>
        </div>

        <div class="learn-section beginner">
            <h3>👶 Explain Like I'm a Beginner</h3>
            <p>${escapeHTML(beginner)}</p>
        </div>

        <div class="learn-section">
            <h3>🎯 Why / When do you use it?</h3>
            <p>${escapeHTML(languagePurpose[language] || "Use this concept when your program needs the behavior described above.")}</p>
            <p>More specifically, use <strong>${escapeHTML(name)}</strong> when you need to ${escapeHTML(meaning.toLowerCase().replace(/\.$/, ""))}.</p>
        </div>

        <div class="learn-section">
            <h3>📝 Syntax</h3>
            <pre>${escapeHTML(syntax)}</pre>
        </div>

        <div class="learn-section">
            <h3>💻 Example</h3>
            <pre>${escapeHTML(example)}</pre>
        </div>

        <div class="learn-section">
            <h3>▶️ Expected Result / Notes</h3>
            <pre>${escapeHTML(result)}</pre>
        </div>

        <div class="learn-section">
            <h3>⚙️ How to understand it</h3>
            <ol>
                <li>Read the syntax and identify the important keywords/symbols.</li>
                <li>Run the example exactly once.</li>
                <li>Change one value or line and run it again.</li>
                <li>Compare the new result with the old result.</li>
            </ol>
        </div>

        <div class="learn-section warning">
            <h3>⚠️ Common Mistake / Tip</h3>
            <p>${escapeHTML(commonMistake)}</p>
        </div>

        <div class="learn-section">
            <h3>🔗 Related Topics</h3>
            <div>${related.map(x => `<span class="badge">${escapeHTML(x)}</span>`).join("")}</div>
        </div>

        <div class="learn-section">
            <h3>📌 Quick Summary</h3>
            <p><strong>${escapeHTML(name)}</strong> → ${escapeHTML(meaning)}</p>
        </div>
    `;
}

// ---------------- PROGRAMMING MANUAL ----------------

const programmingManual = {"Python": {"Basics": [["print()", "Displays output.", "print(value)", "print(\"Hello\")", "Hello"], ["input()", "Reads text input from the user.", "input(\"prompt\")", "name = input(\"Name: \")", "Stores the entered text"], ["variable", "Stores a value under a name.", "name = value", "age = 20", "age contains 20"], ["type()", "Returns the type of a value.", "type(value)", "type(10)", "<class 'int'>"], ["len()", "Returns the number of items/characters.", "len(value)", "len(\"Hello\")", "5"], ["int()", "Converts a value to an integer.", "int(value)", "int(\"25\")", "25"], ["float()", "Converts a value to a floating-point number.", "float(value)", "float(\"3.14\")", "3.14"], ["str()", "Converts a value to a string.", "str(value)", "str(123)", "\"123\""], ["bool()", "Converts a value to a Boolean.", "bool(value)", "bool(1)", "True"], ["comments", "Adds a comment ignored by Python.", "# comment", "# This is a comment", "No output"]], "Conditions & Loops": [["if", "Runs code when a condition is true.", "if condition:", "if age >= 18:\n    print(\"Adult\")", "Adult"], ["elif", "Checks another condition.", "elif condition:", "elif age >= 13:\n    print(\"Teen\")", "Teen"], ["else", "Runs when earlier conditions are false.", "else:", "else:\n    print(\"Child\")", "Child"], ["for", "Repeats over an iterable.", "for item in iterable:", "for i in range(3):\n    print(i)", "0 1 2"], ["while", "Repeats while a condition is true.", "while condition:", "while x < 3:\n    x += 1", "Repeats until false"], ["break", "Stops the nearest loop.", "break", "for x in values:\n    if x == 5:\n        break", "Loop stops"], ["continue", "Skips to the next loop iteration.", "continue", "for x in range(5):\n    if x == 2:\n        continue", "2 is skipped"], ["pass", "Placeholder that performs no action.", "pass", "if ready:\n    pass", "No output"]], "Functions & OOP": [["def", "Defines a function.", "def name(parameters):", "def greet(name):\n    return f\"Hi {name}\"", "Reusable function"], ["return", "Sends a value back from a function.", "return value", "return a + b", "Returned value"], ["lambda", "Creates a small anonymous function.", "lambda args: expression", "square = lambda x: x*x", "square(5) → 25"], ["class", "Defines a class.", "class Name:", "class Person:\n    pass", "Creates a class"], ["__init__", "Initializer called when an object is created.", "def __init__(self, ...):", "def __init__(self, name):\n    self.name = name", "Initializes attributes"], ["self", "References the current object in instance methods.", "self.attribute", "self.name = name", "Stores instance data"], ["inheritance", "Allows a class to reuse another class.", "class Child(Parent):", "class Dog(Animal):\n    pass", "Dog inherits Animal"], ["recursion", "A function calls itself.", "def f(): f()", "def countdown(n):\n    if n:\n        countdown(n-1)", "Repeats through calls"]], "Collections": [["list", "Ordered, mutable collection.", "items = [a, b]", "nums = [1, 2, 3]", "[1, 2, 3]"], ["list.append()", "Adds an item to the end of a list.", "list.append(item)", "nums.append(4)", "[1, 2, 3, 4]"], ["list.pop()", "Removes and returns an item.", "list.pop(index)", "nums.pop()", "Last item removed"], ["list.sort()", "Sorts a list in place.", "list.sort()", "nums.sort()", "Sorted list"], ["tuple", "Ordered, immutable collection.", "items = (a, b)", "point = (10, 20)", "(10, 20)"], ["set", "Unordered collection of unique values.", "items = {a, b}", "unique = {1, 1, 2}", "{1, 2}"], ["dict", "Key-value mapping.", "data = {key: value}", "user = {\"name\": \"Geeksy\"}", "Key maps to value"], ["dict.get()", "Gets a dictionary value safely.", "dict.get(key, default)", "user.get(\"age\", 0)", "0 if missing"], ["enumerate()", "Iterates with index and value.", "enumerate(iterable)", "for i, x in enumerate(items):\n    print(i, x)", "Index + value"], ["zip()", "Pairs values from iterables.", "zip(a, b)", "for x, y in zip(a, b):\n    print(x, y)", "Paired values"]], "Exceptions, Files & Modules": [["try / except", "Handles exceptions.", "try:\n    code\nexcept Error:", "try:\n    int(\"x\")\nexcept ValueError:\n    print(\"Invalid\")", "Invalid"], ["finally", "Runs after try/except regardless of error.", "finally:", "try:\n    x = 1\nfinally:\n    print(\"done\")", "done"], ["raise", "Explicitly raises an exception.", "raise Exception(...)", "raise ValueError(\"Bad input\")", "Raises ValueError"], ["open()", "Opens a file.", "open(path, mode)", "with open(\"data.txt\", \"r\") as f:\n    text = f.read()", "Reads file"], ["json", "Standard module for JSON data.", "import json", "json.dumps({\"x\": 1})", "{\"x\": 1}"], ["import", "Loads a module.", "import module", "import math", "Module available"], ["from ... import", "Imports selected names.", "from module import name", "from math import sqrt", "sqrt available"], ["venv", "Creates an isolated Python environment.", "python -m venv .venv", "python -m venv .venv", "Environment created"]]}, "C": {"Basics": [["main()", "Program entry point.", "int main(void) { }", "int main(void) {\n    printf(\"Hello\");\n    return 0;\n}", "Hello"], ["printf()", "Prints formatted output.", "printf(\"format\", values);", "printf(\"Age: %d\", age);", "Formatted output"], ["scanf()", "Reads formatted input.", "scanf(\"%d\", &x);", "scanf(\"%d\", &age);", "Stores input"], ["int", "Integer data type.", "int name;", "int age = 20;", "20"], ["float", "Single-precision floating type.", "float name;", "float price = 3.14f;", "3.14"], ["char", "Stores a character.", "char name;", "char grade = 'A';", "A"], ["const", "Creates a value that should not be modified.", "const type name = value;", "const int MAX = 100;", "MAX"], ["sizeof", "Returns size in bytes.", "sizeof(type_or_expression)", "sizeof(int)", "Implementation-defined size"]], "Conditions & Loops": [["if", "Conditional execution.", "if (condition) { }", "if (age >= 18) {\n    printf(\"Adult\");\n}", "Adult"], ["else", "Alternative branch.", "else { }", "else {\n    printf(\"Minor\");\n}", "Minor"], ["switch", "Selects among cases.", "switch(value) { case ... }", "switch(day) {\n    case 1: printf(\"Mon\"); break;\n}", "Selected case"], ["for", "Count-controlled loop.", "for(init; condition; update)", "for(int i=0;i<3;i++) printf(\"%d\",i);", "012"], ["while", "Condition-controlled loop.", "while(condition) { }", "while(x < 3) x++;", "Repeats"], ["do while", "Runs body at least once.", "do { } while(condition);", "do { x++; } while(x < 3);", "Repeats"], ["break", "Exits a loop/switch.", "break;", "while(1) { break; }", "Exits"], ["continue", "Skips current loop iteration.", "continue;", "for(...) { if(x) continue; }", "Next iteration"]], "Arrays, Strings & Functions": [["array", "Fixed-size contiguous collection.", "type name[size];", "int nums[3] = {1,2,3};", "Stores 3 integers"], ["char[] string", "C strings are character arrays ending in '\\0'.", "char name[size];", "char name[20] = \"Geeksy\";", "Geeksy"], ["strlen()", "Returns string length.", "strlen(string)", "strlen(\"Hello\")", "5"], ["strcpy()", "Copies a string.", "strcpy(dest, src)", "strcpy(dest, \"Geeksy\");", "dest becomes Geeksy"], ["strcmp()", "Compares two strings.", "strcmp(a, b)", "strcmp(\"a\", \"b\")", "Negative/zero/positive"], ["function", "Reusable block of code.", "return_type name(parameters)", "int add(int a,int b){ return a+b; }", "Returns sum"], ["return", "Returns from a function.", "return value;", "return 0;", "Returned value"]], "Pointers & Memory": [["pointer", "Variable holding an address.", "type *name;", "int x=5; int *p=&x;", "p points to x"], ["&", "Address-of operator.", "&variable", "p = &x;", "Address"], ["*", "Dereferences a pointer.", "*pointer", "printf(\"%d\", *p);", "Value at address"], ["malloc()", "Allocates dynamic memory.", "malloc(bytes)", "int *p = malloc(3*sizeof(int));", "Allocated memory"], ["calloc()", "Allocates zero-initialized memory.", "calloc(count, size)", "calloc(3, sizeof(int))", "Zeroed memory"], ["realloc()", "Resizes allocated memory.", "realloc(ptr, bytes)", "p = realloc(p, 5*sizeof(int));", "Resized block"], ["free()", "Releases allocated memory.", "free(pointer)", "free(p);", "Memory released"]], "Structs & Files": [["struct", "Groups related fields.", "struct Name { fields; };", "struct User { int id; char name[20]; };", "Custom record"], ["typedef", "Creates an alias for a type.", "typedef old new;", "typedef unsigned int uint;", "uint is an alias"], ["enum", "Defines named integral constants.", "enum Name { A, B };", "enum Day { MON, TUE };", "Named constants"], ["fopen()", "Opens a file.", "fopen(path, mode)", "FILE *f = fopen(\"a.txt\",\"r\");", "File pointer"], ["fclose()", "Closes a file.", "fclose(file)", "fclose(f);", "File closed"], ["fprintf()", "Writes formatted text to a file.", "fprintf(file, format, ...)", "fprintf(f, \"%d\", x);", "Writes to file"], ["fscanf()", "Reads formatted text from a file.", "fscanf(file, format, ...)", "fscanf(f, \"%d\", &x);", "Reads from file"]]}, "C++": {"Basics & I/O": [["main()", "Program entry point.", "int main() { }", "int main(){ std::cout << \"Hello\"; }", "Hello"], ["cout", "Writes output to a stream.", "std::cout << value;", "std::cout << \"Hello\";", "Hello"], ["cin", "Reads input from a stream.", "std::cin >> variable;", "std::cin >> age;", "Stores input"], ["endl", "Ends a line and flushes the stream.", "std::endl", "std::cout << std::endl;", "New line"], ["auto", "Lets compiler infer a variable type.", "auto name = value;", "auto x = 10;", "x is int"], ["nullptr", "Represents a null pointer.", "nullptr", "int *p = nullptr;", "Null pointer"]], "Conditions & Loops": [["if", "Conditional execution.", "if (condition) { }", "if(age>=18){ std::cout<<\"Adult\"; }", "Adult"], ["else", "Alternative branch.", "else { }", "else { std::cout<<\"Minor\"; }", "Minor"], ["switch", "Selects among cases.", "switch(value) { }", "switch(day){case 1: break;}", "Selected case"], ["for", "Loop with initialization, condition and update.", "for(init;condition;update)", "for(int i=0;i<3;i++) std::cout<<i;", "012"], ["range-based for", "Iterates directly over a range/container.", "for(auto x : container)", "for(auto x : nums) std::cout<<x;", "Each element"]], "OOP": [["class", "Defines a user-defined type.", "class Name { };", "class Person { public: int age; };", "Class"], ["object", "Instance of a class.", "Class object;", "Person p;", "Object p"], ["constructor", "Initializes an object.", "Class(args) { }", "Person(int a): age(a) {}", "Initialization"], ["destructor", "Runs when an object is destroyed.", "~Class() { }", "~Person() {}", "Cleanup"], ["inheritance", "Derives one class from another.", "class Child : public Parent", "class Dog : public Animal {}", "Dog inherits Animal"], ["virtual", "Enables dynamic dispatch for member functions.", "virtual return_type f();", "virtual void speak();", "Polymorphic call"], ["override", "Marks an overriding virtual function.", "void f() override", "void speak() override;", "Compiler checks override"]], "STL Containers": [["vector", "Dynamic contiguous sequence.", "std::vector<T> v;", "std::vector<int> nums{1,2,3};", "Dynamic array"], ["array", "Fixed-size array container.", "std::array<T,N> a;", "std::array<int,3> a{1,2,3};", "Fixed container"], ["list", "Doubly linked list.", "std::list<T> l;", "std::list<int> l{1,2};", "Linked sequence"], ["stack", "LIFO container adaptor.", "std::stack<T> s;", "s.push(10);", "Top item"], ["queue", "FIFO container adaptor.", "std::queue<T> q;", "q.push(10);", "Front item"], ["set", "Sorted unique keys.", "std::set<T> s;", "std::set<int> s{3,1,2};", "1 2 3"], ["map", "Sorted key-value pairs.", "std::map<K,V> m;", "std::map<std::string,int> m{{\"Geeksy\",1}};", "Key → value"], ["unordered_map", "Hash-table key-value container.", "std::unordered_map<K,V> m;", "m[\"age\"] = 20;", "Hash lookup"]], "Algorithms & Modern C++": [["sort()", "Sorts a range.", "std::sort(first,last)", "std::sort(v.begin(), v.end());", "Sorted range"], ["find()", "Searches a range.", "std::find(first,last,value)", "std::find(v.begin(),v.end(),5);", "Iterator"], ["lambda", "Anonymous function object.", "[capture](args){ body }", "auto add=[](int a,int b){return a+b;};", "Callable object"], ["template", "Generic code for types.", "template<class T>", "template<class T> T max(T a,T b)", "Type-generic code"], ["unique_ptr", "Exclusive-ownership smart pointer.", "std::unique_ptr<T>", "auto p=std::make_unique<int>(5);", "Automatic cleanup"], ["shared_ptr", "Reference-counted smart pointer.", "std::shared_ptr<T>", "auto p=std::make_shared<int>(5);", "Shared ownership"], ["exception", "Base mechanism for thrown errors.", "throw / try / catch", "try{ throw 1; } catch(int x){}", "Caught exception"]]}, "Java": {"Basics": [["main()", "Java application entry point.", "public static void main(String[] args)", "public static void main(String[] args){ System.out.println(\"Hi\"); }", "Hi"], ["System.out.println()", "Prints a line.", "System.out.println(value);", "System.out.println(\"Hello\");", "Hello"], ["Scanner", "Reads user input.", "Scanner sc = new Scanner(System.in);", "int age = sc.nextInt();", "Reads integer"], ["String", "Represents text.", "String name;", "String name = \"Geeksy\";", "Geeksy"], ["int", "Primitive integer type.", "int name;", "int age = 20;", "20"], ["double", "Double-precision decimal type.", "double name;", "double price = 3.14;", "3.14"], ["boolean", "True/false primitive.", "boolean name;", "boolean ok = true;", "true"]], "Conditions & Loops": [["if", "Conditional execution.", "if(condition) { }", "if(age>=18){ System.out.println(\"Adult\"); }", "Adult"], ["else", "Alternative branch.", "else { }", "else { System.out.println(\"Minor\"); }", "Minor"], ["switch", "Selects among cases.", "switch(value) { case ... }", "switch(day){case 1: break;}", "Selected case"], ["for", "Loop with initialization, condition and update.", "for(init;condition;update)", "for(int i=0;i<3;i++) System.out.println(i);", "012"], ["while", "Repeats while condition is true.", "while(condition) { }", "while(x<3) x++;", "Repeats"], ["break", "Exits loop or switch.", "break;", "while(true){ break; }", "Exits"], ["continue", "Skips current iteration.", "continue;", "for(...){ continue; }", "Next iteration"]], "OOP": [["class", "Defines a class.", "class Name { }", "class Person { int age; }", "Class"], ["object", "Instance of a class.", "new Class()", "Person p = new Person();", "Object"], ["constructor", "Initializes an object.", "ClassName(args) { }", "Person(int a){ age=a; }", "Initialization"], ["this", "References the current object.", "this.field", "this.age = age;", "Current object"], ["static", "Member associated with the class.", "static type name;", "static int count;", "Class-level member"], ["final", "Prevents reassignment/overriding/inheritance depending on use.", "final type name;", "final int MAX=10;", "Constant reference/value"], ["extends", "Creates class inheritance.", "class Child extends Parent", "class Dog extends Animal {}", "Inheritance"], ["implements", "Declares interface implementation.", "class C implements I", "class Car implements Vehicle {}", "Implements interface"]], "Collections & Exceptions": [["ArrayList", "Resizable list implementation.", "ArrayList<T> list", "ArrayList<Integer> nums = new ArrayList<>();", "Dynamic list"], ["HashSet", "Set with unique elements.", "HashSet<T> set", "HashSet<Integer> s = new HashSet<>();", "Unique values"], ["HashMap", "Key-value map.", "HashMap<K,V> map", "HashMap<String,Integer> m = new HashMap<>();", "Key-value storage"], ["try/catch", "Handles exceptions.", "try { } catch (Exception e) { }", "try { risky(); } catch(Exception e) { }", "Exception handled"], ["throw", "Explicitly throws an exception.", "throw new Exception(...)", "throw new IllegalArgumentException(\"bad\");", "Exception thrown"], ["throws", "Declares exceptions a method may throw.", "method(...) throws Exception", "void f() throws IOException {}", "Declared exception"], ["generic", "Type parameter for reusable code.", "class Box<T>", "class Box<T>{ T value; }", "Generic type"]]}, "JavaScript": {"Basics": [["console.log()", "Writes output to the console.", "console.log(value)", "console.log(\"Hello\");", "Hello"], ["let", "Declares a block-scoped variable.", "let name = value;", "let age = 20;", "Variable"], ["const", "Declares a binding that cannot be reassigned.", "const name = value;", "const pi = 3.14;", "Constant binding"], ["var", "Older function-scoped variable declaration.", "var name = value;", "var count = 0;", "Variable"], ["typeof", "Returns a value's type string.", "typeof value", "typeof 10", "\"number\""], ["template literals", "String syntax with interpolation.", "`text ${value}`", "const s = `Age: ${age}`;", "Interpolated string"]], "Conditions & Loops": [["if", "Conditional execution.", "if(condition) { }", "if(age>=18){ console.log(\"Adult\"); }", "Adult"], ["else", "Alternative branch.", "else { }", "else { console.log(\"Minor\"); }", "Minor"], ["switch", "Selects among cases.", "switch(value) { }", "switch(day){case 1: break;}", "Selected case"], ["for", "General-purpose loop.", "for(init;condition;update)", "for(let i=0;i<3;i++) console.log(i);", "012"], ["for...of", "Iterates over values.", "for (const x of iterable)", "for(const x of nums) console.log(x);", "Each value"], ["for...in", "Iterates enumerable property keys.", "for (const key in object)", "for(const k in user) console.log(k);", "Property keys"]], "Arrays & Objects": [["Array", "Ordered collection.", "const a = [values]", "const nums = [1,2,3];", "Array"], ["map()", "Transforms each array element.", "array.map(callback)", "[1,2,3].map(x => x*2)", "[2,4,6]"], ["filter()", "Keeps elements matching a test.", "array.filter(callback)", "[1,2,3].filter(x => x>1)", "[2,3]"], ["reduce()", "Reduces a collection to one value.", "array.reduce(callback, initial)", "[1,2,3].reduce((a,b)=>a+b,0)", "6"], ["forEach()", "Runs a callback for each element.", "array.forEach(callback)", "[1,2].forEach(x=>console.log(x));", "1 then 2"], ["find()", "Returns first matching element.", "array.find(callback)", "[1,2,3].find(x=>x>1)", "2"], ["object", "Key-value collection.", "const obj = { key: value }", "const user = {name:\"Geeksy\"};", "Object"], ["destructuring", "Extracts values from arrays/objects.", "const {x} = obj", "const {name} = user;", "name variable"]], "Async, DOM & Web": [["function", "Declares a function.", "function name(args) { }", "function greet(){ console.log(\"Hi\"); }", "Function"], ["arrow function", "Compact function syntax.", "(args) => expression", "const add = (a,b) => a+b;", "Function"], ["Promise", "Represents eventual async completion.", "new Promise((resolve,reject)=>{})", "fetch(url).then(...)", "Async result"], ["async", "Marks a function as asynchronous.", "async function f() {}", "async function load(){ await fetch(url); }", "Promise-returning function"], ["await", "Waits for a Promise inside async code.", "await promise", "const r = await fetch(url);", "Resolved result"], ["document.querySelector()", "Selects the first matching DOM element.", "document.querySelector(selector)", "document.querySelector(\"#app\")", "Element"], ["addEventListener()", "Registers an event handler.", "element.addEventListener(event, fn)", "button.addEventListener(\"click\", fn);", "Handler runs on click"], ["localStorage", "Stores string data in the browser.", "localStorage.setItem(key,value)", "localStorage.setItem(\"name\",\"Geeksy\");", "Persistent browser data"], ["fetch()", "Makes a network request.", "fetch(url, options)", "fetch('/api/data')", "Promise for response"]], "JSON & Modules": [["JSON.stringify()", "Converts a JavaScript value to JSON text.", "JSON.stringify(value)", "JSON.stringify({name:\"Geeksy\"})", "{\"name\":\"Geeksy\"}"], ["JSON.parse()", "Converts JSON text to a JavaScript value.", "JSON.parse(text)", "JSON.parse('{\"x\":1}')", "Object"], ["export", "Exports module bindings.", "export { name }", "export const x = 1;", "Exported binding"], ["import", "Imports module bindings.", "import { name } from './file.js'", "import { x } from './file.js';", "Imported binding"]]}, "HTML": {"Document": [["<!DOCTYPE html>", "Declares an HTML document as modern HTML.", "<!DOCTYPE html>", "<!DOCTYPE html>", "Browser uses standards mode"], ["<html>", "Root element.", "<html>...</html>", "<html lang=\"en\">...</html>", "Document root"], ["<head>", "Contains metadata/resources.", "<head>...</head>", "<head><title>Geeksy</title></head>", "Metadata section"], ["<title>", "Sets the browser/page title.", "<title>text</title>", "<title>Geeksy</title>", "Geeksy"], ["<meta>", "Provides document metadata.", "<meta name=\"...\" content=\"...\">", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", "Metadata"], ["<link>", "Links external resources.", "<link rel=\"...\" href=\"...\">", "<link rel=\"stylesheet\" href=\"style.css\">", "Loads CSS"], ["<body>", "Contains visible document content.", "<body>...</body>", "<body><h1>Geeksy</h1></body>", "Visible content"]], "Text & Structure": [["<h1>–<h6>", "Creates headings from largest to smallest.", "<h1>Text</h1>", "<h1>Welcome</h1>", "Heading"], ["<p>", "Creates a paragraph.", "<p>Text</p>", "<p>Hello Geeksy.</p>", "Paragraph"], ["<div>", "Generic block container.", "<div>...</div>", "<div class=\"card\">...</div>", "Container"], ["<span>", "Generic inline container.", "<span>...</span>", "<span>Hello</span>", "Inline text"], ["<strong>", "Marks strong importance.", "<strong>Text</strong>", "<strong>Important</strong>", "Important text"], ["<em>", "Marks emphasis.", "<em>Text</em>", "<em>Note</em>", "Emphasized text"], ["<br>", "Inserts a line break.", "<br>", "Hello<br>Geeksy", "New line"]], "Links & Media": [["<a>", "Creates a hyperlink.", "<a href=\"URL\">Text</a>", "<a href=\"https://example.com\">Visit</a>", "Link"], ["<img>", "Embeds an image.", "<img src=\"...\" alt=\"...\">", "<img src=\"geeksy.png\" alt=\"Geeksy\">", "Image"], ["<audio>", "Embeds audio.", "<audio controls>...</audio>", "<audio controls src=\"sound.mp3\"></audio>", "Audio player"], ["<video>", "Embeds video.", "<video controls>...</video>", "<video controls src=\"video.mp4\"></video>", "Video player"], ["<iframe>", "Embeds another browsing context.", "<iframe src=\"URL\"></iframe>", "<iframe src=\"page.html\"></iframe>", "Embedded page"]], "Lists, Tables & Forms": [["<ul>", "Unordered list.", "<ul><li>...</li></ul>", "<ul><li>One</li></ul>", "Bullet list"], ["<ol>", "Ordered list.", "<ol><li>...</li></ol>", "<ol><li>First</li></ol>", "Numbered list"], ["<table>", "Table container.", "<table>...</table>", "<table><tr><td>A</td></tr></table>", "Table"], ["<tr>", "Table row.", "<tr>...</tr>", "<tr><td>A</td></tr>", "Row"], ["<td>", "Table data cell.", "<td>...</td>", "<td>Value</td>", "Cell"], ["<th>", "Table header cell.", "<th>...</th>", "<th>Name</th>", "Header cell"], ["<form>", "Groups form controls for submission.", "<form>...</form>", "<form action=\"/login\" method=\"post\">...</form>", "Form"], ["<input>", "Creates an input control.", "<input type=\"...\">", "<input type=\"email\" name=\"email\">", "Input"], ["<textarea>", "Multi-line text input.", "<textarea></textarea>", "<textarea rows=\"4\"></textarea>", "Text area"], ["<select>", "Creates a dropdown.", "<select><option>...</option></select>", "<select><option>India</option></select>", "Dropdown"], ["<button>", "Creates a clickable button.", "<button>Text</button>", "<button>Send</button>", "Button"]], "Semantic & Accessibility": [["<header>", "Introductory/header content.", "<header>...</header>", "<header><h1>Geeksy</h1></header>", "Header"], ["<nav>", "Navigation links.", "<nav>...</nav>", "<nav><a href=\"/\">Home</a></nav>", "Navigation"], ["<main>", "Primary page content.", "<main>...</main>", "<main>...</main>", "Main content"], ["<section>", "Thematic section.", "<section>...</section>", "<section><h2>Games</h2></section>", "Section"], ["<article>", "Self-contained content.", "<article>...</article>", "<article>News</article>", "Article"], ["<aside>", "Related/sidebar content.", "<aside>...</aside>", "<aside>Related</aside>", "Aside"], ["<footer>", "Footer content.", "<footer>...</footer>", "<footer>Copyright</footer>", "Footer"], ["alt", "Alternative text for images.", "alt=\"description\"", "<img src=\"x.png\" alt=\"Geeksy logo\">", "Accessible description"], ["label", "Labels a form control.", "<label for=\"id\">Text</label>", "<label for=\"email\">Email</label>", "Form label"]]}, "CSS": {"Syntax & Selectors": [["selector", "Chooses elements to style.", "selector { property: value; }", "p { color: white; }", "Paragraphs styled"], [".class", "Selects elements with a class.", ".card { }", ".card { padding: 20px; }", "Class styled"], ["#id", "Selects the element with an ID.", "#app { }", "#app { min-height: 100vh; }", "ID styled"], ["*", "Universal selector.", "* { }", "* { box-sizing: border-box; }", "All elements"], [":hover", "Applies styles while pointer hovers.", "selector:hover { }", "button:hover { opacity: .8; }", "Hover style"], ["::before", "Creates a generated pseudo-element before content.", "selector::before { }", ".card::before { content: ''; }", "Generated content"]], "Box Model & Size": [["width", "Sets content width.", "width: value;", "width: 300px;", "300px width"], ["height", "Sets content height.", "height: value;", "height: 200px;", "200px height"], ["margin", "Space outside an element.", "margin: value;", "margin: 20px;", "Outside spacing"], ["padding", "Space inside an element.", "padding: value;", "padding: 20px;", "Inside spacing"], ["border", "Draws a border.", "border: width style color;", "border: 1px solid #333;", "Border"], ["box-sizing", "Controls how width/height are calculated.", "box-sizing: border-box;", "* { box-sizing: border-box; }", "Padding included in size"], ["max-width", "Limits maximum width.", "max-width: value;", "max-width: 1100px;", "Maximum width"]], "Colors & Typography": [["color", "Sets text color.", "color: value;", "color: white;", "White text"], ["background", "Sets background.", "background: value;", "background: black;", "Black background"], ["font-family", "Chooses typeface.", "font-family: ...;", "font-family: Arial, sans-serif;", "Arial"], ["font-size", "Sets text size.", "font-size: value;", "font-size: 20px;", "20px"], ["font-weight", "Controls text thickness.", "font-weight: value;", "font-weight: 700;", "Bold"], ["line-height", "Controls line spacing.", "line-height: value;", "line-height: 1.6;", "Spacing"], ["text-align", "Aligns inline content/text.", "text-align: value;", "text-align: center;", "Centered text"]], "Layout": [["display: block", "Makes an element a block box.", "display: block;", ".item { display: block; }", "Block"], ["display: flex", "Enables Flexbox layout.", "display: flex;", ".row { display: flex; }", "Flex container"], ["justify-content", "Aligns flex/grid content along main axis.", "justify-content: value;", "justify-content: center;", "Centered"], ["align-items", "Aligns flex items on cross axis.", "align-items: value;", "align-items: center;", "Centered"], ["gap", "Sets spacing between flex/grid items.", "gap: value;", "gap: 10px;", "10px gap"], ["display: grid", "Enables CSS Grid.", "display: grid;", ".grid { display: grid; }", "Grid container"], ["grid-template-columns", "Defines grid columns.", "grid-template-columns: ...;", "grid-template-columns: repeat(3, 1fr);", "Three columns"], ["position", "Controls positioning scheme.", "position: relative|absolute|fixed|sticky;", ".menu { position: fixed; }", "Positioned element"], ["z-index", "Controls stacking order of positioned elements.", "z-index: number;", ".modal { z-index: 10; }", "Stacking"]], "Effects & Responsive": [["border-radius", "Rounds corners.", "border-radius: value;", "border-radius: 12px;", "Rounded corners"], ["box-shadow", "Adds a shadow.", "box-shadow: ...;", "box-shadow: 0 4px 20px #0003;", "Shadow"], ["opacity", "Controls transparency.", "opacity: 0..1;", "opacity: .7;", "70% opacity"], ["transform", "Transforms an element.", "transform: ...;", "transform: translateY(-2px);", "Moved element"], ["transition", "Animates property changes.", "transition: property duration;", "transition: .2s;", "Smooth change"], ["animation", "Applies a keyframe animation.", "animation: name duration;", "animation: pulse 1s infinite;", "Animation"], ["@keyframes", "Defines animation stages.", "@keyframes name { ... }", "@keyframes fade { from{opacity:0} to{opacity:1} }", "Fade animation"], ["@media", "Applies styles based on device/viewport conditions.", "@media (...) { }", "@media (max-width: 700px) { .menu{display:none;} }", "Responsive CSS"], ["var()", "Reads a CSS custom property.", "var(--name)", ":root { --accent: blue; }", "Uses custom value"]]}};

let selectedLanguage="Python";
let selectedCategory=null;

function loadLanguages() {
    const box=document.getElementById("languageButtons");
    box.innerHTML="";
    Object.keys(programmingManual).forEach(language=>{
        const b=document.createElement("button");
        b.textContent=language;
        b.onclick=()=>selectLanguage(language);
        if(language===selectedLanguage)b.classList.add("selected");
        box.appendChild(b);
    });
}

function selectLanguage(language) {
    selectedLanguage=language;
    document.querySelectorAll("#languageButtons button").forEach(b=>b.classList.toggle("selected",b.textContent===language));
    document.getElementById("manualSearch").value="";
    loadTopics(language);
}

function loadTopics(language) {
    const list=document.getElementById("manualList");
    const categories=Object.keys(programmingManual[language]);
    selectedCategory=categories[0]||null;
    document.getElementById("manualCategory").textContent=selectedCategory ? `Category: ${selectedCategory}` : "";
    list.innerHTML="";

    categories.forEach(category=>{
        const header=document.createElement("div");
        header.className="manual-category";
        header.textContent=category;
        list.appendChild(header);

        programmingManual[language][category].forEach(entry=>{
            const button=document.createElement("button");
            button.className="manual-button";
            button.dataset.topic=entry[0].toLowerCase();
            button.dataset.category=category.toLowerCase();
            button.textContent=entry[0];
            button.onclick=()=>showManualEntry(language,category,entry);
            list.appendChild(button);
        });
    });

    const first=programmingManual[language][categories[0]]?.[0];
    if(first) showManualEntry(language,categories[0],first);
}

function showManualEntry(language,category,entry) {
    selectedCategory=category;
    document.getElementById("manualCategory").textContent=`Category: ${category}`;
    document.getElementById("manualInfo").innerHTML=buildDetailedExplanation(language,category,entry);
}

function filterManual() {
    const query=document.getElementById("manualSearch").value.trim().toLowerCase();
    const list=document.getElementById("manualList");
    list.innerHTML="";
    let matches=[];

    Object.entries(programmingManual).forEach(([language,categories])=>{
        Object.entries(categories).forEach(([category,entries])=>{
            entries.forEach(entry=>{
                const haystack=(language+" "+category+" "+entry.join(" ")).toLowerCase();
                if(!query || haystack.includes(query)) matches.push({language,category,entry});
            });
        });
    });

    if(query) {
        document.getElementById("manualCategory").textContent=`Search results: ${matches.length}`;
        matches.forEach(item=>{
            const b=document.createElement("button");
            b.className="manual-button topic-hit";
            b.textContent=`${item.language} → ${item.entry[0]}`;
            b.onclick=()=>showManualEntry(item.language,item.category,item.entry);
            list.appendChild(b);
        });
        if(matches.length===0) {
            const p=document.createElement("p");
            p.className="muted";
            p.textContent="No matching manual entry found.";
            list.appendChild(p);
        }
    } else {
        loadTopics(selectedLanguage);
    }
}

function clearManualSearch() {
    document.getElementById("manualSearch").value="";
    loadTopics(selectedLanguage);
}


// ---------------- FUN & RANDOM EXTENSIONS ----------------

const funJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "Why was the Python programmer cold? He left his Windows open! 😂",
    "There are 10 kinds of people: those who understand binary and those who don't.",
    "Why did the programmer quit? Because he didn't get arrays! 😂",
    "A SQL query walks into a bar and asks: Can I JOIN you? 😂",
    "Why do programmers hate nature? It has too many bugs! 🐛",
    "I would tell you a UDP joke, but you might not get it."
];

const riddles = [
    ["I speak without a mouth and hear without ears. What am I?", "An echo."],
    ["What has keys but can't open locks?", "A keyboard."],
    ["What gets wetter as it dries?", "A towel."],
    ["What has a face and two hands but no arms or legs?", "A clock."],
    ["What can travel around the world while staying in one corner?", "A stamp."]
];

const facts = [
    "A group of flamingos is called a flamboyance. 🦩",
    "The first computer bug was famously associated with a moth found in a relay. 🐛",
    "Python was named after Monty Python, not the snake. 🐍",
    "CSS stands for Cascading Style Sheets.",
    "HTML describes structure; CSS describes presentation; JavaScript adds behavior.",
    "A standard IPv4 address has 32 bits."
];

const fortunes = [
    "A small step today will save you a lot of work tomorrow.",
    "You are closer than you think. Keep going. 🚀",
    "Your next bug is probably hiding in a missing semicolon—or a missing assumption. 😄",
    "Consistency will beat motivation when motivation disappears.",
    "Today is a good day to learn one thing properly."
];

const compliments = [
    "Your curiosity is one of your strongest tools. 🧠",
    "You ask questions instead of pretending to understand. That's a developer skill.",
    "Your persistence is stronger than your bugs. 💪",
    "You are building something instead of only watching tutorials. Respect. 👨‍💻"
];

const codingChallenges = [
    "Write a Python program that checks whether a number is prime.",
    "Create a C program that reverses a string without using strrev().",
    "Write a C++ program that finds the largest element in a vector.",
    "Write a Java method that counts vowels in a String.",
    "Use JavaScript map() to square every number in an array.",
    "Create an HTML form containing name, email and password fields.",
    "Build a CSS card using Flexbox and make it responsive."
];

const randomWords = ["keyboard","compiler","function","variable","network","browser","python","algorithm","database","terminal","programmer","debugging"];
const randomNames = ["Alex","Sam","Jordan","Aarav","Riya","Kabir","Maya","Dev","Noah","Aisha"];
const randomChoices = ["Code","Study","Take a break","Play a game","Read documentation","Build something","Fix an old bug"];
const colorNames = ["red","blue","green","purple","orange","pink","cyan","gold","teal","indigo"];

function setFun(html) {
    document.getElementById("funResult").innerHTML = html;
}

function joke(){ setFun(`<h2>😂 Joke</h2><p>${escapeHTML(funJokes[Math.floor(Math.random()*funJokes.length)])}</p>`); }
function riddle(){
    const r=riddles[Math.floor(Math.random()*riddles.length)];
    setFun(`<h2>🧠 Riddle</h2><p>${escapeHTML(r[0])}</p><details><summary>Show answer</summary><p>${escapeHTML(r[1])}</p></details>`);
}
function funFact(){ setFun(`<h2>💡 Fun Fact</h2><p>${escapeHTML(facts[Math.floor(Math.random()*facts.length)])}</p>`); }
function wouldYouRather(){
    const q=[
        ["Would you rather be able to code perfectly but never use Google?","OR","Use Google forever but never write bug-free code?"],
        ["Would you rather know every programming language?","OR","Be world-class at one language?"],
        ["Would you rather debug someone else's code?","OR","Debug your own code from 2 years ago? 💀"]
    ][Math.floor(Math.random()*3)];
    setFun(`<h2>🤔 Would You Rather?</h2><p>${escapeHTML(q[0])}</p><h3>${escapeHTML(q[1])}</h3><p>${escapeHTML(q[2])}</p>`);
}
function roastAssistant(){ setFun(`<h2>🔥 Roast AI</h2><p>${["This app has 2,000 lines of JavaScript and still thinks he's intelligent. 💀","This assistant's AI is so advanced it can calculate 2 + 2… after asking for two inputs.","This assistant doesn't have bugs. He has undocumented features. 😎"][Math.floor(Math.random()*3)]}</p>`); }
function compliment(){ setFun(`<h2>💬 AI Assistant says:</h2><p>${escapeHTML(compliments[Math.floor(Math.random()*compliments.length)])}</p>`); }
function mood(){ setFun(`<h2>🎭 Random Mood</h2><p>${["😎 Chill","🔥 Motivated","🤓 Nerdy","😂 Chaotic","🧠 Focused","☕ Needs Coffee","🚀 Ready to build"][Math.floor(Math.random()*7)]}</p>`); }
function fortune(){ setFun(`<h2>🔮 Fortune</h2><p>${escapeHTML(fortunes[Math.floor(Math.random()*fortunes.length)])}</p>`); }
function magic8(){
    const a=["Yes — definitely.","Signs point to yes.","Probably.","Ask again later.","Not sure.","Don't count on it.","Very unlikely.","Absolutely not. 😂"];
    setFun(`<h2>🎱 Magic 8 Ball</h2><p>${escapeHTML(a[Math.floor(Math.random()*a.length)])}</p>`);
}
function codingChallenge(){ setFun(`<h2>💻 Coding Challenge</h2><p>${escapeHTML(codingChallenges[Math.floor(Math.random()*codingChallenges.length)])}</p>`); }
function rollDice(sides){ setFun(`<h2>🎲 Dice Roll</h2><p>You rolled <strong>${Math.floor(Math.random()*sides)+1}</strong> on a d${sides}.</p>`); }
function rollCustomDice(){
    const sides=Number(prompt("How many sides? (2-100)"));
    if(!Number.isInteger(sides)||sides<2||sides>100)return;
    rollDice(sides);
}
function randomColor(){
    const hex="#"+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,"0");
    setFun(`<h2>🎨 Random Color</h2><div style="width:100%;height:80px;border-radius:10px;background:${hex};border:1px solid #64748b"></div><p><strong>${hex}</strong></p>`);
}
function randomLetter(){ setFun(`<h2>🔤 Random Letter</h2><p style="font-size:45px">${String.fromCharCode(65+Math.floor(Math.random()*26))}</p>`); }
function randomWord(){ setFun(`<h2>🔠 Random Word</h2><p>${randomWords[Math.floor(Math.random()*randomWords.length)]}</p>`); }
function randomName(){ setFun(`<h2>👤 Random Name</h2><p>${randomNames[Math.floor(Math.random()*randomNames.length)]}</p>`); }
function randomDate(){
    const start=new Date(2000,0,1).getTime(), end=new Date(2035,11,31).getTime();
    setFun(`<h2>📅 Random Date</h2><p>${new Date(start+Math.random()*(end-start)).toLocaleDateString("en-IN")}</p>`);
}
function randomTime(){
    const h=String(Math.floor(Math.random()*24)).padStart(2,"0"), m=String(Math.floor(Math.random()*60)).padStart(2,"0"), s=String(Math.floor(Math.random()*60)).padStart(2,"0");
    setFun(`<h2>⏱️ Random Time</h2><p>${h}:${m}:${s}</p>`);
}
function passwordGenerator(){
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let pass="";
    for(let i=0;i<16;i++) pass+=chars[Math.floor(Math.random()*chars.length)];
    setFun(`<h2>🔐 Random Password</h2><pre>${escapeHTML(pass)}</pre><p>16 characters generated locally in your browser.</p>`);
}
function randomChoice(){ setFun(`<h2>🎯 Random Choice</h2><p>${escapeHTML(randomChoices[Math.floor(Math.random()*randomChoices.length)])}</p>`); }
function slotMachine(){
    const symbols=["🍒","🍋","🔔","⭐","💎","7️⃣"];
    const a=symbols[Math.floor(Math.random()*symbols.length)],b=symbols[Math.floor(Math.random()*symbols.length)],c=symbols[Math.floor(Math.random()*symbols.length)];
    const win=a===b&&b===c;
    setFun(`<h2>🎰 Slot Machine</h2><p style="font-size:42px">${a} ${b} ${c}</p><h3>${win?"🎉 JACKPOT!":"Try again!"}</h3>`);
}
function headsTailsStreak(){
    let streak=0;
    while(Math.random()<0.5 && streak<100) streak++;
    setFun(`<h2>🪙 Heads Streak</h2><p>You got <strong>${streak}</strong> consecutive Heads before Tails.</p>`);
}
function higherLower(){
    const n=Math.floor(Math.random()*100)+1, next=Math.floor(Math.random()*100)+1;
    setFun(`<h2>🃏 Higher or Lower</h2><p>Current card: <strong>${n}</strong></p><p>Next card is <strong>${next>n?"HIGHER ⬆️":next<n?"LOWER ⬇️":"EQUAL 🤝"}</strong> (${next}).</p>`);
}
function colorGuess(){
    const target=colorNames[Math.floor(Math.random()*colorNames.length)];
    const guess=prompt("Guess a color: red, blue, green, purple, orange, pink, cyan, gold, teal, indigo");
    if(!guess)return;
    setFun(`<h2>🎨 Color Guess</h2><p>The AI assistant's color was <strong>${target}</strong>.</p><p>${guess.toLowerCase()===target?"🎉 Correct!":"❌ Not this time."}</p>`);
}

// Word Scramble
let scrambleAnswer="";
function startWordScramble(){
    scrambleAnswer=randomWords[Math.floor(Math.random()*randomWords.length)];
    let chars=scrambleAnswer.split("");
    for(let i=chars.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[chars[i],chars[j]]=[chars[j],chars[i]];}
    document.getElementById("scrambleWord").textContent=chars.join(" ");
    document.getElementById("scrambleInput").value="";
    document.getElementById("scrambleResult").textContent="";
}
function checkScramble(){
    const guess=document.getElementById("scrambleInput").value.trim().toLowerCase();
    document.getElementById("scrambleResult").textContent=guess===scrambleAnswer?"🎉 Correct!":"❌ Try again.";
}

// Math challenge
let mathAnswer=null;
function startMathChallenge(){
    const a=Math.floor(Math.random()*20)+1,b=Math.floor(Math.random()*20)+1;
    const ops=["+","-","*"],op=ops[Math.floor(Math.random()*ops.length)];
    mathAnswer=op==="+"?a+b:op==="-"?a-b:a*b;
    document.getElementById("mathQuestion").textContent=`${a} ${op} ${b} = ?`;
    document.getElementById("mathAnswer").value="";
    document.getElementById("mathResult").textContent="";
}
function checkMathChallenge(){
    const value=Number(document.getElementById("mathAnswer").value);
    document.getElementById("mathResult").textContent=value===mathAnswer?"🏆 Correct!":"❌ Wrong answer.";
}

// Reaction timer
let reactionState="idle", reactionStart=0, reactionTimeout=null;
function startReactionTimer(){
    reactionState="waiting";
    const btn=document.getElementById("reactionButton");
    const status=document.getElementById("reactionStatus");
    btn.textContent="Wait...";
    status.textContent="Wait for GO... don't click yet!";
    clearTimeout(reactionTimeout);
    reactionTimeout=setTimeout(()=>{
        reactionState="go"; reactionStart=performance.now();
        btn.textContent="CLICK!";
        status.textContent="GO! GO! GO!";
    },1500+Math.random()*3500);
}
function reactionAction(){
    if(reactionState==="idle"||reactionState==="go"&&false){startReactionTimer();return;}
    if(reactionState==="waiting"){
        reactionState="idle"; clearTimeout(reactionTimeout);
        document.getElementById("reactionButton").textContent="Start";
        document.getElementById("reactionStatus").textContent="Too early! 😅";
        document.getElementById("reactionResult").textContent="Wait for GO next time.";
        return;
    }
    if(reactionState==="go"){
        const ms=Math.round(performance.now()-reactionStart);
        reactionState="idle";
        document.getElementById("reactionButton").textContent="Start";
        document.getElementById("reactionStatus").textContent="Nice!";
        document.getElementById("reactionResult").textContent=`⚡ Reaction time: ${ms} ms`;
    }
}

// Tic-Tac-Toe
let tttCells=Array(9).fill(""), tttActive=true;
function newTicTacToe(){
    tttCells=Array(9).fill("");tttActive=true;
    const board=document.getElementById("tttBoard"); board.innerHTML="";
    tttCells.forEach((_,i)=>{
        const b=document.createElement("button");b.className="ttt-cell";b.onclick=()=>tttMove(i);board.appendChild(b);
    });
    document.getElementById("tttStatus").textContent="Your turn (X).";
}
function tttWinner(){
    const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(const [a,b,c] of lines)if(tttCells[a]&&tttCells[a]===tttCells[b]&&tttCells[a]===tttCells[c])return tttCells[a];
    return tttCells.every(Boolean)?"draw":null;
}
function renderTTT(){
    document.querySelectorAll(".ttt-cell").forEach((b,i)=>b.textContent=tttCells[i]);
}
function tttMove(i){
    if(!tttActive||tttCells[i])return;
    tttCells[i]="X";renderTTT();
    let w=tttWinner();if(w){finishTTT(w);return;}
    const free=tttCells.map((x,i)=>x?null:i).filter(x=>x!==null);
    if(!free.length)return;
    const bot=free[Math.floor(Math.random()*free.length)];tttCells[bot]="O";renderTTT();
    w=tttWinner();if(w)finishTTT(w);else document.getElementById("tttStatus").textContent="Your turn.";
}
function finishTTT(w){
    tttActive=false;
    document.getElementById("tttStatus").textContent=w==="X"?"🏆 You win!":w==="O"?"🤖 AI wins!":"🤝 Draw!";
}
function ticTacToe(){showPage("fun");newTicTacToe();}

// Bhagavad Gita random verse.
// The original Sanskrit is public-domain. We use a small offline set here;
// the complete 18-chapter / 700-verse text is linked for browsing.
const gitaVerses = [
{ref:"2.47",sanskrit:"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",meaning:"Your focus is on your action, not on controlling its result."},
{ref:"2.20",sanskrit:"न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",meaning:"The Self is described as unborn, eternal and not destroyed when the body is destroyed."},
{ref:"4.7",sanskrit:"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",meaning:"Whenever dharma declines and adharma rises, the Divine manifests."},
{ref:"4.8",sanskrit:"परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",meaning:"The Divine appears to protect the good, overcome wrongdoing and restore dharma."},
{ref:"6.5",sanskrit:"उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",meaning:"One should lift oneself through one's own disciplined mind rather than letting oneself fall."},
{ref:"9.22",sanskrit:"अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",meaning:"Those who remain devoted with single-minded focus are assured of divine care."},
{ref:"12.15",sanskrit:"यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥",meaning:"One who neither disturbs others nor is disturbed by them, and is free from agitation, is dear to the Divine."},
{ref:"18.66",sanskrit:"सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",meaning:"The verse concludes with surrender to the Divine and the reassurance: do not grieve."}
];

function randomGitaVerse(){
    const v=gitaVerses[Math.floor(Math.random()*gitaVerses.length)];
    document.getElementById("gitaResult").innerHTML=`
        <p class="gita-meta">Bhagavad Gita ${v.ref}</p>
        <p class="gita-sanskrit">${escapeHTML(v.sanskrit).replace(/\n/g,"<br>")}</p>
        <h3>Simple meaning</h3>
        <p>${escapeHTML(v.meaning)}</p>
        <p class="muted">This is a concise explanation, not a substitute for a traditional commentary.</p>
    `;
}


// ---------------- INIT ----------------

renderMemory();
renderNotes();
renderTasks();
loadLanguages();
loadTopics("Python");
startRPS();
showPage("home");

setTimeout(()=>{ try{ newTicTacToe(); startWordScramble(); startMathChallenge(); }catch(e){} }, 50);
