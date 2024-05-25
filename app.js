
// Your Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBXrN8jWLF_tZrNuoIFAuIYl-IIa3zajW8",
  authDomain: "quiz-app-439ab.firebaseapp.com",
  projectId: "quiz-app-439ab",
  storageBucket: "quiz-app-439ab.appspot.com",
  databaseURL: "https://quiz-app-439ab-default-rtdb.firebaseio.com",
  messagingSenderId: "610410658785",
  appId: "1:610410658785:web:fe310fe416452c28b130a0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database().ref("useranswers")

var questions = [
{ question: "Which tag is used to define an unordered list in HTML?", option1: "<ul>", option2: "<ol>", option3: "<li>", corrAnswer: "<ul>" },
{ question: "Which CSS property changes the text color?", option1: "text-color", option2: "color", option3: "font-color", corrAnswer: "color" },
{ question: "What is the correct syntax to link an external CSS file to an HTML document?", option1: "<link rel='stylesheet' href='style.css'>", option2: "<style src='style.css'>", option3: "<css href='style.css'>", corrAnswer: "<link rel='stylesheet' href='style.css'>" },
{ question: "What keyword is used to declare a variable in JavaScript?", option1: "variable", option2: "var", option3: "let", corrAnswer: "var" },
{ question: "Which attribute of the anchor tag specifies the destination URL of a hyperlink?", option1: "href", option2: "link", option3: "url", corrAnswer: "href" },
{ question: "What tag is used to embed a video in HTML?", option1: "<video>", option2: "<media>", option3: "<embed>", corrAnswer: "<video>" },
{ question: "What does CSS stand for?", option1: "Creative Style Sheets", option2: "Cascading Style Sheets", option3: "Computer Style Sheets", corrAnswer: "Cascading Style Sheets" },
{ question: "Which JavaScript method is used to add or change HTML content?", option1: "innerHTML", option2: "appendText", option3: "addText", corrAnswer: "innerHTML" },
{ question: "What CSS property is used to change the background color of an element?", option1: "background-color", option2: "color", option3: "bgcolor", corrAnswer: "background-color" },
{ question: "What is the correct syntax for a JavaScript single-line comment?", option1: "// This is a comment", option2: "<!-- This is a comment -->", option3: "/* This is a comment */", corrAnswer: "// This is a comment" }
];

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var timer = document.getElementById("timer");
var btn = document.getElementById("btn");
var index = 0;
var score = 0;
var min = 1;
var sec = 59;
var timerInterval;

function startTimer() {
clearInterval(timerInterval);
timerInterval = setInterval(function () {
    timer.innerHTML = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    sec--;
    if (sec < 0) {
        min--;
        sec = 59;
        if (min < 0) {
            clearInterval(timerInterval);
            min = 1;
            sec = 59;
            nextQuestion();
        }
    }
}, 1000);
}

function initializeQuiz() {
startTimer();
displayQuestion();
}

function displayQuestion() {
if (index < questions.length) {
  var correctAnswer = questions[index]["corrAnswer"];
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    btn.disabled = true;
} else {
    clearInterval(timerInterval);
    showResults();
}
}

function nextQuestion() {
  var getOptions = document.getElementsByName("option");
  var selectedValue;
  for (var i = 0; i < getOptions.length; i++) {
      if (getOptions[i].checked) {
          selectedValue = getOptions[i].value;
          var selectedAns = questions[index][`option${selectedValue}`];
          var correctAnswer = questions[index]["corrAnswer"];

        
          database.push({
              question: questions[index].question,
              selectedAnswer: selectedAns,
              correctAnswer: correctAnswer,
              isCorrect: selectedAns === correctAnswer
          });

          if (selectedAns === correctAnswer) {
              score++;
          }
          getOptions[i].checked = false;
      }
  }

  index++;
  min = 1;
  sec = 59;
  displayQuestion();
}


function showResults() {
var percentage = (score / questions.length) * 100;
Swal.fire({
    title: percentage >= 50 ? "Good job!" : "Sorry!",
    text: `Your percentage is: ${percentage.toFixed(2)}%`,
    icon: percentage >= 50 ? "success" : "error",
}).then((result) => {
    if (result.isConfirmed) {
        resetQuiz();
    }
});
}

function resetQuiz() {
index = 0;
score = 0;
min = 1;
sec = 59;
displayQuestion();
startTimer();
}

function enableNextButton() {
btn.disabled = false;
}

btn.addEventListener("click", nextQuestion);
