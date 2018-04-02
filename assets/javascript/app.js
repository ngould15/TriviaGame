$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on('click', '#reset', function () {
    game.reset();
})

var questions = [{
    question: "Which is the youngest American city?",
    answers: ["Killeen, TX", "Jacksonville, NC", "Paramount, CA", "Layton, UT"],
    correctAnswer: "Jacksonville, NC",
    image: "assets/images/ottawa.jpg"
}, {
    question: "At 4,160 miles, the Nile River is the longest river in the world. Which one is the next longest?",
    answers: ["Yangtze River", "Congo River", "Amazon River", "Hunang He"],
    correctAnswer: "Amazon River",
    image: "assets/images/ottawa.jpg"
}, {
    question: "What is the 10th most spoken language worldwide?",
    answers: ["German", "Bengali", "Russian", "Portuguese"],
    correctAnswer: "German",
    image: "assets/images/german.jpg"
}, {
    question: "What do Grenada and Costa Rica have in common?",
    answers: ["They have no army", "They sit on the equator", "Voted World's Best Place to live", "Countries with the least amount of crime"],
    correctAnswer: "They have no army",
    image: "assets/images/ottawa.jpg"
}, {
    question: "What is the name of Hong Kong's metro system?",
    answers: ["Metrorail", "RTA Rapid Transit", "Docklands Light Railway", "MTR"],
    correctAnswer: "MTR",
    image: "assets/images/ottawa.jpg"
}, {
    question: "Ouagadougou is the capital city of which African country?",
    answers: ["Chad", "Burkina Faso", "Eritrea", "Djibouti"],
    correctAnswer: "Burkina Faso",
    image: "assets/images/ottawa.jpg"
}, {
    question: "What is the most visited tourist attraction in the world?",
    answers: ["Times Square", "Disney World", "The Colosseum", "Eiffel Tower"],
    correctAnswer: "Times Square",
    image: "assets/images/ottawa.jpg"
}, {
    question: "How many Smithsonian museums and galleries are in Washington D.C.?",
    answers: ["10", "13", "17", "19"],
    correctAnswer: "17",
    image: "assets/images/ottawa.jpg"
}, {
    question: "Which major Canadian city has not hosted the Olympics?",
    answers: ["Montreal", "Toronto", "Calgary", "Vancouver"],
    correctAnswer: "Toronto",
    image: "assets/images/ottawa.jpg"
}, {
    question: "Finish the phrase with a well-known Italian city: All roads lead to ",
    answers: ["Naples", "Venice", "Rome", "Verona"],
    correctAnswer: "Rome",
    image: "assets/images/ottawa.jpg"
}];
//properties
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 10,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () { //methods
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeup();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2> TIMER REMAINING <span id='counter'>10</span> Seconds</h2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].
            question + '<h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.
                currentQuestion].answers[i] + '">' + questions[game.
                    currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 10;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeup: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of Time</h2>')
        $('#subwrapper').append('<h3> The Correct Answer Was : ' + questions[game.
            currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>All Done!</h2>");
        $('#subwrapper').append("<h3>Correct:" + game.correct + "</h3");
        $('#subwrapper').append("<h3>incorrect:" + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered:" + game.unanswered + "</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].
            correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("You Got It");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You got it right!</h2>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("Wrong!!!")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>You got it wrong!</h2>');
        $('#subwrapper').append('<h3> The Correct Answer Was : ' + questions[game.
            currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }
}