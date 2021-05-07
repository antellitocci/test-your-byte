const questionBank =[
    {question: 'jQuery is a framework for which of the following:', 
                a1: 'HTML', a2: 'Python', a3: 'SQL', a4: 'JavaScript'},
    {question: 'What is the correct syntax for saying Variable A is not equal to 10?', 
                a1: 'Variable A <> 10', a2: 'Variable A not 10', a3: 'Variable A != 10', a4: 'Variable A -= 10'},
    {question: 'Writing "var += 1" is the same as saying:', 
                a1: 'var = 1', a2: 'var + 1', a3: 'var + var + 1', a4: 'var is always 1'},
    {question: 'An array is used to store multiple values in a single _________.', 
                a1: 'variable', a2: 'element', a3: 'string', a4: 'operator'},
    {question: 'The .push() function is used to _________.', 
                a1: 'Remove an item from the end of an array', a2: 'Add an item to the end of an array', a3: 'Add an item to the beginning of an array', a4: 'Remove an item from the beginning of an array'},
    {question: 'In: <br/><br/><i>function exampleFunc(element){};</i> <br/><br/>element is an example of a(n):', 
                a1: 'trigger', a2: 'argument', a3: 'parameter', a4: 'type'},
    {question: 'By default, arrays start an index of:', 
                a1: '0', a2: '1', a3: '-1', a4: 'null'},
    {question: 'To convert a number to a string you can use:', 
                a1: '.str()', a2: '.string()', a3: '.toString()', a4: '.toStr()'},
    {question: 'To comment out JavaScript code, you put _________ in front.', 
                a1: '<!--', a2: '*/', a3: '/*', a4: '//'},
    {question: 'If you fail to follow a <i>setInterval()</i> with a _________ it will run forever.', 
                a1: 'clearInterval()', a2: 'stopInterval()', a3: 'haltInterval()', a4: 'clearTimeout()'}
];

//array to keep track of questions asked
var questionsAskedArr = [];

//initialize randomQuestion variable
var randomQuestion = 0;

//initialize variable to track number of questions asked
var questionsAsked = 0;

//Set the stage for questions to be served
$("#ready").click(function(){
    console.log("clicked ready");
    //Hide the introductory content
    $("#intro").hide();
    //Show the question content and populate question
    $("#questions").show();
    serveQuestion();
    //set timer
});

//begin serving questions
function serveQuestion()
{      
    //only select 10 questions? 
    //randomly select a question from question bank and serve it
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
    //serve answers (Assign random answers to random areas? how keep track of correct)
    $("#choice-1").text(questionBank[randomQuestion].a1);
    $("#choice-2").text(questionBank[randomQuestion].a2);
    $("#choice-3").text(questionBank[randomQuestion].a3);
    $("#choice-4").text(questionBank[randomQuestion].a4);
    //delete from question bank after answer?
    //When reached last question, pause timer and save as high score. Then clear timer and tracker of questions asked.
};

//check answers
// function checkAnswers()
// {
    //keep counter of total answered questions
    //keep counter of total right answers
    //keep track of score - time bonus?
    //if wrong subtract time from clock
    //array of buttons to check against?
    $('.choices').click(function(event){
        console.log($(this).attr('id'));
    });

// };

//calculate score
function calculateScore()
{

};

//use set interval / clear interval to start and stop timer
function timer()
{

};