//...............Initial Variable Section...............\\

// pull in HTML elements
var startBtn = document.getElementById('startBtn');
var welcomeWindow = document.getElementById('welcome');
var quizWindow = document.getElementById('quiz');
var displayedQuestion = document.getElementById('question');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var highScoreBtn = document.getElementById('highScoreBtn')
var scoreTime = document.getElementById('scoreTime');
var answerButtons = document.getElementsByClassName('btn');

// ...............Functions Section...............\\

// Function to start the quiz
function startQuiz(){
    // starts the timer Countdown
    scoreTimer();
    //If statment to hide the start screen and display quiz
    if (welcomeWindow === 'none'){
        welcomeWindow.style.display = 'block';
        quizWindow.style.display = "None";
    }
    else{
        welcomeWindow.style.display = 'none';
        quizWindow.style.display = 'block';
    };
    // Adds Question and answers
    randomQuestion = questionSet.sort(()=>Math.random() - 0.5);
    displayedQuestion.textContent = randomQuestion[0].question;
    btn1.textContent = randomQuestion[0].answers[0];
    btn2.textContent = randomQuestion[0].answers[1];
    btn3.textContent = randomQuestion[0].answers[2];
    btn4.textContent = randomQuestion[0].answers[3];

    
}

//  Function to start the score timer
function scoreTimer(){
    var secondsLeft = 40;
    scoreTime.textContent = "Time: " + secondsLeft + " sec";
    var timerInterval = setInterval(function() {
        secondsLeft--;
        scoreTime.textContent = "Time: " + secondsLeft + " sec";
    
        if(secondsLeft === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
        }
      }, 1000);
}

// Function to Display High Score
function showHighscore(){

}
// Function to Reset Quiz To Stat Screen
function quizReset(){

}
// Function to check selection agains answer
function checkAnswer(){
   
}
var questionSet = [
    {
        question: "Arrays in JS can be used to Store...",
        answers: ['Strings','cats','Marshmellows','Websites'],
        rightAnswer: "Strings"
        },
    {
        question: "Javascript is used to .... ",
        answers: ['give function','add style','defend the universe','cats'],
        rightAnswer: "give function"
    }    
    
]
console.log(questionSet[1].question);




startBtn.addEventListener("click",startQuiz);
highScoreBtn.addEventListener("click",showHighscore);
