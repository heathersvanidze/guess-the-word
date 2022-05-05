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
const remainingGuessesElement = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again-hide");

//let word = wordArray[randomIndex].trim();
//Array to collect already-guessed letters
const guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function (){
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};


//Displays circle placeholders
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
wordInProgress.innerText = placeholderLetters.join("");
};
getWord();

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
    } else {guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        countRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
        };
    ;

};

const showGuessedLetters = function(){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {revealWord.push("●")}
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const countRemainingGuesses = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, no ${guess} in the word!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word does contain ${guess}!`;
        
    } 
    if (remainingGuesses === 0){
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerText = `${remainingGuesses} guess`;
    } else if (remainingGuesses > 1){
        remainingGuessesElement.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfWin = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};
//Stopped before "Add an async function"