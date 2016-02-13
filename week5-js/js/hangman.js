$(document).ready(function(){ // Wait for the page to be ready

  var guessLetters = $('#guesses'); // The container that holds letters to select
  var newGame = $('#new_game'); // new game button. This starts the game
  var turnSetting = $('#turns_settings'); // input field to adjust number of guesses (turns)
  var turnElement = $('#turns'); // visual display to show how many turns are left
  var letters = $('#letters'); // container that holds the letter panels of the actual word to guess
  var turn_count; // number of turns remaining (variable placeholder)

  // An array of words to choose a random one for someone to guess.
  // Obviously more words makes for a better game (we can worry about that later).
  var words = ["hangman", "boo", "happy", "sad", "tgif", "friday", "beer"];

  // Register a DOM listener for `click` on the "newGame" button.
  newGame.on('click', function(){
     turn_count = parseInt(turnSetting.val()); // grab value for turns. `parseInt` converts to Integer.
     turnElement.html(turn_count); // update display for player of turns

     // Reset the game board
     guessLetters.empty(); // empty any previous guess tiles.
     letters.empty(); // empty the previous word letter tiles.

     generateGuesses(); // This creates the guess tiles.


     var word = getRandomWord(); // pick a random word
     displayWordSpaces(word); // generate the letter tiles for the word.

  });

  // Register a DOM listener for `click` on the "guessLetters" container.
  // remember bubbling? This selector listens for children elements that were
  // clicked that have the class `.letter`
  guessLetters.on('click', '.letter', function(){
      var element = $(this); // get the actual element that was clicked.

      if(turn_count === 0) { // check to see if there are any remaining turns.
          // Display Letters
          // addClass('missed')
          return
      }

      if(element.hasClass('selected')){ // has the guess letter already been selected?
          return // abort
      }

      element.addClass('selected'); // make sure this letter element is marked 'selected'

      var selectedLetter = element.data('letter'); // get the value of the data attribute
      var notFound = true; // set a `notFound` flag

      letters.find('.letter').each(function(){ // find all current word letters and loop over them.
          var aLetter = $(this); // the current word letter element in the loop.

         if( aLetter.data('letter') === selectedLetter ) { // check data attribute matches
             aLetter.html(selectedLetter); // if so display
             notFound = false; // we found one so make this false.
         }
      });

      if(notFound){
         turnElement.html(--turn_count); // update turn_count and display if there are no matched.
      }

  });


  function getRandomWord(){
      var index = Math.floor(Math.random() * words.length); // get a random index in the words array.
      return words[index]; // return the random word.
  }


  function displayWordSpaces(word){
      for(var i = 0; i < word.length; i++) { // make a tile for each letter in the word to guess.
          var element = $('<span />'); // create a span element
          element.addClass('letter'); // add a `letter` class
          element.data('letter', word[i]); // add a data attribute `letter` with the letter value.
          element.html('&nbsp;'); // add a blank space inside the html tag
          element.appendTo(letters); // add it to the page inside the `letters` container.
      }
  }

  function generateGuesses(){
      for(var i=97; i <= 122; i++){ // character code range for lowercase letters.
        var letter = String.fromCharCode(i); // convert code to a letter
        $('<span data-letter="'+letter+'">'+ letter + '</span>') // create a DOM element with val
          .addClass('letter') // notice the chaining to the previous line (one statement) add a class.
          .appendTo('#guesses'); // still chaining. add it to the page inside the `guesses` container.
      }
  }

});
