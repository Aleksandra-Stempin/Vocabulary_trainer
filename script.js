let words = [];
let currentWord = '';
let displayWord = '';
let wordToGuess = '';
let wordByLetters = ''
let failText = ''
let usedLetters = [];
document.getElementById("guessLetter").disabled=true;
document.getElementById("guessWord").disabled=true;
document.getElementById("newGame").disabled=true;
document.getElementById("giveUpBtn").disabled=true;
document.getElementById("fileInput").disabled=false;

document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        words = reader.result.split('\n').map(line => line.split('-'));
        
		
		chooseWord();
    };
    reader.readAsText(file);
});

function chooseWord() {
    let wordPair = words[Math.floor(Math.random() * words.length)];
	wordToGuess = wordPair[1].toLowerCase().trim();
    currentWord = wordPair[0].toLowerCase().trim();
    displayWord = '-'.repeat(currentWord.length);
	document.getElementById('wordPolishHeader').textContent = "Word to translate"
	document.getElementById('wordPolish').textContent = wordToGuess;
	document.getElementById('wordDisplay').textContent = displayWord;
    usedLetters = [];
	
    document.getElementById('usedLetters').textContent = '';
	document.getElementById('resultWin').textContent = '';
	document.getElementById('resultFail').textContent = '';
	document.getElementById('giveUp').textContent = '';
	
	
	document.getElementById("guessLetter").disabled=false;
	document.getElementById("guessWord").disabled=false;
	document.getElementById("newGame").disabled=false;
	document.getElementById("giveUpBtn").disabled=false;
	
	document.getElementById("fileInput").disabled=true;
}

function guessLetter() {
    let userLetter = document.getElementById('guessInput').value;
	let letter = userLetter.toLowerCase().trim();
    if (!usedLetters.includes(letter)) {
        usedLetters.push(letter);
        document.getElementById('usedLetters').textContent = 'Used letters: ' + usedLetters.join(', ');
        let newDisplayWord = '';
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                newDisplayWord += letter;
            } else {
                newDisplayWord += displayWord[i];
            }
        }
        displayWord = newDisplayWord;
        document.getElementById('wordDisplay').textContent = displayWord;
		document.getElementById("guessInput").value = ""
		wordByLetters = document.getElementById("wordDisplay").textContent
		if (wordByLetters === currentWord){
			checkWin()
		}

    }
}

function guessWord() {
    let userWord = document.getElementById('guessInput').value;
	let word = userWord.toLowerCase().trim();
    if (word === currentWord) {
        displayWord = currentWord;
        document.getElementById('wordDisplay').textContent = displayWord;
		document.getElementById("guessInput").value = ""
        checkWin();
    }
	else{
		document.getElementById("guessInput").value = ""
        checkWin();
	}
}

function giveUp(){
	document.getElementById('giveUp').textContent = 'The correct answer is '+ wordToGuess;
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("newGame").disabled=false;
	document.getElementById("giveUpBtn").disabled=true;
}

function checkWin() {
    if (displayWord === currentWord) {
        document.getElementById('resultWin').textContent = 'Congratulations! You guessed the word! ' + wordToGuess + ' is the correct answer.';
    }
	else{
        document.getElementById('resultFail').textContent = 'Game over! The correct answer is: ' + currentWord;
		
    }
	document.getElementById("wordDisplay").textContent=""
	document.getElementById("usedLetters").textContent=""
	
	document.getElementById("test").textContent=""
	
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("giveUpBtn").disabled=true;
	document.getElementById("fileInput").disabled=false;
}
