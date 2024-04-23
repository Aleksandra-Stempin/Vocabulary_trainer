
let words = [];
let currentWord = '';
let displayWord = '';
let wordToGuess = '';
let wordByLetters = ''
let failText = ''
let usedLetters = [];
let chancesCount = 0
document.getElementById("guessLetter").disabled=true;
document.getElementById("guessWord").disabled=true;
document.getElementById("newGame").disabled=true;
document.getElementById("giveUpBtn").disabled=true;
document.getElementById("guessInput").disabled=true;

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

function selectChances(){
	chancesCount = document.getElementById('gameLevel').value;
	document.getElementById('chancesCounterLabel_1').textContent="You have ";
	document.getElementById('chancesCounter').textContent=chancesCount;
	document.getElementById('chancesCounterLabel_2').textContent=" chances left.";
	chancesCount = document.getElementById('gameLevel').disabled=true;
}


function chooseWord() {
	document.getElementById("test").textContent=""
    let wordPair = words[Math.floor(Math.random() * words.length)];
	wordToGuess = wordPair[1].toLowerCase().trim();
    currentWord = wordPair[0].toLowerCase().trim();
    displayWord = '-'.repeat(currentWord.length);
	document.getElementById('wordPolishHeader').textContent = "Translate the word: "
	document.getElementById('wordPolishHeader').style.fontWeight='bold'
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
	document.getElementById("guessInput").disabled=false;
	
	document.getElementById("fileInput").disabled=true;
	document.getElementById('gameLevel').disabled=false;
}

function guessLetter() {
    let userLetter = document.getElementById('guessInput').value;
	let letter = userLetter.toLowerCase().trim();
	document.getElementById("test").textContent=""
	if (letter.length===1){
		if (!usedLetters.includes(letter)) {
			usedLetters.push(letter);
			document.getElementById('usedLetters').textContent = 'Used letters: ' + usedLetters.join(', ');
			let newDisplayWord = '';
			for (let i = 0; i < currentWord.length; i++) {
				if (currentWord[i] === letter) {
					newDisplayWord += letter;
				} else {
					newDisplayWord += displayWord[i];
					chancesCount = chancesCount-1;
					document.getElementById('chancesCounter').textContent=chancesCount;

				}
			}
			displayWord = newDisplayWord;
			document.getElementById('wordDisplay').textContent = displayWord;
			document.getElementById("guessInput").value = ""
			wordByLetters = document.getElementById("wordDisplay").textContent
			if (wordByLetters === currentWord){
				checkWin()
			}
		}else{
			document.getElementById("guessInput").value = ""
		}
	}else{
		document.getElementById("test").textContent="Type a letter"
		document.getElementById("guessInput").value = ""
	}
	
}

function guessWord() {
    let userWord = document.getElementById('guessInput').value;
	let word = userWord.toLowerCase().trim();
	document.getElementById("test").textContent=""
	if (word.length > 0){
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
	else{
		document.getElementById("test").textContent="Type a word"
	}
}

function giveUp(){
	document.getElementById("test").textContent=""
	document.getElementById('giveUp').textContent = 'The correct answer is '+ currentWord;
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("newGame").disabled=false;
	document.getElementById("giveUpBtn").disabled=true;
	document.getElementById("fileInput").disabled=false;
	document.getElementById("guessInput").disabled=true;
	document.getElementById("wordDisplay").textContent=""
	document.getElementById("usedLetters").textContent=""
	document.getElementById('gameLevel').disabled=false;
	
}

function checkWin() {
    if (displayWord === currentWord) {
        document.getElementById('resultWin').textContent = 'Congratulations! You guessed the word! ' + displayWord + ' is the correct answer.';
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
	document.getElementById("guessInput").disabled=true;
	document.getElementById('gameLevel').disabled=false;
}
