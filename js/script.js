//unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display.
const remainingText = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again-hide");

const word = "magnolia";
//Array to collect already-guessed letters
const guessedLetters = [];
//Displays circle placeholders
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
//Empty message paragraph
    message.innerText = "";
//Grab what's entered in the input
    const guess = textInput.value;
//Make sure it's a single letter
    const goodGuess = validateInput(guess);
//Yay we have a letter!
    if (goodGuess) {
        makeGuess(guess);
    }

    textInput.value = "";

});

const validateInput = function(guess){
    const acceptedLetter = /[a-zA-Z]/;
    if (guess.length === 0) {
        //Checks if input is empty
        message.innerText = "Enter a letter!"
    } else if (guess.length > 1){
        //Checks that only one letter was entered
        message.innerText = "Only enter one letter at a time!"
    } else if (!guess.match(acceptedLetter)){
        //Checks that non-letter wasn't entered
        message.innerText = "Did you enter something that's not a letter?"
    } //Yay we got a single letter
        else {return guess};
};

//Function to change guessed letters to uppercase, check if the letter was already guessed (in the guessedLetters array) and otherwise pushes the letter to the guessedLetters array!!
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter!";
    } else {guessedLetters.push(guess)};
    console.log(guessedLetters);

}