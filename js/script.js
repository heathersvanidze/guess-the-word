//unordered list where the player’s guessed letters will appear.
let guessedLetters = document.querySelector(".guessed-letters");
//button with the text “Guess!” in it.
let guess = document.querySelector(".guess");
//text input where the player will guess a letter.
let textInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear.
let wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display.
let remainingText = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display.
let remainingGuesses = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
let message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
let playAgainButton = document.querySelector(".play-again-hide");

let word = "magnolia";


const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guess.addEventListener("click", function(e){
    e.preventDefault();
    const inputValue = textInput.value;
    console.log(inputValue);
    textInput.value = "";
});