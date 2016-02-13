$(document).ready(function(){

 var guessLetters = $('#guesses');
 var newGame = $('#new_game');
 var turnSetting = $('#turns_settings');
 var turnElement = $("#turns");
 var letters = $('#letters');
 var turn_count;

 var words = ["hangman", "bo", "happy", "sad", "tgif", "friday", "beer"];

 newGame.on("click", function() {
    turn_count = parseInt(turnSetting.val()); // parseInt converts string to int.
    turnElement.html(turn_count);

    guessLetters.empty();
    letters.empty();

    generateGuesses(word);

    var word = getRandomWord();
    displayWordSpaces(word);

});

function getRandomWord() {
   var index = Math.floor(Math.random() * words.length);
   return words[index];
}

 function displayWordSpaces(word){
     for(var i = 0; i < word.length; i++) {
         var element = $('<span />');
         element.addClass('letter');
         element.data("letter",word[i]);
         element.html('&nbsp;');
         element.appendTo(letters);
     }
 }

 guessLetters.on('click', '.letter', function(){
     var element = $(this);

     if(element.hasClass('selected') || turn_count <= 0){
         return
     }
     element.addClass('selected');

     var selectedLetter = element.data("letter");
     var notFound = true;

     letters.find(".letter").each(function() {
        var aLetter = $(this);

        if ( aLetter.data("letter") === selectedLetter ) {
           aLetter.html(selectedLetter);
           notFound = false;
        }
     });

     if(notFound) {
      //   updateTurn();
      turnElement.html(--turn_count);
     }


 });

 function updateTurn() {
    turn_count--;
    turnElement.html(turn_count);
}

function generateGuesses() {
 for(var i=97; i <= 122; i++){
   var letter = String.fromCharCode(i);
   $('<span data-letter="'+letter+'">'+ letter + '</span>')
     .addClass('letter')
     .appendTo('#guesses');
 }
}

});
