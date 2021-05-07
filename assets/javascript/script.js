const questionBank =[
    {question: 'jQuery is a framework for which of the following:', a1: 'HTML', a2: 'Python', a3: 'SQL', a4: 'JavaScript'},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];

//array to keep track of questions already asked?

//Set the stage for questions to be served
$("#ready").click(function(){
    console.log("clicked ready");
    $("#intro").hide();
    $("#questions").show();
    serveQuestions();
    //start timer

});

//begin serving questions
function serveQuestions()
{       
    //randomly select a question from question bank and serve it

    //serve question
    $("#question-area").text(questionBank[0].question);

    //serve answers
    $("#choice-1").text(questionBank[0].a1);
    $("#choice-2").text(questionBank[0].a2);
    $("#choice-3").text(questionBank[0].a3);
    $("#choice-4").text(questionBank[0].a4);
    //delete from question bank after answer
    //keep counter of total answered questions
    //keep counter of total right answers
    //keep track of score
};

//check answers
function checkAnswers()
{

};

//use set interval / clear interval to start and stop timer
