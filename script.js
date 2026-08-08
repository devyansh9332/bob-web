// ============================================================
// BOB - PROGRAMMING ASSISTANT
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
    output.innerHTML += `<div class="bot-message"><strong>Bob:</strong> ${botResponse(message.toLowerCase())}</div>`;
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
    return "I don't understand that yet. Try a quick button or ask me about programming.";
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
    localStorage.setItem("bobName", name);
    renderMemory();
    alert(`Nice to meet you, ${name}!`);
}

function addMemory() {
    const input=document.getElementById("memoryInput"), value=input.value.trim();
    if (!value) return;
    const memory=JSON.parse(localStorage.getItem("bobMemory"))||[];
    memory.push(value);
    localStorage.setItem("bobMemory",JSON.stringify(memory));
    input.value="";
    renderMemory();
}

function renderMemory() {
    const list=document.getElementById("memoryList");
    if(!list) return;
    list.innerHTML="";
    const name=localStorage.getItem("bobName");
    if(name) {
        const li=document.createElement("li");
        li.textContent="Name: "+name;
        list.appendChild(li);
    }
    const memory=JSON.parse(localStorage.getItem("bobMemory"))||[];
    memory.forEach(item=>{const li=document.createElement("li");li.textContent=item;list.appendChild(li);});
}

function clearMemory() {
    localStorage.removeItem("bobName");
    localStorage.removeItem("bobMemory");
    renderMemory();
}

// ---------------- NOTES ----------------

function addNote() {
    const input=document.getElementById("noteInput"), note=input.value.trim();
    if(!note) return;
    const notes=JSON.parse(localStorage.getItem("bobNotes"))||[];
    notes.push(note);
    localStorage.setItem("bobNotes",JSON.stringify(notes));
    input.value="";
    renderNotes();
}

function deleteNote(index) {
    const notes=JSON.parse(localStorage.getItem("bobNotes"))||[];
    notes.splice(index,1);
    localStorage.setItem("bobNotes",JSON.stringify(notes));
    renderNotes();
}

function renderNotes() {
    const list=document.getElementById("notesList");
    if(!list) return;
    list.innerHTML="";
    const notes=JSON.parse(localStorage.getItem("bobNotes"))||[];
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
    const tasks=JSON.parse(localStorage.getItem("bobTasks"))||[];
    tasks.push({text,completed:false});
    localStorage.setItem("bobTasks",JSON.stringify(tasks));
    input.value="";
    renderTasks();
}

function completeTask(index) {
    const tasks=JSON.parse(localStorage.getItem("bobTasks"))||[];
    tasks[index].completed=!tasks[index].completed;
    localStorage.setItem("bobTasks",JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks=JSON.parse(localStorage.getItem("bobTasks"))||[];
    tasks.splice(index,1);
    localStorage.setItem("bobTasks",JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list=document.getElementById("taskList");
    if(!list) return;
    list.innerHTML="";
    const tasks=JSON.parse(localStorage.getItem("bobTasks"))||[];
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

let rpsRound=1,rpsPlayerScore=0,rpsBobScore=0,rpsDraws=0;

function showGame(gameId) {
    document.querySelectorAll(".game-panel").forEach(g=>g.classList.add("hidden"));
    document.getElementById(gameId).classList.remove("hidden");
}

function startRPS() {
    rpsRound=1;rpsPlayerScore=0;rpsBobScore=0;rpsDraws=0;
    document.getElementById("rpsRound").textContent="Round 1 / 5";
    document.getElementById("rpsResult").textContent="Choose your move!";
    document.getElementById("rpsScore").textContent="You: 0 | Bob: 0 | Draws: 0";
    document.getElementById("rpsHistory").innerHTML="";
}

function playRPS(playerChoice) {
    if(rpsRound>5)return;
    const choices=["rock","paper","scissors"];
    const bobChoice=choices[Math.floor(Math.random()*3)];
    let result;

    if(playerChoice===bobChoice){result="DRAW 🤝";rpsDraws++;}
    else if((playerChoice==="rock"&&bobChoice==="scissors")||(playerChoice==="paper"&&bobChoice==="rock")||(playerChoice==="scissors"&&bobChoice==="paper")){result="YOU WIN THIS ROUND! 🏆";rpsPlayerScore++;}
    else{result="BOB WINS THIS ROUND! 🤖";rpsBobScore++;}

    document.getElementById("rpsResult").innerHTML=`You chose: <strong>${playerChoice.toUpperCase()}</strong><br>Bob chose: <strong>${bobChoice.toUpperCase()}</strong><br><br>${result}`;
    document.getElementById("rpsScore").textContent=`You: ${rpsPlayerScore} | Bob: ${rpsBobScore} | Draws: ${rpsDraws}`;
    document.getElementById("rpsHistory").innerHTML+=`Round ${rpsRound}: You = ${playerChoice} | Bob = ${bobChoice} | ${result}<br>`;

    if(rpsRound===5) {
        const finalResult=rpsPlayerScore>rpsBobScore?"🏆 YOU WIN THE MATCH!":rpsBobScore>rpsPlayerScore?"🤖 BOB WINS THE MATCH!":"🤝 MATCH DRAW!";
        document.getElementById("rpsRound").textContent="🏁 MATCH FINISHED";
        document.getElementById("rpsResult").innerHTML+=`<br><strong>${finalResult}</strong><br>Final Score: You ${rpsPlayerScore} - Bob ${rpsBobScore}`;
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

// ---------------- PROGRAMMING MANUAL ----------------

const programmingManual = {"Python": {"Basics": [["print()", "Displays output.", "print(value)", "print(\"Hello\")", "Hello"], ["input()", "Reads text input from the user.", "input(\"prompt\")", "name = input(\"Name: \")", "Stores the entered text"], ["variable", "Stores a value under a name.", "name = value", "age = 20", "age contains 20"], ["type()", "Returns the type of a value.", "type(value)", "type(10)", "<class 'int'>"], ["len()", "Returns the number of items/characters.", "len(value)", "len(\"Hello\")", "5"], ["int()", "Converts a value to an integer.", "int(value)", "int(\"25\")", "25"], ["float()", "Converts a value to a floating-point number.", "float(value)", "float(\"3.14\")", "3.14"], ["str()", "Converts a value to a string.", "str(value)", "str(123)", "\"123\""], ["bool()", "Converts a value to a Boolean.", "bool(value)", "bool(1)", "True"], ["comments", "Adds a comment ignored by Python.", "# comment", "# This is a comment", "No output"]], "Conditions & Loops": [["if", "Runs code when a condition is true.", "if condition:", "if age >= 18:\n    print(\"Adult\")", "Adult"], ["elif", "Checks another condition.", "elif condition:", "elif age >= 13:\n    print(\"Teen\")", "Teen"], ["else", "Runs when earlier conditions are false.", "else:", "else:\n    print(\"Child\")", "Child"], ["for", "Repeats over an iterable.", "for item in iterable:", "for i in range(3):\n    print(i)", "0 1 2"], ["while", "Repeats while a condition is true.", "while condition:", "while x < 3:\n    x += 1", "Repeats until false"], ["break", "Stops the nearest loop.", "break", "for x in values:\n    if x == 5:\n        break", "Loop stops"], ["continue", "Skips to the next loop iteration.", "continue", "for x in range(5):\n    if x == 2:\n        continue", "2 is skipped"], ["pass", "Placeholder that performs no action.", "pass", "if ready:\n    pass", "No output"]], "Functions & OOP": [["def", "Defines a function.", "def name(parameters):", "def greet(name):\n    return f\"Hi {name}\"", "Reusable function"], ["return", "Sends a value back from a function.", "return value", "return a + b", "Returned value"], ["lambda", "Creates a small anonymous function.", "lambda args: expression", "square = lambda x: x*x", "square(5) → 25"], ["class", "Defines a class.", "class Name:", "class Person:\n    pass", "Creates a class"], ["__init__", "Initializer called when an object is created.", "def __init__(self, ...):", "def __init__(self, name):\n    self.name = name", "Initializes attributes"], ["self", "References the current object in instance methods.", "self.attribute", "self.name = name", "Stores instance data"], ["inheritance", "Allows a class to reuse another class.", "class Child(Parent):", "class Dog(Animal):\n    pass", "Dog inherits Animal"], ["recursion", "A function calls itself.", "def f(): f()", "def countdown(n):\n    if n:\n        countdown(n-1)", "Repeats through calls"]], "Collections": [["list", "Ordered, mutable collection.", "items = [a, b]", "nums = [1, 2, 3]", "[1, 2, 3]"], ["list.append()", "Adds an item to the end of a list.", "list.append(item)", "nums.append(4)", "[1, 2, 3, 4]"], ["list.pop()", "Removes and returns an item.", "list.pop(index)", "nums.pop()", "Last item removed"], ["list.sort()", "Sorts a list in place.", "list.sort()", "nums.sort()", "Sorted list"], ["tuple", "Ordered, immutable collection.", "items = (a, b)", "point = (10, 20)", "(10, 20)"], ["set", "Unordered collection of unique values.", "items = {a, b}", "unique = {1, 1, 2}", "{1, 2}"], ["dict", "Key-value mapping.", "data = {key: value}", "user = {\"name\": \"Bob\"}", "Key maps to value"], ["dict.get()", "Gets a dictionary value safely.", "dict.get(key, default)", "user.get(\"age\", 0)", "0 if missing"], ["enumerate()", "Iterates with index and value.", "enumerate(iterable)", "for i, x in enumerate(items):\n    print(i, x)", "Index + value"], ["zip()", "Pairs values from iterables.", "zip(a, b)", "for x, y in zip(a, b):\n    print(x, y)", "Paired values"]], "Exceptions, Files & Modules": [["try / except", "Handles exceptions.", "try:\n    code\nexcept Error:", "try:\n    int(\"x\")\nexcept ValueError:\n    print(\"Invalid\")", "Invalid"], ["finally", "Runs after try/except regardless of error.", "finally:", "try:\n    x = 1\nfinally:\n    print(\"done\")", "done"], ["raise", "Explicitly raises an exception.", "raise Exception(...)", "raise ValueError(\"Bad input\")", "Raises ValueError"], ["open()", "Opens a file.", "open(path, mode)", "with open(\"data.txt\", \"r\") as f:\n    text = f.read()", "Reads file"], ["json", "Standard module for JSON data.", "import json", "json.dumps({\"x\": 1})", "{\"x\": 1}"], ["import", "Loads a module.", "import module", "import math", "Module available"], ["from ... import", "Imports selected names.", "from module import name", "from math import sqrt", "sqrt available"], ["venv", "Creates an isolated Python environment.", "python -m venv .venv", "python -m venv .venv", "Environment created"]]}, "C": {"Basics": [["main()", "Program entry point.", "int main(void) { }", "int main(void) {\n    printf(\"Hello\");\n    return 0;\n}", "Hello"], ["printf()", "Prints formatted output.", "printf(\"format\", values);", "printf(\"Age: %d\", age);", "Formatted output"], ["scanf()", "Reads formatted input.", "scanf(\"%d\", &x);", "scanf(\"%d\", &age);", "Stores input"], ["int", "Integer data type.", "int name;", "int age = 20;", "20"], ["float", "Single-precision floating type.", "float name;", "float price = 3.14f;", "3.14"], ["char", "Stores a character.", "char name;", "char grade = 'A';", "A"], ["const", "Creates a value that should not be modified.", "const type name = value;", "const int MAX = 100;", "MAX"], ["sizeof", "Returns size in bytes.", "sizeof(type_or_expression)", "sizeof(int)", "Implementation-defined size"]], "Conditions & Loops": [["if", "Conditional execution.", "if (condition) { }", "if (age >= 18) {\n    printf(\"Adult\");\n}", "Adult"], ["else", "Alternative branch.", "else { }", "else {\n    printf(\"Minor\");\n}", "Minor"], ["switch", "Selects among cases.", "switch(value) { case ... }", "switch(day) {\n    case 1: printf(\"Mon\"); break;\n}", "Selected case"], ["for", "Count-controlled loop.", "for(init; condition; update)", "for(int i=0;i<3;i++) printf(\"%d\",i);", "012"], ["while", "Condition-controlled loop.", "while(condition) { }", "while(x < 3) x++;", "Repeats"], ["do while", "Runs body at least once.", "do { } while(condition);", "do { x++; } while(x < 3);", "Repeats"], ["break", "Exits a loop/switch.", "break;", "while(1) { break; }", "Exits"], ["continue", "Skips current loop iteration.", "continue;", "for(...) { if(x) continue; }", "Next iteration"]], "Arrays, Strings & Functions": [["array", "Fixed-size contiguous collection.", "type name[size];", "int nums[3] = {1,2,3};", "Stores 3 integers"], ["char[] string", "C strings are character arrays ending in '\\0'.", "char name[size];", "char name[20] = \"Bob\";", "Bob"], ["strlen()", "Returns string length.", "strlen(string)", "strlen(\"Hello\")", "5"], ["strcpy()", "Copies a string.", "strcpy(dest, src)", "strcpy(dest, \"Bob\");", "dest becomes Bob"], ["strcmp()", "Compares two strings.", "strcmp(a, b)", "strcmp(\"a\", \"b\")", "Negative/zero/positive"], ["function", "Reusable block of code.", "return_type name(parameters)", "int add(int a,int b){ return a+b; }", "Returns sum"], ["return", "Returns from a function.", "return value;", "return 0;", "Returned value"]], "Pointers & Memory": [["pointer", "Variable holding an address.", "type *name;", "int x=5; int *p=&x;", "p points to x"], ["&", "Address-of operator.", "&variable", "p = &x;", "Address"], ["*", "Dereferences a pointer.", "*pointer", "printf(\"%d\", *p);", "Value at address"], ["malloc()", "Allocates dynamic memory.", "malloc(bytes)", "int *p = malloc(3*sizeof(int));", "Allocated memory"], ["calloc()", "Allocates zero-initialized memory.", "calloc(count, size)", "calloc(3, sizeof(int))", "Zeroed memory"], ["realloc()", "Resizes allocated memory.", "realloc(ptr, bytes)", "p = realloc(p, 5*sizeof(int));", "Resized block"], ["free()", "Releases allocated memory.", "free(pointer)", "free(p);", "Memory released"]], "Structs & Files": [["struct", "Groups related fields.", "struct Name { fields; };", "struct User { int id; char name[20]; };", "Custom record"], ["typedef", "Creates an alias for a type.", "typedef old new;", "typedef unsigned int uint;", "uint is an alias"], ["enum", "Defines named integral constants.", "enum Name { A, B };", "enum Day { MON, TUE };", "Named constants"], ["fopen()", "Opens a file.", "fopen(path, mode)", "FILE *f = fopen(\"a.txt\",\"r\");", "File pointer"], ["fclose()", "Closes a file.", "fclose(file)", "fclose(f);", "File closed"], ["fprintf()", "Writes formatted text to a file.", "fprintf(file, format, ...)", "fprintf(f, \"%d\", x);", "Writes to file"], ["fscanf()", "Reads formatted text from a file.", "fscanf(file, format, ...)", "fscanf(f, \"%d\", &x);", "Reads from file"]]}, "C++": {"Basics & I/O": [["main()", "Program entry point.", "int main() { }", "int main(){ std::cout << \"Hello\"; }", "Hello"], ["cout", "Writes output to a stream.", "std::cout << value;", "std::cout << \"Hello\";", "Hello"], ["cin", "Reads input from a stream.", "std::cin >> variable;", "std::cin >> age;", "Stores input"], ["endl", "Ends a line and flushes the stream.", "std::endl", "std::cout << std::endl;", "New line"], ["auto", "Lets compiler infer a variable type.", "auto name = value;", "auto x = 10;", "x is int"], ["nullptr", "Represents a null pointer.", "nullptr", "int *p = nullptr;", "Null pointer"]], "Conditions & Loops": [["if", "Conditional execution.", "if (condition) { }", "if(age>=18){ std::cout<<\"Adult\"; }", "Adult"], ["else", "Alternative branch.", "else { }", "else { std::cout<<\"Minor\"; }", "Minor"], ["switch", "Selects among cases.", "switch(value) { }", "switch(day){case 1: break;}", "Selected case"], ["for", "Loop with initialization, condition and update.", "for(init;condition;update)", "for(int i=0;i<3;i++) std::cout<<i;", "012"], ["range-based for", "Iterates directly over a range/container.", "for(auto x : container)", "for(auto x : nums) std::cout<<x;", "Each element"]], "OOP": [["class", "Defines a user-defined type.", "class Name { };", "class Person { public: int age; };", "Class"], ["object", "Instance of a class.", "Class object;", "Person p;", "Object p"], ["constructor", "Initializes an object.", "Class(args) { }", "Person(int a): age(a) {}", "Initialization"], ["destructor", "Runs when an object is destroyed.", "~Class() { }", "~Person() {}", "Cleanup"], ["inheritance", "Derives one class from another.", "class Child : public Parent", "class Dog : public Animal {}", "Dog inherits Animal"], ["virtual", "Enables dynamic dispatch for member functions.", "virtual return_type f();", "virtual void speak();", "Polymorphic call"], ["override", "Marks an overriding virtual function.", "void f() override", "void speak() override;", "Compiler checks override"]], "STL Containers": [["vector", "Dynamic contiguous sequence.", "std::vector<T> v;", "std::vector<int> nums{1,2,3};", "Dynamic array"], ["array", "Fixed-size array container.", "std::array<T,N> a;", "std::array<int,3> a{1,2,3};", "Fixed container"], ["list", "Doubly linked list.", "std::list<T> l;", "std::list<int> l{1,2};", "Linked sequence"], ["stack", "LIFO container adaptor.", "std::stack<T> s;", "s.push(10);", "Top item"], ["queue", "FIFO container adaptor.", "std::queue<T> q;", "q.push(10);", "Front item"], ["set", "Sorted unique keys.", "std::set<T> s;", "std::set<int> s{3,1,2};", "1 2 3"], ["map", "Sorted key-value pairs.", "std::map<K,V> m;", "std::map<std::string,int> m{{\"Bob\",1}};", "Key → value"], ["unordered_map", "Hash-table key-value container.", "std::unordered_map<K,V> m;", "m[\"age\"] = 20;", "Hash lookup"]], "Algorithms & Modern C++": [["sort()", "Sorts a range.", "std::sort(first,last)", "std::sort(v.begin(), v.end());", "Sorted range"], ["find()", "Searches a range.", "std::find(first,last,value)", "std::find(v.begin(),v.end(),5);", "Iterator"], ["lambda", "Anonymous function object.", "[capture](args){ body }", "auto add=[](int a,int b){return a+b;};", "Callable object"], ["template", "Generic code for types.", "template<class T>", "template<class T> T max(T a,T b)", "Type-generic code"], ["unique_ptr", "Exclusive-ownership smart pointer.", "std::unique_ptr<T>", "auto p=std::make_unique<int>(5);", "Automatic cleanup"], ["shared_ptr", "Reference-counted smart pointer.", "std::shared_ptr<T>", "auto p=std::make_shared<int>(5);", "Shared ownership"], ["exception", "Base mechanism for thrown errors.", "throw / try / catch", "try{ throw 1; } catch(int x){}", "Caught exception"]]}, "Java": {"Basics": [["main()", "Java application entry point.", "public static void main(String[] args)", "public static void main(String[] args){ System.out.println(\"Hi\"); }", "Hi"], ["System.out.println()", "Prints a line.", "System.out.println(value);", "System.out.println(\"Hello\");", "Hello"], ["Scanner", "Reads user input.", "Scanner sc = new Scanner(System.in);", "int age = sc.nextInt();", "Reads integer"], ["String", "Represents text.", "String name;", "String name = \"Bob\";", "Bob"], ["int", "Primitive integer type.", "int name;", "int age = 20;", "20"], ["double", "Double-precision decimal type.", "double name;", "double price = 3.14;", "3.14"], ["boolean", "True/false primitive.", "boolean name;", "boolean ok = true;", "true"]], "Conditions & Loops": [["if", "Conditional execution.", "if(condition) { }", "if(age>=18){ System.out.println(\"Adult\"); }", "Adult"], ["else", "Alternative branch.", "else { }", "else { System.out.println(\"Minor\"); }", "Minor"], ["switch", "Selects among cases.", "switch(value) { case ... }", "switch(day){case 1: break;}", "Selected case"], ["for", "Loop with initialization, condition and update.", "for(init;condition;update)", "for(int i=0;i<3;i++) System.out.println(i);", "012"], ["while", "Repeats while condition is true.", "while(condition) { }", "while(x<3) x++;", "Repeats"], ["break", "Exits loop or switch.", "break;", "while(true){ break; }", "Exits"], ["continue", "Skips current iteration.", "continue;", "for(...){ continue; }", "Next iteration"]], "OOP": [["class", "Defines a class.", "class Name { }", "class Person { int age; }", "Class"], ["object", "Instance of a class.", "new Class()", "Person p = new Person();", "Object"], ["constructor", "Initializes an object.", "ClassName(args) { }", "Person(int a){ age=a; }", "Initialization"], ["this", "References the current object.", "this.field", "this.age = age;", "Current object"], ["static", "Member associated with the class.", "static type name;", "static int count;", "Class-level member"], ["final", "Prevents reassignment/overriding/inheritance depending on use.", "final type name;", "final int MAX=10;", "Constant reference/value"], ["extends", "Creates class inheritance.", "class Child extends Parent", "class Dog extends Animal {}", "Inheritance"], ["implements", "Declares interface implementation.", "class C implements I", "class Car implements Vehicle {}", "Implements interface"]], "Collections & Exceptions": [["ArrayList", "Resizable list implementation.", "ArrayList<T> list", "ArrayList<Integer> nums = new ArrayList<>();", "Dynamic list"], ["HashSet", "Set with unique elements.", "HashSet<T> set", "HashSet<Integer> s = new HashSet<>();", "Unique values"], ["HashMap", "Key-value map.", "HashMap<K,V> map", "HashMap<String,Integer> m = new HashMap<>();", "Key-value storage"], ["try/catch", "Handles exceptions.", "try { } catch (Exception e) { }", "try { risky(); } catch(Exception e) { }", "Exception handled"], ["throw", "Explicitly throws an exception.", "throw new Exception(...)", "throw new IllegalArgumentException(\"bad\");", "Exception thrown"], ["throws", "Declares exceptions a method may throw.", "method(...) throws Exception", "void f() throws IOException {}", "Declared exception"], ["generic", "Type parameter for reusable code.", "class Box<T>", "class Box<T>{ T value; }", "Generic type"]]}, "JavaScript": {"Basics": [["console.log()", "Writes output to the console.", "console.log(value)", "console.log(\"Hello\");", "Hello"], ["let", "Declares a block-scoped variable.", "let name = value;", "let age = 20;", "Variable"], ["const", "Declares a binding that cannot be reassigned.", "const name = value;", "const pi = 3.14;", "Constant binding"], ["var", "Older function-scoped variable declaration.", "var name = value;", "var count = 0;", "Variable"], ["typeof", "Returns a value's type string.", "typeof value", "typeof 10", "\"number\""], ["template literals", "String syntax with interpolation.", "`text ${value}`", "const s = `Age: ${age}`;", "Interpolated string"]], "Conditions & Loops": [["if", "Conditional execution.", "if(condition) { }", "if(age>=18){ console.log(\"Adult\"); }", "Adult"], ["else", "Alternative branch.", "else { }", "else { console.log(\"Minor\"); }", "Minor"], ["switch", "Selects among cases.", "switch(value) { }", "switch(day){case 1: break;}", "Selected case"], ["for", "General-purpose loop.", "for(init;condition;update)", "for(let i=0;i<3;i++) console.log(i);", "012"], ["for...of", "Iterates over values.", "for (const x of iterable)", "for(const x of nums) console.log(x);", "Each value"], ["for...in", "Iterates enumerable property keys.", "for (const key in object)", "for(const k in user) console.log(k);", "Property keys"]], "Arrays & Objects": [["Array", "Ordered collection.", "const a = [values]", "const nums = [1,2,3];", "Array"], ["map()", "Transforms each array element.", "array.map(callback)", "[1,2,3].map(x => x*2)", "[2,4,6]"], ["filter()", "Keeps elements matching a test.", "array.filter(callback)", "[1,2,3].filter(x => x>1)", "[2,3]"], ["reduce()", "Reduces a collection to one value.", "array.reduce(callback, initial)", "[1,2,3].reduce((a,b)=>a+b,0)", "6"], ["forEach()", "Runs a callback for each element.", "array.forEach(callback)", "[1,2].forEach(x=>console.log(x));", "1 then 2"], ["find()", "Returns first matching element.", "array.find(callback)", "[1,2,3].find(x=>x>1)", "2"], ["object", "Key-value collection.", "const obj = { key: value }", "const user = {name:\"Bob\"};", "Object"], ["destructuring", "Extracts values from arrays/objects.", "const {x} = obj", "const {name} = user;", "name variable"]], "Async, DOM & Web": [["function", "Declares a function.", "function name(args) { }", "function greet(){ console.log(\"Hi\"); }", "Function"], ["arrow function", "Compact function syntax.", "(args) => expression", "const add = (a,b) => a+b;", "Function"], ["Promise", "Represents eventual async completion.", "new Promise((resolve,reject)=>{})", "fetch(url).then(...)", "Async result"], ["async", "Marks a function as asynchronous.", "async function f() {}", "async function load(){ await fetch(url); }", "Promise-returning function"], ["await", "Waits for a Promise inside async code.", "await promise", "const r = await fetch(url);", "Resolved result"], ["document.querySelector()", "Selects the first matching DOM element.", "document.querySelector(selector)", "document.querySelector(\"#app\")", "Element"], ["addEventListener()", "Registers an event handler.", "element.addEventListener(event, fn)", "button.addEventListener(\"click\", fn);", "Handler runs on click"], ["localStorage", "Stores string data in the browser.", "localStorage.setItem(key,value)", "localStorage.setItem(\"name\",\"Bob\");", "Persistent browser data"], ["fetch()", "Makes a network request.", "fetch(url, options)", "fetch('/api/data')", "Promise for response"]], "JSON & Modules": [["JSON.stringify()", "Converts a JavaScript value to JSON text.", "JSON.stringify(value)", "JSON.stringify({name:\"Bob\"})", "{\"name\":\"Bob\"}"], ["JSON.parse()", "Converts JSON text to a JavaScript value.", "JSON.parse(text)", "JSON.parse('{\"x\":1}')", "Object"], ["export", "Exports module bindings.", "export { name }", "export const x = 1;", "Exported binding"], ["import", "Imports module bindings.", "import { name } from './file.js'", "import { x } from './file.js';", "Imported binding"]]}, "HTML": {"Document": [["<!DOCTYPE html>", "Declares an HTML document as modern HTML.", "<!DOCTYPE html>", "<!DOCTYPE html>", "Browser uses standards mode"], ["<html>", "Root element.", "<html>...</html>", "<html lang=\"en\">...</html>", "Document root"], ["<head>", "Contains metadata/resources.", "<head>...</head>", "<head><title>Bob</title></head>", "Metadata section"], ["<title>", "Sets the browser/page title.", "<title>text</title>", "<title>Bob</title>", "Bob"], ["<meta>", "Provides document metadata.", "<meta name=\"...\" content=\"...\">", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", "Metadata"], ["<link>", "Links external resources.", "<link rel=\"...\" href=\"...\">", "<link rel=\"stylesheet\" href=\"style.css\">", "Loads CSS"], ["<body>", "Contains visible document content.", "<body>...</body>", "<body><h1>Bob</h1></body>", "Visible content"]], "Text & Structure": [["<h1>–<h6>", "Creates headings from largest to smallest.", "<h1>Text</h1>", "<h1>Welcome</h1>", "Heading"], ["<p>", "Creates a paragraph.", "<p>Text</p>", "<p>Hello Bob.</p>", "Paragraph"], ["<div>", "Generic block container.", "<div>...</div>", "<div class=\"card\">...</div>", "Container"], ["<span>", "Generic inline container.", "<span>...</span>", "<span>Hello</span>", "Inline text"], ["<strong>", "Marks strong importance.", "<strong>Text</strong>", "<strong>Important</strong>", "Important text"], ["<em>", "Marks emphasis.", "<em>Text</em>", "<em>Note</em>", "Emphasized text"], ["<br>", "Inserts a line break.", "<br>", "Hello<br>Bob", "New line"]], "Links & Media": [["<a>", "Creates a hyperlink.", "<a href=\"URL\">Text</a>", "<a href=\"https://example.com\">Visit</a>", "Link"], ["<img>", "Embeds an image.", "<img src=\"...\" alt=\"...\">", "<img src=\"bob.png\" alt=\"Bob\">", "Image"], ["<audio>", "Embeds audio.", "<audio controls>...</audio>", "<audio controls src=\"sound.mp3\"></audio>", "Audio player"], ["<video>", "Embeds video.", "<video controls>...</video>", "<video controls src=\"video.mp4\"></video>", "Video player"], ["<iframe>", "Embeds another browsing context.", "<iframe src=\"URL\"></iframe>", "<iframe src=\"page.html\"></iframe>", "Embedded page"]], "Lists, Tables & Forms": [["<ul>", "Unordered list.", "<ul><li>...</li></ul>", "<ul><li>One</li></ul>", "Bullet list"], ["<ol>", "Ordered list.", "<ol><li>...</li></ol>", "<ol><li>First</li></ol>", "Numbered list"], ["<table>", "Table container.", "<table>...</table>", "<table><tr><td>A</td></tr></table>", "Table"], ["<tr>", "Table row.", "<tr>...</tr>", "<tr><td>A</td></tr>", "Row"], ["<td>", "Table data cell.", "<td>...</td>", "<td>Value</td>", "Cell"], ["<th>", "Table header cell.", "<th>...</th>", "<th>Name</th>", "Header cell"], ["<form>", "Groups form controls for submission.", "<form>...</form>", "<form action=\"/login\" method=\"post\">...</form>", "Form"], ["<input>", "Creates an input control.", "<input type=\"...\">", "<input type=\"email\" name=\"email\">", "Input"], ["<textarea>", "Multi-line text input.", "<textarea></textarea>", "<textarea rows=\"4\"></textarea>", "Text area"], ["<select>", "Creates a dropdown.", "<select><option>...</option></select>", "<select><option>India</option></select>", "Dropdown"], ["<button>", "Creates a clickable button.", "<button>Text</button>", "<button>Send</button>", "Button"]], "Semantic & Accessibility": [["<header>", "Introductory/header content.", "<header>...</header>", "<header><h1>Bob</h1></header>", "Header"], ["<nav>", "Navigation links.", "<nav>...</nav>", "<nav><a href=\"/\">Home</a></nav>", "Navigation"], ["<main>", "Primary page content.", "<main>...</main>", "<main>...</main>", "Main content"], ["<section>", "Thematic section.", "<section>...</section>", "<section><h2>Games</h2></section>", "Section"], ["<article>", "Self-contained content.", "<article>...</article>", "<article>News</article>", "Article"], ["<aside>", "Related/sidebar content.", "<aside>...</aside>", "<aside>Related</aside>", "Aside"], ["<footer>", "Footer content.", "<footer>...</footer>", "<footer>Copyright</footer>", "Footer"], ["alt", "Alternative text for images.", "alt=\"description\"", "<img src=\"x.png\" alt=\"Bob logo\">", "Accessible description"], ["label", "Labels a form control.", "<label for=\"id\">Text</label>", "<label for=\"email\">Email</label>", "Form label"]]}, "CSS": {"Syntax & Selectors": [["selector", "Chooses elements to style.", "selector { property: value; }", "p { color: white; }", "Paragraphs styled"], [".class", "Selects elements with a class.", ".card { }", ".card { padding: 20px; }", "Class styled"], ["#id", "Selects the element with an ID.", "#app { }", "#app { min-height: 100vh; }", "ID styled"], ["*", "Universal selector.", "* { }", "* { box-sizing: border-box; }", "All elements"], [":hover", "Applies styles while pointer hovers.", "selector:hover { }", "button:hover { opacity: .8; }", "Hover style"], ["::before", "Creates a generated pseudo-element before content.", "selector::before { }", ".card::before { content: ''; }", "Generated content"]], "Box Model & Size": [["width", "Sets content width.", "width: value;", "width: 300px;", "300px width"], ["height", "Sets content height.", "height: value;", "height: 200px;", "200px height"], ["margin", "Space outside an element.", "margin: value;", "margin: 20px;", "Outside spacing"], ["padding", "Space inside an element.", "padding: value;", "padding: 20px;", "Inside spacing"], ["border", "Draws a border.", "border: width style color;", "border: 1px solid #333;", "Border"], ["box-sizing", "Controls how width/height are calculated.", "box-sizing: border-box;", "* { box-sizing: border-box; }", "Padding included in size"], ["max-width", "Limits maximum width.", "max-width: value;", "max-width: 1100px;", "Maximum width"]], "Colors & Typography": [["color", "Sets text color.", "color: value;", "color: white;", "White text"], ["background", "Sets background.", "background: value;", "background: black;", "Black background"], ["font-family", "Chooses typeface.", "font-family: ...;", "font-family: Arial, sans-serif;", "Arial"], ["font-size", "Sets text size.", "font-size: value;", "font-size: 20px;", "20px"], ["font-weight", "Controls text thickness.", "font-weight: value;", "font-weight: 700;", "Bold"], ["line-height", "Controls line spacing.", "line-height: value;", "line-height: 1.6;", "Spacing"], ["text-align", "Aligns inline content/text.", "text-align: value;", "text-align: center;", "Centered text"]], "Layout": [["display: block", "Makes an element a block box.", "display: block;", ".item { display: block; }", "Block"], ["display: flex", "Enables Flexbox layout.", "display: flex;", ".row { display: flex; }", "Flex container"], ["justify-content", "Aligns flex/grid content along main axis.", "justify-content: value;", "justify-content: center;", "Centered"], ["align-items", "Aligns flex items on cross axis.", "align-items: value;", "align-items: center;", "Centered"], ["gap", "Sets spacing between flex/grid items.", "gap: value;", "gap: 10px;", "10px gap"], ["display: grid", "Enables CSS Grid.", "display: grid;", ".grid { display: grid; }", "Grid container"], ["grid-template-columns", "Defines grid columns.", "grid-template-columns: ...;", "grid-template-columns: repeat(3, 1fr);", "Three columns"], ["position", "Controls positioning scheme.", "position: relative|absolute|fixed|sticky;", ".menu { position: fixed; }", "Positioned element"], ["z-index", "Controls stacking order of positioned elements.", "z-index: number;", ".modal { z-index: 10; }", "Stacking"]], "Effects & Responsive": [["border-radius", "Rounds corners.", "border-radius: value;", "border-radius: 12px;", "Rounded corners"], ["box-shadow", "Adds a shadow.", "box-shadow: ...;", "box-shadow: 0 4px 20px #0003;", "Shadow"], ["opacity", "Controls transparency.", "opacity: 0..1;", "opacity: .7;", "70% opacity"], ["transform", "Transforms an element.", "transform: ...;", "transform: translateY(-2px);", "Moved element"], ["transition", "Animates property changes.", "transition: property duration;", "transition: .2s;", "Smooth change"], ["animation", "Applies a keyframe animation.", "animation: name duration;", "animation: pulse 1s infinite;", "Animation"], ["@keyframes", "Defines animation stages.", "@keyframes name { ... }", "@keyframes fade { from{opacity:0} to{opacity:1} }", "Fade animation"], ["@media", "Applies styles based on device/viewport conditions.", "@media (...) { }", "@media (max-width: 700px) { .menu{display:none;} }", "Responsive CSS"], ["var()", "Reads a CSS custom property.", "var(--name)", ":root { --accent: blue; }", "Uses custom value"]]}};

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
    document.getElementById("manualInfo").innerHTML=`
        <div class="badge">${escapeHTML(language)}</div>
        <div class="badge">${escapeHTML(category)}</div>
        <h2>${escapeHTML(entry[0])}</h2>
        <h3>Meaning</h3><p>${escapeHTML(entry[1])}</p>
        <h3>Syntax</h3><pre>${escapeHTML(entry[2])}</pre>
        <h3>Example</h3><pre>${escapeHTML(entry[3])}</pre>
        <h3>Result / Notes</h3><pre>${escapeHTML(entry[4])}</pre>
    `;
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

// ---------------- INIT ----------------

renderMemory();
renderNotes();
renderTasks();
loadLanguages();
loadTopics("Python");
startRPS();
showPage("home");
