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
var scoreTable = document.getElementById('scoreTable');

// Set local storage variable
var hiScoreList=[{
    name:"",
    score: 0
    }
]; 
localStorage.setItem("highScore", JSON.stringify(hiScoreList));

// Set Universal variable and load states
var i = 0;
var startSec = 1000;
var timerInterval;
var finalScore;

// Set Questions and answers variable array
var questionSet = [
    {
        question: "Arrays in JS can be used to store which of the following?",
        answers: ['Strings','Cats','Marshmellows','Hopes and Dreams'],
        rightAnswer: "Strings"
    },
    {
        question: "Javascript is linked to HTML in order to _______",
        answers: ['Give Function','Add Style','Defend the Universe','Cats'],
        rightAnswer: "Give Function"
    },    
    {
        question: "What notation is used to enclose code in a function() .... ",
        answers: ['{}','[]','""','Cats'],
        rightAnswer: "{}"
    },
    {
        question: "Is JavaScript case-sensitive? ",
        answers: ['Sometimes','No','Yes','Cats'],
        rightAnswer: "Yes"
    },
    {
        question: "What notation is used to add a comment in Javascript?",
        answers: ['"---','//---','<!--->','<Catnap>'],
        rightAnswer: "//---"
    },  
];


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
    const isButton = event.target.nodeName === 'BUTTON';
    console.log(isButton);
    if(!isButton){
        return;
    }
    else if(i > randomQuestion.length-1 || secondsLeft < 0){
        finalScore = secondsLeft;
        scoreInput();
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
        if (secondsLeft < 0){
            secondsLeft = 0;
        };
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
    finalScoreEl.innerHTML = "Score: " + finalScore;
};
// Function to submit high score to local store
function submit(){
    // Pull in current high score list
    hiScoreList = JSON.parse(localStorage.getItem("highScore"));
    // Add in the current score
    hiScoreList.push({
    name: nameInput.value,
    score: finalScore,
    });
    // Sort the high scores in decending order
    hiScoreList.sort((a, b) => (a.score > b.score)? -1 : 1);
    // Resize to top five scores and remove placeholder from startup 
    if (hiScoreList.length > 5){
        hiScoreList.pop();
    }
    else if(hiScoreList[hiScoreList.length - 1].name == ""){
        hiScoreList.pop();
    };
    // submit new high score object to local storage
    localStorage.setItem("highScore", JSON.stringify(hiScoreList));
    // Display high score window
    showHighscore();
return;    
};

// Function to Display High Score
function showHighscore(){
    // Displays Highscore Page
    welcomeWindow.style.display = 'none';
    quizWindow.style.display = "none";
    scoreInputWindow.style.display = "none";
    highScoreWindow.style.display = "block"
    highScoreBtn.style.display = "none";
    // Populate Top 5 Highscores
    hiScoreList = JSON.parse(localStorage.getItem("highScore"));
    scoreTable.innerHTML = '';
    for (var j = 0; j < hiScoreList.length; j++){
        var k = j+1;
        scoreTable.innerHTML+= "<tr><td>"+ k +"</td><td>" + hiScoreList[j].name + "</td><td>" + hiScoreList[j].score + "</td></tr>" ;
    };
}
// Function to Reset Quiz To Start Screen
function quizReset(){
    // Reset Windows
    welcomeWindow.style.display = 'block';
    quizWindow.style.display = "none";
    scoreInputWindow.style.display = "none";
    highScoreWindow.style.display = "none"
    highScoreBtn.style.display = "block";
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
btnSubmit.addEventListener('click', submit);