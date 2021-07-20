//...............Initial Variable Section...............//

// pull in HTML elements
var startBtn = document.getElementById('startBtn');
var welcomeWindow = document.getElementById('welcome');
var quizWindow = document.getElementById('quiz');
var displayedQuestion = document.getElementById('question');
var scoreInputWindow = document.getElementById('scoreInput');
var highScoreWindow = document.getElementById('highScorePage');
var btnList=document.getElementById('btnList');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var highScoreBtn = document.getElementById('highScoreBtn');
var btnSubmit = document.getElementById('btnSubmit');
var btnReset = document.getElementById('btnReset');
var scoreTime = document.getElementById('scoreTime');
var answerButtons = document.querySelectorAll('btnAns');
var finalScoreEl = document.getElementById('finalScore');
var nameInput = document.getElementById('name');
// Set local storage variable
var hiScoreList=[{
    name:"",
    score: 0
    }
]; 
localStorage.setItem("highScore", JSON.stringify(hiScoreList));
// Set Universal variable and load states
var i = 0;
var startSec = 200;
var timerInterval;
var finalScore;
// Set Questions and answers variable array
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
    },    
    {
        question: "What notation is used to enclose code in a function() .... ",
        answers: ['{}','[]','""','cats'],
        rightAnswer: "{}"
    }
]


// ...............Quiz Functions Section...............//

// Function to start the quiz
function startQuiz(){
    // starts the timer Countdown
    secondsLeft = startSec;
    scoreTimer();
    //If statment to hide the start screen and display quiz
    if (welcomeWindow === 'none'){
        welcomeWindow.style.display = 'block';
        quizWindow.style.display = "none";
        scoreInputWindow.style.display = "none";
        highScoreWindow.style.display = "none"
    }
    else{
        welcomeWindow.style.display = 'none';
        scoreInputWindow.style.display = 'none';
        quizWindow.style.display = 'block';
        highScoreWindow.style.display = "none"
    };
    // Randomize Question Set
    randomQuestion = questionSet.sort(()=>Math.random() - 0.5);
    i = 0;
    cycleQuestion(); 
    //secondsLeft = 400;
    console.log(i);   
}
//  Function to start the score timer
function scoreTimer(){
    scoreTime.textContent = "Time: " + secondsLeft + " sec";
    timerInterval = setInterval(function() {
        if(secondsLeft > 0){
        secondsLeft--;
        scoreTime.textContent = "Time: " + secondsLeft + " sec";
        }
        else if(secondsLeft <= 0) {
          // Stops execution of action at set interval
          secondsLeft = 0;
          finalScore = secondsLeft;
          scoreTime.textContent = "Time: " + secondsLeft + " sec"
          clearInterval(timerInterval);
          scoreInput();
        }
      }, 1000);
}
// Function to display and cycle through the questions
function cycleQuestion(){
    
    if (i <= randomQuestion.length-1){
        displayedQuestion.textContent = randomQuestion[i].question;
        btn1.textContent = randomQuestion[i].answers[0];
        btn2.textContent = randomQuestion[i].answers[1];
        btn3.textContent = randomQuestion[i].answers[2];
        btn4.textContent = randomQuestion[i].answers[3];
    }
    else{
        clearInterval(timerInterval);
        //finalScore=secondsLeft;
        finalScore = secondsLeft;
        scoreInput();
    }
}
// Function to check answers against correct answer
function checkAnswer(event){
    if(i > randomQuestion.length-1 || secondsLeft <= 0){
        return;
    }
    else if (event.target.textContent == randomQuestion[i].rightAnswer){
       console.log('correct');
       i = i+1;
       cycleQuestion();
    }
    else{
        console.log('wrong');
        clearInterval(timerInterval);
        secondsLeft=secondsLeft - 100;
        i = i+1;
        scoreTimer();
        cycleQuestion();
    };
};

//...............HighScore Input, HighScore Display, and Reset Function...............//

// Function to Display the Score Input Page
function scoreInput(){
    // Display final score window
    welcomeWindow.style.display = 'none';
    quizWindow.style.display = "none";
    scoreInputWindow.style.display = "block";
    highScoreWindow.style.display = "none"
    //Display final score on screen
    finalScoreEl.innerHTML = "Score:" + finalScore;
    
       // submit high score to local store
     btnSubmit.addEventListener('click', function(){
        
        hiScoreList = JSON.parse(localStorage.getItem("highScore"));
        hiScoreList.push({
            name: nameInput.value,
            score: finalScore
        });      
        console.log(hiScoreList);
        localStorage.setItem("highScore", JSON.stringify(hiScoreList));    
    })
};
// Function to Display High Score
function showHighscore(){

}
// Function to Reset Quiz To Start Screen
function quizReset(){
    // Reset Windows
    welcomeWindow.style.display = 'block';
    quizWindow.style.display = "none";
    scoreInputWindow.style.display = "none";
    highScoreWindow.style.display = "none"
    // Reset Variables
    i = 0;
    secondsLeft = startSec;
    timerInterval;
    finalScore;
}






//...............Button Event Listeners...............//

startBtn.addEventListener("click",startQuiz);
highScoreBtn.addEventListener("click",showHighscore);
btnList.addEventListener('click', checkAnswer)
btnReset.addEventListener('click',quizReset)