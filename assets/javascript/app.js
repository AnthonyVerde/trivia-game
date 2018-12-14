$(document).ready(function() {
//keep track of questions
var questionCounter = 0;

//transition time between questions 
var transitionTime = 5000;

//track score
var correct = 0;
var incorrect = 0;
var missed = 0;

//creating array of user's answers
var answersChosen = [];

//creating an array of objects with the questions, answer options, and correct answer
var questions = [
{
	question:  "<span>" + "1 of 6:" + "</span>" + "<br>" + "What is 2 + 2?",
	choices: ["3", "1", "4", "8"],
	correctAnswer: 2
},
{
	question: "<span>" + "2 of 6:" + "</span>" + "<br>" + "How much wood would a woodchuck chuck if __________",
	choices: ["...it was a soft wood such as pine?", "...a woodchuck could chuck wood?", "...the woodchuck lived in Canada?", "...his name was Phil?"],
	correctAnswer: 1
},
{
	question: "<span>" + "3 of 6:" + "</span>" + "<br>" + "When using RGB, what colour is R255 G255 B255",
	choices: ["White", "Black", "Light Gray", "Sarcoline"],
	correctAnswer: 0
},
{
	question: "<span>" + "4 of 6:" + "</span>" + "<br>" + "A S D F _ H J K L",
	choices: ["W", "B", "P", "G"],
	correctAnswer: 3
},
{
	question: "<span>" + "5 of 6:" + "</span>" + "<br>" + "In ____ ___________ born and raised, on the playground was where I spent most of my day",
	choices: ["North Carolina", "West Philadelphia", "Newfoundland and Labrador", "North Pole"],
	correctAnswer: 1
},
{
	question: "<span>" + "6 of 6:" + "</span>" + "<br>" + "What is the capital of California?",
	choices: ["Sacramento", "San Francisco", "Los Angeles", "San Jose"],
	correctAnswer: 0
}];

//start page with button and instructions
function quizStart() {
	$("#content").append("<p>" + "Game instructions go here" + "</p>");
	$("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-btn">' + "Start the Quiz!" + '</a>');
	
	//quiz start button
	$("#start-btn").on("click", function(event) {
		event.preventDefault();

		//show the first question
		firstQuestion();
		resetTimer();
	});
};

//add 30 seconds for each question
var timeRemaining = 30;
var countdown;

function timerStart() {
	countdown = setInterval(decrement, 1000);
};

function decrement() {
	timeRemaining--;
	$("#time-remaining").html(timeRemaining);

	if (timeRemaining === 0) {
		stopTimer();
		answersChosen.length = 0;		
		var userSelection = $("#responses input:radio[name=radioUserSelection]:checked").val();
		answersChosen.push(userSelection);
		nextQuestion();
	};
};


//function to call first question
function firstQuestion() {
	var startContent = $("#content");
	startContent.empty(); 
	displayQuestion();
};

//function to display the current question
function displayQuestion() {
	questionReset();
	resetTimer();
	$(".currentQuestion").html(questions[questionCounter].question);
	//radio options
	createRadios();
	//create answer submit button
	$("#submit-btn").append('<button type="submit" class="btn btn-primary btn-lg" id="submit">' + "Final Answer?" + '</button>');
	timerStart()
	answerSubmit();
};

//submit answer for each question
function answerSubmit() {
	$("#submit").on("click", function() {
		answersChosen.length = 0;
			
		//record user's answer to question
		var userSelection = $("#responses input:radio[name=radioUserSelection]:checked").val();
		answersChosen.push(userSelection);
		nextQuestion();
	});
};

//display if right or wrong answer was chosen
function checkAnswer() {
	questionReset();
	//correct answer chosen
	var correctAnswer = questions[questionCounter].correctAnswer;
	if (answersChosen[0] == questions[questionCounter].correctAnswer) {
		$("#content").append('<h3>'+"That's correct! Well done!" + '</h3>');
		correct++;
		displayTimer();
	}
	//no answer chosen/ran outta time
	else if (answersChosen[0] === undefined) {
		$("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		missed++;
		displayTimer();
	}
	//wrong answer chosen
	else {
		$("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		incorrect++;
		displayTimer();
	};
};

//function to change to the next question 
function nextQuestion() {
	checkAnswer();
	questionCounter++;
	//if all questions asked, reset to 0
	if (questionCounter === questions.length) {
		setTimeout(quizEnd, transitionTime);
	} 
	else {
		setTimeout(displayQuestion, transitionTime);
	};
};
	
//timer reset function for 30 seconds
function resetTimer() {
	timeRemaining = 30;
	$("#time-left").html(timeRemaining + " seconds");
};

function displayTimer() {
	$("#time-left").html("Answer Review");
};

//stop timer
function stopTimer() {
	clearInterval(countdown);
};

//function to create radio options
function createRadios() {
	var responseOptions = $("#responses");
	
	responseOptions.empty();
		
	for (var i = 0; i < questions[questionCounter].choices.length; i++) {
		responseOptions.append('<label><input type="radio" name="radioUserSelection" id="radio-id" value="' + [i] +'"><div>' + questions[questionCounter].choices[i] + '</div></input><br></label>');
	};
};

//reset game values
function resetQuiz() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	missed = 0;
	answersChosen = [];
	resetTimer();
};

//show results page
function quizEnd() {
	questionReset();
	$("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Questions missed: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
	//restart the quiz
	$("#restart-button").on("click", function(event) {
		event.preventDefault();
		//shows the first question
		resetQuiz();
		questionReset();
		quizStart();
	});
};

//clear the question
function questionReset() {
	var questionDiv = $(".currentQuestion");
	questionDiv.empty();

	var responsesDiv = $("#responses");
	responsesDiv.empty();

	var submitDiv = $("#submit-btn");
	submitDiv.empty();

	var contentDiv = $("#content");
	contentDiv.empty();

	stopTimer();
};

//displays the start page
quizStart();

});