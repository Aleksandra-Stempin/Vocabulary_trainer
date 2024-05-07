
let words = [];
let currentWord = '';
let displayWord = '';
let wordToGuess = '';
let wordByLetters = ''
let failText = ''
let usedLetters = [];
let chancesCount = 0;
//disable enable buttons
document.getElementById("guessLetter").disabled=true;
document.getElementById("guessWord").disabled=true;
document.getElementById("newGame").disabled=true;
document.getElementById("giveUpBtn").disabled=true;
document.getElementById("guessInput").disabled=true;
document.getElementById("fileInput").disabled=false;

//clear chances select
document.getElementById("gameLevel").selectedIndex = -1;

document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        words = reader.result.split('\n').map(line => line.split('-'));
        
		
		chooseWord();
		hideOrShowElements();
    };
    reader.readAsText(file);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hideOrShowElements(){
	
	
	if((
		document.getElementById("gameLevel").selectedIndex == -1)
		||(document.getElementById("fileInput").disabled==false)
		||(chancesCount==0)
	){
		//hide unhide elements
		document.getElementById("chancesCounterLabel_1").hidden = true;
		document.getElementById("chancesCounter").hidden = true;
		document.getElementById("chancesCounterLabel_2").hidden = true;
		document.getElementById("wordPolishHeader").hidden = true;
		document.getElementById("wordPolish").hidden = true;
		document.getElementById("wordDisplay").hidden = true;
		document.getElementById("guessInputLabel").hidden = true;
		document.getElementById("guessInput").hidden = true;
		
		//disable enable buttons
		document.getElementById("guessLetter").disabled=true;
		document.getElementById("guessWord").disabled=true;
		document.getElementById("newGame").disabled=true;
		document.getElementById("giveUpBtn").disabled=true;
		document.getElementById("guessInput").disabled=true;
	
	}else{
		//hide unhide elements
		document.getElementById("chancesCounterLabel_1").hidden = false;
		document.getElementById("chancesCounter").hidden = false;
		document.getElementById("chancesCounterLabel_2").hidden = false;
		document.getElementById("wordPolishHeader").hidden = false;
		document.getElementById("wordPolish").hidden = false;
		document.getElementById("wordDisplay").hidden = false;
		document.getElementById("guessInputLabel").hidden = false;
		document.getElementById("guessInput").hidden = false;
		
		//disable enable buttons
		document.getElementById("guessLetter").disabled=false;
		document.getElementById("guessWord").disabled=false;
		document.getElementById("newGame").disabled=false;
		document.getElementById("giveUpBtn").disabled=false;
		document.getElementById("guessInput").disabled=false;
	}
	

}
hideOrShowElements();

function selectChances(){
	let chancesCounter = document.getElementById('gameLevel').value;
	chancesCount = chancesCounter
	
	document.getElementById('chancesCounterLabel_1').textContent="You have ";
	document.getElementById('chancesCounter').textContent=chancesCount;
	document.getElementById('chancesCounterLabel_2').textContent=" chances left.";

	document.getElementById('resultFail').textContent = "";
	document.getElementById('resultWin').textContent = "";
	document.getElementById("guessInput").textContent="";

	document.getElementById('gameLevel').disabled=true;
	hideOrShowElements();

}


function chooseWord() {
	document.getElementById("test").textContent=""
    let wordPair = words[Math.floor(Math.random() * words.length)];
	wordToGuess = wordPair[1].toLowerCase().trim();
    currentWord = wordPair[0].toLowerCase().trim();
	hideOrShowElements()
	
	specialCharsList = [' ', ',']
	
	displayWord = ""
	for(let i=0; i < currentWord.length; i++){
		
		
	 	if(currentWord.charAt(i)==" "){
			displayWord = displayWord + " ";
	 	}
		else if(currentWord.charAt(i)=="'"){
			displayWord = displayWord + "'";
	 	}
		else if(currentWord.charAt(i)==","){
			displayWord = displayWord + ",";
	 	}
		else{
			displayWord = displayWord + "-";
	 	}
	 }

	document.getElementById('wordPolishHeader').textContent = "Translate the word: "
	document.getElementById('wordPolishHeader').style.fontWeight='bold'
	document.getElementById('wordPolish').textContent = wordToGuess;
	document.getElementById('wordDisplay').textContent = displayWord;
    usedLetters = [];
	
    document.getElementById('usedLetters').textContent = '';
	document.getElementById('resultWin').textContent = '';
	document.getElementById('resultFail').textContent = '';
	document.getElementById('giveUp').textContent = '';
	
	document.getElementById('chancesCounterLabel_1').textContent="You have ";
	document.getElementById('chancesCounter').textContent=chancesCount;
	document.getElementById('chancesCounterLabel_2').textContent=" chances left.";
	

	
	document.getElementById("fileInput").disabled=true;

	

}

function guessLetter() {
    let userLetter = document.getElementById('guessInput').value;
	let letter = userLetter.toLowerCase().trim();
	document.getElementById("test").textContent=""
	document.getElementById('gameLevel').disabled=true;
	if (! currentWord.includes(letter) && !usedLetters.includes(letter) ){
		chancesCount -=1;
		document.getElementById('chancesCounter').textContent=chancesCount;
	}
	if (chancesCount>0){
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
	}else{
		document.getElementById("guessInput").value="";
		document.getElementById('resultFail').innerHTML = 'Game over<br>, you lost your last chance!<br><br>' 
		+ 'The correct answer for '
		+ wordToGuess
		+ ' is: ' 
		+ currentWord + '.';
		
		
		//clear texts
		document.getElementById("wordDisplay").textContent="";
		document.getElementById("usedLetters").textContent="";
		document.getElementById("guessInput").value="";
		
		
		document.getElementById("test").textContent=""
		document.getElementById('chancesCounterLabel_1').textContent="";
		document.getElementById('chancesCounter').textContent="";
		document.getElementById('chancesCounterLabel_2').textContent="";

		//disable enable buttons
		document.getElementById("guessLetter").disabled=true;
		document.getElementById("guessWord").disabled=true;
		document.getElementById("giveUpBtn").disabled=true;
		document.getElementById("fileInput").disabled=false;
		document.getElementById("guessInput").disabled=true;
		document.getElementById('gameLevel').disabled=false;
		
		//clear chances select
		document.getElementById("gameLevel").selectedIndex = -1;
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
	chancesCount=0;
	
	//clear texts
	document.getElementById("test").textContent="";
	document.getElementById('resultWin').textContent = "";
	document.getElementById('resultFail').textContent = "";
	document.getElementById('chancesCounterLabel_1').textContent="";
	document.getElementById('chancesCounter').textContent="";
	document.getElementById('chancesCounterLabel_2').textContent="";
	document.getElementById("guessInput").value="";
	
	//clear chances select
	document.getElementById("gameLevel").selectedIndex = -1;
	
	document.getElementById('giveUp').textContent = 'The correct answer for '+ wordToGuess +' is '+ currentWord +".";
	hideOrShowElements();
	document.getElementById("newGame").disabled=false;
	
}

function checkWin() {
    if (displayWord === currentWord) {
		correctAnswer = capitalizeFirstLetter(displayWord);
        document.getElementById('resultWin').innerHTML = "Congratulations!<br>You've guessed the word!<br>"
		+ correctAnswer
		+ ' is the correct answer for ' + wordToGuess +'.';
    }
	else{
        document.getElementById('resultFail').innerHTML = 'Game over!<br>The correct answer for '
		+ wordToGuess
		+ ' is ' 
		+ currentWord + '.';
		
    }
	
	//clear texts
	document.getElementById("wordDisplay").textContent="";
	document.getElementById("usedLetters").textContent="";
	document.getElementById("chancesCounterLabel_1").textContent="";
	document.getElementById("chancesCounter").textContent="";
	document.getElementById("chancesCounterLabel_2").textContent="";
	document.getElementById("test").textContent="";
	document.getElementById("guessInput").value="";
	
	//clear chances select
	document.getElementById("gameLevel").selectedIndex = -1;
	
	//disable enable buttons
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("giveUpBtn").disabled=true;
	document.getElementById("guessInput").disabled=true;
	document.getElementById("gameLevel").disabled=true;
	
	//hide unhide elements
	document.getElementById("guessInputLabel").hidden = true;
	document.getElementById("guessInput").hidden = true;
	
}

function newGame(){
	chancesCount=0;
	document.getElementById("guessInput").value="";
	chooseWord();
	selectChances();
	
	document.getElementById('gameLevel').disabled=false;
	document.getElementById("guessInput").disabled=false;
	
	//hide unhide elements
	document.getElementById("wordPolishHeader").hidden = true;
	document.getElementById("wordPolish").hidden = true;
	document.getElementById("wordDisplay").hidden = true;
	
	
	
	//clear chances select
	document.getElementById("gameLevel").selectedIndex = -1;
	
	//disable enable buttons
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("newGame").disabled=false;
	document.getElementById("giveUpBtn").disabled=true;
	document.getElementById("guessInput").disabled=true;
	document.getElementById('gameLevel').disabled=false;
	//document.getElementById("guessInput").disabled=false;
		
	
	document.getElementById("gameLevel").disabled=false;
	hideOrShowElements();
}
