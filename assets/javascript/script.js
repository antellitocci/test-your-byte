const questionBank =[
    {question: 'jQuery is a framework for which of the following:', 
                a1: 'HTML', a2: 'Python', a3: 'SQL', a4: 'JavaScript', 
                correct:'JavaScript'},
    {question: 'What is the correct syntax for saying Variable A is not equal to 10?', 
                a1: 'Variable A <> 10', a2: 'Variable A not 10', a3: 'Variable A != 10', a4: 'Variable A -= 10', 
                correct:'Variable A != 10'},
    {question: 'Writing "var += 1" is the same as saying:', 
                a1: 'var = 1', a2: 'var + 1', a3: 'var + var + 1', a4: 'var is always 1', 
                correct: 'var + 1'},
    {question: 'An array is used to store multiple values in a single _________.', 
                a1: 'variable', a2: 'element', a3: 'string', a4: 'operator', 
                correct: 'variable'},
    {question: 'The .push() function is used to _________.', 
                a1: 'Remove an item from the end of an array', a2: 'Add an item to the end of an array', a3: 'Add an item to the beginning of an array', a4: 'Remove an item from the beginning of an array', 
                correct: 'Add an item to the end of an array'},
    {question: 'In: <br/><br/><i>function exampleFunc(element){};</i> <br/><br/>element is an example of a(n):', 
                a1: 'trigger', a2: 'argument', a3: 'parameter', a4: 'type',
                correct: 'parameter'},
    {question: 'By default, arrays start an index of:', 
                a1: '0', a2: '1', a3: '-1', a4: 'null', 
                correct: '0'},
    {question: 'To convert a number to a string you can use:', 
                a1: '.str()', a2: '.string()', a3: '.toString()', a4: '.toStr()', 
                correct: '.toString()'},
    {question: 'To comment out JavaScript code, you put _________ in front.', 
                a1: '<!--', a2: '*/', a3: '/*', a4: '//', 
                correct: '//'},
    {question: 'If you fail to follow a <i>setInterval()</i> with a _________ it will run forever.', 
                a1: 'clearInterval()', a2: 'stopInterval()', a3: 'haltInterval()', a4: 'clearTimeout()',
                correct: 'clearInterval()'}
];

//array to keep track of questions asked
var questionsAskedArr = [];

//initialize randomQuestion variable
var randomQuestion = 0;

//initialize variable to track number of questions asked
var questionsAnswered = 0;

//initialize variable to keep track of score & player rating
var score = 0;
var playerRatingArr = ['Novice', 'Apprentice', 'Journeyman', 'Master', 'JavaScript Maestro']; 

//initialize variable to keep track of correct / incorrect answers
var correctAnswers = 0;
var incorrectAnswers = 0;

//set initial time
var startTime = 100;
var timeLeft = startTime;
var timer;

//initialize high score array
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];


//Set the stage for questions to be served when 'I'm Ready!" button is clicked
$("#ready").click(function(){
    console.log("clicked ready");
    //Hide the introductory content
    $("#intro").hide();
    //Show the question content and populate question
    $("#questions").show();
    serveQuestion();
    //set timer
    timer = setInterval(runTimer, 1000);
});

//begin serving questions
function serveQuestion()
{   
    //Hide feedback from previous question
    $(".card-footer").hide();   

    //randomly select a question from question bank
    randomQuestion = Math.floor(Math.random()*questionBank.length);

    //check if already asked
    while (questionsAskedArr.includes(randomQuestion))
    {
        randomQuestion = Math.floor(Math.random()*questionBank.length);
        console.log(randomQuestion);
    };

    //push to questions asked array - if so choose a new random number
    questionsAskedArr.push(randomQuestion);
    console.log(questionsAskedArr);

    //serve question
    $("#question-area").html(questionBank[randomQuestion].question);
    //serve answers
    $("#choice-1").text(questionBank[randomQuestion].a1);
    $("#choice-2").text(questionBank[randomQuestion].a2);
    $("#choice-3").text(questionBank[randomQuestion].a3);
    $("#choice-4").text(questionBank[randomQuestion].a4);
};

//check answers
$('.choices').click(function(event){
    console.log($(this).attr('id'));
    if($(this).text() === questionBank[randomQuestion].correct.toString())
    {
        correctAnswers ++;
        questionsAnswered ++;
        console.log(correctAnswers);
        //add answer feed back
        $('#feedback').show();
        $('#feedback').html("<h4>Correct!</h4>");
    }
    else
    {
        $('#feedback').show();
        $('#feedback').html("<h4>Incorrect!</h4>");
        //make sure there is enough time remaining to subtract 10. If not, only subtract the remaining time.
        if(timeLeft > 10)
        {
            timeLeft -= 10;
        }
        else
        {
            timeLeft -= timeLeft;
        }

        questionsAnswered ++;
        console.log(score);
    }
    if(questionsAnswered < 10 && timeLeft > 0)
    {
        //pause to give feedback before showing new question
        setTimeout(serveQuestion,500);
    }
    else
    {
        console.log("game over");
        //End game
        calculateFinalScore();
    }

});



//calculate Final Score
function calculateFinalScore()
{
    //stop the game clock
    stopTimer();
    if(timeLeft > 0)
    {
        $('#timer').text(timeLeft);
    }
    else
    {
        $('#timer').text('0');
    }

    //show game over modal
    $("#game-over").modal('show');

    //calculate final score and rating
    timeBonus = (timeLeft/100) * 25000;//change to be variable based on time remaining
    score = ((correctAnswers * 1000) - (incorrectAnswers * 250)) + timeBonus;
    console.log(score);
    displayScore();
};

//use set interval / clear interval to start and stop timer
//break this out
function runTimer()
{
    if(timeLeft > 0)
    {
        //set text of h2 span timer element
        $("#timer").text(timeLeft);
        timeLeft --;
        console.log(timeLeft);
    }
    else if (timeLeft <= 0)
    {
        //End game
        calculateFinalScore();
        console.log(timeLeft);

    }

};

function stopTimer()
{
    clearInterval(timer);
}

$(".close").click(resetGame);

function resetGame()
{
    $("#game-over").modal('hide');
    $("#save-modal").modal('hide');
    $("#questions").hide();
    $("#intro").show();
    timeLeft = startTime;
    $("#timer").text('');
    questionsAnswered = 0;
    correctAnswers = 0;
    questionsAskedArr = [];
    score = 0;
}

function displayScore()
{

    //add rating scale

    //display and save scores to local storage
    $("#questions-answered").text(questionsAnswered);
    $('#questions-correct').text(correctAnswers);
    $('#questions-incorrect').text(incorrectAnswers);
    $('#time-remaining').text(timeLeft);
    $('#total-score').html("<b>" + score + "</b>");
    $("#rating").html("<b>Powerhouse</b>");
}

function viewHighScores()
{
    //https://www.tutorialrepublic.com/faq/how-to-open-a-bootstrap-modal-window-using-jquery.php#:~:text=Answer%3A%20Use%20the%20modal(',and%20modal('toggle')%20.
}

var saveScorePrompt = $("#save-score").click(function(){
    $("#game-over").modal('hide');
    $("#save-modal").modal('show');
    $('#total-score-save').html($('#total-score').html());
    $("#rating-save").html("<b>Powerhouse</b>");
})

//save high score to local storage
$("#save-hs").submit(function(event){
    //get input from input box
    var playerName = $('#initials').val().trim();

    //ensure player inputs their initials
    if(playerName !== "")
    {
        var highScore = {
            player: playerName,
            p_score: score,
         };
    
        highScores.push(highScore);
        
        saveHighScores();
        
        $('#initials').val('');
        resetGame();
    }
    else
    {
        window.alert("please add your initials before submitting");
    }

})

function loadHighScores()
{
    $.each(highScores, function(arr, object){
        console.log(arr, object);
        createHighScoreListing(object.player, object.p_score);
    });
}

function createHighScoreListing(p_name, p_score)
{
    var scoreLi = $("<li>")
        .addClass("list-group-item d-flex justify-content-between align-items-start");
    var scoreLiMainDiv = $("<div>").addClass("ms-2 me auto");
    var scorePNameDiv = $("<div>")
        .addClass("fw-bold")
        .text(p_name);
    var scorePScoreDiv =$("<div>").text(p_score);
    // var scorePRatingSpan = $("<span>")
    //     .class("badge bg-primary")
    //     .text(p_rating);

    //append items in the correct order then add to ol in HTML modal
    //append player name and player score to main div
    scoreLiMainDiv.append(scorePNameDiv, scorePScoreDiv);

    //append main div and span to li item
    scoreLi.append(scoreLiMainDiv);

    //append li to ol item in modal for high scores
    $("#high-scores-ol").append(scoreLi);
}

function saveHighScores()
{
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

//sort array largest to smallest when printing to screen

//capture button clicks to perform various functions

//Show high scores
$("#high-scores").click(function(){
    $("#scores-modal").modal('show');
})

//Clear all high scores
// remove all tasks
$("#hs-clear").on("click", function() {
    highScores = [];
    saveHighScores();
});

loadHighScores();