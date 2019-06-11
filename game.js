var buttonColors = ["red", "blue", "green", "yellow"];
var buttonAudio = {
  red: new Audio("sounds/red.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  green: new Audio("sounds/green.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var originalHeader = $("h1").text();

function playSound(color) {
  buttonAudio[color].play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  var randomChosenButton = $("#" + randomChosenColor);
  userClickedPattern = [];
  $("h1").text("Level " + gamePattern.length);
  gamePattern.push(randomChosenColor);
  randomChosenButton.fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  for (i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  $("h1").text(originalHeader);
}

$(".btn").on("click", function() {
  if (gameStarted) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if (!checkAnswer()) {
      playSound("wrong");
      $("h1").text("Wrong answer!");
      setTimeout(resetGame, 5000);
    } else if (gamePattern.length == userClickedPattern.length) { // entire sequence correct
      $("h1").text("Correct!");
      setTimeout(nextSequence, 1000);
    } else {
      $("h1").text("And then?" + "?".repeat((userClickedPattern.length + 2)% 3));
    }
  }
});

$(document).on("keydown", function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

/*
  check that the index of the user's click matches
    the index of the game gamePattern
  if true and next index exists, do nothing
  else, nextSequence()
*/
