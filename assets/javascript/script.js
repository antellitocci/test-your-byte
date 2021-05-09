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
                correct: 'clearInterval()'},
    {question: 'If an array contains 5 total items, which item will be returned at array[3]?', 
                a1: 'The First', a2: 'The Second', a3: 'The Third', a4: 'The Fourth', 
                correct: 'The Fourth'},
    {question: 'Which of the following is won\'t throw an error?', 
                a1: 'window.alert(Hello World!);', a2: 'window.alert("Hello World!");', a3: 'window.alert("Hello World"!)', a4: 'window.alert("Hello World!);', 
                correct: 'window.alert("Hello World!");'},
    {question: 'Which is the correct "if" statement to execute code if "x" is equal to 46?', 
                a1: 'if(x==46)', a2: 'if(x,46)', a3: 'if(x=46)', a4: 'if(x!=46)', 
                correct: 'if(x==46)'},
    {question: 'Which function can remove items from an array?', 
                a1: '.unshift()', a2: '.push()', a3: '.splice()', a4: '.concat()', 
                correct: '.splice()'},
    {question: 'In an array: arr  = ["red", "green", "blue", "yellow"], how do we reference the 2nd item?', 
                a1: 'arr[2]', a2: 'arr[1]', a3: 'arr[0]', a4: 'arr[3]', 
                correct: 'arr[1]'},
    {question: 'console.log() is useful for?', 
                a1: 'Providing user feedback', a2: 'Passing variables to other functions', a3: 'Adding elements to HTML console', a4: 'Debugging', 
                correct: 'Debugging'},
    {question: 'If var feedback = "Good Job", console.log(feedback); will print what?', 
                a1: 'feedback', a2: 'Good Job', a3: '"Good Job"', a4: 'Null', 
                correct: 'Good Job'}
];

//array to keep track of questions asked
var questionsAskedArr = [];

//initialize randomQuestion variable
var randomQuestion = 0;

//initialize variable to give game # of questions to ask
var questionsToAsk = 10;

//initialize variable to track number of questions answered
var questionsAnswered = 0;

//initialize variable to keep track of correct / incorrect answers
var correctAnswers = 0;
var incorrectAnswers = 0;

//initialize variable to keep track of score & player rating
var score = 0;
var playerRatingArr = ['Novice', 'Apprentice', 'Journeyman', 'Master', 'Grandmaster'];
var playerRating = ''; 

//set initial time
var startTime = 60;
var timeLeft = startTime;
var timePenalty = 15; //set penalty for answering questions incorrectly
var timer;

//initialize high score array or set to empty if none in local storage
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];


//Set the stage for questions to be served when 'I'm Ready!" button is clicked
$("#ready").click(function(){
    //Hide the introductory content
    $("#intro").hide();
    //Show the question area content and populate question
    $("#questions").show();
    serveQuestion();
    //set timer to run every 1 second
    timer = setInterval(runTimer, 1000);
});

//begin serving questions
function serveQuestion()
{   
    //Hide feedback from previous question
    $(".card-footer").hide();   

    //randomly select a question from question bank
    randomQuestion = Math.floor(Math.random()*questionBank.length);

    //check if selected question already asked
    while (questionsAskedArr.includes(randomQuestion))
    {
        //if already asked, continue to search for a random number that hasn't been asked
        randomQuestion = Math.floor(Math.random()*questionBank.length);
    };

    //push to questions asked array - to log all questions asked already to avoid duplicates
    questionsAskedArr.push(randomQuestion);

    //serve question
    $("#question-area").html(questionBank[randomQuestion].question);
    //serve answer choices
    $("#choice-1").text(questionBank[randomQuestion].a1);
    $("#choice-2").text(questionBank[randomQuestion].a2);
    $("#choice-3").text(questionBank[randomQuestion].a3);
    $("#choice-4").text(questionBank[randomQuestion].a4);
};

//check answers
$('.choices').click(function(event){
    //Check if the text content of the selected button is the correct answer
    if($(this).text() === questionBank[randomQuestion].correct.toString())
    {
        //If it is correct answer, +1 to correct answers and questions asked
        correctAnswers ++;
        questionsAnswered ++;
        //Let user know they were correct
        $('#feedback').show();
        $('#feedback').html("<h4>Correct!</h4>");
    }
    else
    {
        //If incorrect answer, +1 to incorrect answers and questions asked
        incorrectAnswers ++;
        questionsAnswered ++;
        //Let user know they were incorrect
        $('#feedback').show();
        $('#feedback').html("<h4>Incorrect!</h4>");
        //make sure there is enough time remaining to subtract the timePenalty. If not, only subtract the remaining time.
        if(timeLeft > timePenalty)
        {
            timeLeft -= timePenalty;
        }
        else
        {
            timeLeft -= timeLeft;
        }
    }

    //Get ready to serve the next question
    if(questionsAnswered < questionsToAsk && timeLeft > 0)
    {
        //pause to show feedback before showing new question
        setTimeout(serveQuestion,500);
    }
    else
    {
        //End game & calculate score
        calculateFinalScore();
    }

});

//calculate Final Score
function calculateFinalScore()
{
    //stop the game clock and freeze time counter appropriately
    stopTimer();
    if(timeLeft > 0)
    {
        $('#timer').text(timeLeft);
    }
    else
    {
        $('#timer').text('Time: 0');
    }

    //show game over modal & prevent from closing when clicking outside of bounds
    $("#game-over").modal({backdrop: 'static', keyboard: false});
    $("#game-over").modal('show');

    //calculate final score and rating
    timeBonus = (timeLeft/100) * 30000;//change to be variable based on time remaining
    score = ((correctAnswers * 1000) - (incorrectAnswers * 250)) + timeBonus;
    if (score <=2500)
    {
        playerRating = playerRatingArr[0];
    }
    else if (score > 2500 && score <= 5000)
    {
        playerRating = playerRatingArr[1];
    }
    else if (score > 5000 && score <= 10000)
    {
        playerRating = playerRatingArr[2];
    }
    else if (score > 10000 && score <= 20000)
    {
        playerRating = playerRatingArr[3];
    }
    else
    {
        playerRating = playerRatingArr[4];
    }

    //Display the user's final score
    displayScore();
};

//Display score to user
function displayScore()
{
    //display scores to user
    $("#questions-answered").text(questionsAnswered);
    $('#questions-correct').text(correctAnswers);
    $('#questions-incorrect').text(incorrectAnswers);
    $('#time-remaining').text(timeLeft);
    $('#total-score').html("<b>" + score + "</b>");
    $("#rating").html("<b>" + playerRating + "</b>");
};

//function to handle the timer updates
function runTimer()
{
    if(timeLeft > 0)
    {
        //set text of h2 span timer element
        $("#timer").text("Time: " + timeLeft);
        timeLeft --;
    }
    else if (timeLeft <= 0)
    {
        //End game if time runs out
        calculateFinalScore();
    }
};

function stopTimer()
{
    clearInterval(timer);
};

//Reset game and tracking variables (does not reset high scores)
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
    incorrectAnswers = 0;
    correctAnswers = 0;
    questionsAskedArr = [];
    score = 0;
};

//Prompt user to enter intials and save their high score if they would like
var saveScorePrompt = $("#save-score").click(function(){
    $("#game-over").modal('hide');

    //prevent the save modal from closing when clicking outside of bounds
    $("#save-modal").modal({backdrop: 'static', keyboard: false});
    $("#save-modal").modal('show');
    $('#total-score-save').html($('#total-score').html());
    $("#rating-save").html("<b>" + playerRating + "</b>");
});

//save player high score information then push to local storage
$("#save-hs").submit(function(event){
    //get input from input box
    var playerName = $('#initials').val().trim();

    //ensure player inputs their initials
    if(playerName !== "")
    {
        //create the user's high score. store name, score, and rating
        var highScore = {
            p_Name: playerName,
            p_Score: score,
            p_Rating: playerRating
         };
        
        //push score to high scores array
        highScores.push(highScore);
        //Save to local storage
        saveHighScores();
        
        $('#initials').val('');
        resetGame();
    }
});

function loadHighScores()
{
    //sort the high scores array in descending order by score (highest at top)
    highScores.sort(function(a,b){return b.p_Score - a.p_Score});

    //loop through the high scores array and pull out each object's information
    $.each(highScores, function(arr, object){
        // console.log(arr, object);
        createHighScoreListing(object.p_Name, object.p_Score, object.p_Rating);
    });
};

function createHighScoreListing(p_Name, p_Score, p_Rating)
{
    //create list item with appropriate children for list group of high scores
    var scoreLi = $("<li>")
        .addClass("list-group-item d-flex justify-content-between align-items-start");
    var scoreLiMainDiv = $("<div>").addClass("ms-2 me-auto");
    var scorePNameDiv = $("<div>")
        .addClass("fw-bold")
        .text(p_Name);
    var scorePScoreDiv =$("<div>").text(p_Score);
    //create and set initial class of <span> element holding player rating
    var scorePRatingSpan = $("<span>").addClass("badge");
    //create the color of the <span> element based on player rating
    if(p_Rating == playerRatingArr[0])
    {
        scorePRatingSpan.addClass("bg-danger");
    }
    else if (p_Rating == playerRatingArr[1])
    {
        scorePRatingSpan.addClass("bg-success");
    }
    else if (p_Rating == playerRatingArr[2])
    {
        scorePRatingSpan.addClass("bg-primary");
    }
    else if (p_Rating == playerRatingArr[3])
    {
        scorePRatingSpan.addClass("bg-secondary");
    }
    else
    {
        scorePRatingSpan.addClass("bg-dark");
    }

        scorePRatingSpan.text(p_Rating);

    //append items in the correct order then add to ol in HTML modal
    //append player name and player score to main div
    scoreLiMainDiv.append(scorePNameDiv, scorePScoreDiv);

    //append main div and span to li item
    scoreLi.append(scoreLiMainDiv, scorePRatingSpan);

    //append li to ol item in modal for high scores
    $("#high-scores-ol").append(scoreLi);
};
//save high scores to local storage
function saveHighScores()
{
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

//Show high scores
$("#high-scores").click(function(){
    $("#scores-modal").modal('show');
});

//Close high scores
$("#hs-close").click(function(){
    $("#scores-modal").modal('hide');
});

//Clear all high scores
$("#hs-clear").click(function() {
    highScores = [];
    saveHighScores();
    //empty the high scores list. The raddymaster easter egg will always re-load after page refresh
    $("#high-scores-ol").empty();
});

//load high scores by default. Will create an empty array if none exist
loadHighScores();