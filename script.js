function startExam() {
    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter your full name.");
        return;
    }

    // Save candidate name
    localStorage.setItem("candidateName", name);

    // Go to the instructions page
    window.location.href = "instructions.html";
}
