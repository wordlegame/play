
const NUMBER_OF_GUESSES = 6;
let guessesRemaining;
let currentGuess;
let currentLetter;

let wordAnswersArray = [];
let wordGuessesArray = [];
let correctWord;

const urlParams = new URLSearchParams(window.location.search);
const gamemode = urlParams.get('selectedOption');

const run = () => {
    const NUMBER_OF_GUESSES = 6;
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    currentLetter = 0;
    document.getElementById("modes");
    loadAllowedGuesses("../Wordle Text Files/" + gamemode + "guesses.txt");
    loadCorrectWord("../Wordle Text Files/" + gamemode + "answers.txt");
}

run();

function loadCorrectWord(fileURL) {
    fetch(fileURL).then(response => response.text()).then(fileContents => { //gets the contents of the file
        wordAnswersArray = fileContents.split('\n'); //creates an array from the specified text file
        for(let i = 0; i < wordAnswersArray.length; i++) {
            wordAnswersArray[i] = wordAnswersArray[i].substring(0, 5);
        }
        correctWord = wordAnswersArray[Math.floor(Math.random()*wordAnswersArray.length)]; //sets the correct word to a ranodm array element
    }).catch(error => {
        console.error('Error reading the file:', error);
    });
}

function loadAllowedGuesses(fileURL) {
    fetch(fileURL).then(response => response.text()).then(fileContents => { //gets the contents of the file
        wordGuessesArray = fileContents.split('\n'); //creates an array from the specified text file
        for(let i = 0; i < wordGuessesArray.length; i++) {
            wordGuessesArray[i] = wordGuessesArray[i].substring(0, 5);
        }
        //correctWord = wordArray[Math.floor(Math.random()*wordArray.length)]; //sets the correct word to a ranodm array element
    }).catch(error => {
        console.error('Error reading the file:', error);
    });
}

document.addEventListener("keydown", (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = String(e.key);
    if(pressedKey === "Backspace" && currentLetter > 0) {
        removeLetter();
    } else if(pressedKey === "Enter") {
        if(currentLetter === 5) {
            submitWord();
        } else {

        }
    } else if(isLetter(pressedKey) && currentLetter < 5) {
        addLetter(pressedKey);
    } else {
        
    }
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function addLetter(pressedKey) {
    let currentRow = 6 - guessesRemaining;
    let gridLetter = "" + currentRow + (currentLetter + 1);
    document.getElementById(gridLetter).innerHTML = pressedKey.toLocaleUpperCase();
    currentLetter++;
    currentGuess.push(pressedKey.toLocaleLowerCase());
}

function removeLetter() {
    let currentRow = 6 - guessesRemaining;
    let gridLetter = "" + currentRow + (currentLetter);
    document.getElementById(gridLetter).innerHTML = "";
    currentLetter--;
    currentGuess.pop();
}

function submitWord() {
    let guess = "";
    for(let i = 0; i < currentGuess.length; i++) {
        guess += currentGuess[i];
    }
    if(verifyWord(guess)) {//check that the word is on the word list
        if(checkAnswer(guess)) { //check if the word is the correct word
            setTimeout(() => alert("You Win!"), 3000);
        }
    
        let colorArray = checkLetters(guess);//check which letters are correct and which aren't
        colorLetters(colorArray);
    
    
        guessesRemaining--;
        currentLetter = 0;
        currentGuess = [];
        if(guessesRemaining === 0) {
            setTimeout(() => alert("You did not guess the correct word in 6 tries."), 2500);
        }
    } else {
        alert("Please enter a valid word");
        currentLetter = 0;
        currentGuess = [];
        let currentRow = 6 - guessesRemaining;
        for(let i = 1; i < 6; i++) {
            document.getElementById("" + currentRow + i).innerHTML = "";
        }
    }
}

function checkAnswer(guess) {
    return guess === correctWord;
}

function verifyWord(guess) {
    return wordGuessesArray.includes(guess);
}

function checkLetters(guess) {
    let colorArray = ["gray", "gray", "gray", "gray", "gray"];
    let guessCharacters = [];
    let correctWordCharacters = [];
    guessCharacters = guess.split('');
    correctWordCharacters = correctWord.split('');
    let letterTaken = [false, false, false, false, false];

    for(let i = 0; i < 5; i++) {
        if(guessCharacters[i] === correctWordCharacters[i]) {
            colorArray[i] = "green";
            letterTaken[i] = true;
        }
    }

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            if(guessCharacters[i] === correctWordCharacters[j] && !letterTaken[j] && colorArray[i] === "gray") {
                colorArray[i] = "yellow";
                letterTaken[j] = true;
            }
        }
    }
    return colorArray;
}

function colorLetters(colorArray) {
    let currentRow = 6 - guessesRemaining;
    setTimeout(() => document.getElementById(currentRow + "1").classList.add(colorArray[0]), 0);
    setTimeout(() => document.getElementById(currentRow + "2").classList.add(colorArray[1]), 500);
    setTimeout(() => document.getElementById(currentRow + "3").classList.add(colorArray[2]), 1000);
    setTimeout(() => document.getElementById(currentRow + "4").classList.add(colorArray[3]), 1500);
    setTimeout(() => document.getElementById(currentRow + "5").classList.add(colorArray[4]), 2000);
}