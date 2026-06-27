let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 50 * 60; // 50 minutes

document.getElementById("candidate").textContent =
localStorage.getItem("candidateName") || "Unknown Candidate";

loadQuestion();
startTimer();

function loadQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("question").innerHTML =
    <strong>Question ${currentQuestion + 1} of ${questions.length}</strong><br><br>${q.question};

    let optionsHTML = "";

    for (let i = 0; i < q.options.length; i++) {

        optionsHTML += `
        <label style="display:block; margin:10px 0;">
            <input type="radio"
                   name="option"
                   value="${i}"
                   ${answers[currentQuestion] === i ? "checked" : ""}
                   onclick="saveAnswer(${i})">
            ${q.options[i]}
        </label>
        `;
    }

    document.getElementById("options").innerHTML = optionsHTML;
}

function saveAnswer(choice) {
    answers[currentQuestion] = choice;
}

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        loadQuestion();

    } else {

        submitExam();

    }

}

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;
        loadQuestion();

    }

}

function startTimer() {

    setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("timer").textContent =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        timeLeft--;

        if (timeLeft < 0) {

            submitExam();

        }

    }, 1000);

}

function submitExam() {

    let score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (answers[i] === questions[i].answer) {

            score++;

        }

    }

    alert(
        "Exam Completed!\n\n" +
        "Candidate: " +
        localStorage.getItem("candidateName") +
        "\n\nScore: " +
        score +
        " / " +
        questions.length
    );

    window.location.href = "index.html";

}
