let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Display candidate name
window.onload = function() {
    const name = localStorage.getItem("candidateName");
    if (!name) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }
    document.getElementById("candidateNameDisplay").textContent = "Welcome, " + name + "!";
    loadQuestion();
};

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentQuestion];
    document.getElementById("questionText").textContent = (currentQuestion + 1) + ". " + q.question;
    
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = function() { selectOption(index); };
        button.id = "option" + index;
        optionsContainer.appendChild(button);
        optionsContainer.appendChild(document.createElement("br"));
    });
    
    selectedOption = null;
}

function selectOption(index) {
    selectedOption = index;
    // Highlight selected option
    const buttons = document.querySelectorAll("#optionsContainer button");
    buttons.forEach((btn, i) => {
        btn.style.backgroundColor = i === index ? "#4CAF50" : "";
    });
}

function nextQuestion() {
    if (selectedOption === null) {
        alert("Please select an answer!");
        return;
    }
    
    const q = questions[currentQuestion];
    if (selectedOption === q.answer) {
        score++;
    }
    
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";
    document.getElementById("scoreDisplay").textContent = score + " out of " + questions.length;
}
