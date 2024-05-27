var words = [];
var currentWord = '';
var displayWord = '';
var wordToGuess = '';
var wordByLetters = ''
var failText = '';
var usedLetters = [];
var chancesCount = 0;
var selectedLevel =3;
var file;
var validLinesFromFile;
//disable enable buttons
document.getElementById("guessLetter").disabled=true;
document.getElementById("guessWord").disabled=true;
document.getElementById("newGame").disabled=true;
document.getElementById("giveUpBtn").disabled=true;
document.getElementById("guessInput").disabled=true;
document.getElementById("fileInput").disabled=false;
document.getElementById("hideInstructionsBtn").hidden=false;
document.getElementById("unhideInstructionsBtn").hidden=true;
document.getElementById("instructionDiv").hidden=false;
document.getElementById("fileTest").innerHTML = "";

//clear chances select
document.getElementById("gameLevel").selectedIndex = -1;

document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
	file = this.files[0];
	if (validateFile(file)){;
		var reader = new FileReader();
		reader.onload = function fileReadCompleted() {
			words = reader.result.split('\n');
			validLinesFromFile = getOnlyValidLines(words);
			if (validLinesFromFile.length>0){
				document.getElementById("fileTest").innerHTML = '';
				chooseWord(validLinesFromFile);
				hideOrShowElements();
			}else{
				// set info about wrong file 
				document.getElementById("fileTest").innerHTML = 'Wrong file,<br>upload a file that matches the pattern<b> "word in a foreign language"</b>;<b>"word in your language"</b>';
				//reset and enable choosing file
				document.getElementById("fileInput").value=null;
				document.getElementById("fileInput").disabled=false;
				//clear chosen level
				document.getElementById("gameLevel").selectedIndex = -1
				document.getElementById("gameLevel").disabled=true;
			};
	
		};
		document.getElementById("gameLevel").disabled=false;
		document.getElementById("fileTest").innerHTML = "";
		reader.readAsText(file);
	};
});


function validateWordPair(wordPair){
	// checks if line from file matches program requirements (word_1;word_2)
	let splittedWords = wordPair.split(";");
	let splittedWordsLen = splittedWords.length;
	if (splittedWordsLen==2){
		if (splittedWords[0].trim().length>0 && splittedWords[1].trim().length>0){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	};

};

function getOnlyValidLines(wordsFromFile){
	//select only valid lines from file and adds then to array
	let validLines = [];
	let words = "";
	for (let i=0; i<wordsFromFile.length; i++){
		words = wordsFromFile[i];
		if (validateWordPair(words)){
			validLines.push(words);
		};
	};
	return validLines;
};

function endGame(){
	//clear texts
	document.getElementById("wordDisplay").textContent="";
	document.getElementById("usedLetters").textContent="";
	document.getElementById("wordPolishHeader").textContent="";
	document.getElementById("wordPolish").textContent="";
	document.getElementById("chancesCounterLabel_1").textContent="";
	document.getElementById("chancesCounter").textContent="";
	document.getElementById("chancesCounterLabel_2").textContent="";
	document.getElementById("test").textContent="";
	document.getElementById("guessInput").value="";

	//hide unhide elements
	document.getElementById("wordDisplay").hidden = true;
	document.getElementById("wordPolishHeader").hidden = true;
	document.getElementById("wordPolish").hidden = true;
	document.getElementById("chancesCounterLabel_1").hidden = true;
	document.getElementById("chancesCounter").hidden = true;
	document.getElementById("chancesCounterLabel_2").hidden = true;
	document.getElementById("guessInputLabel").hidden = true;
	document.getElementById("guessInput").hidden = true;
			
	//disable enable buttons
	document.getElementById("fileInput").disabled=true;
	document.getElementById("gameLevel").disabled=true;
	document.getElementById("guessLetter").disabled=true;
	document.getElementById("guessWord").disabled=true;
	document.getElementById("giveUpBtn").disabled=true;
	document.getElementById("guessInput").disabled=true;
	document.getElementById("newGame").disabled=false;
};

function validateFile(file){
	var fileName = file.name
	var fileExtension = fileName.split(".").pop();
	if (fileExtension != "txt"){
		// set info about wrong file type
		document.getElementById("fileTest").innerHTML = '<b>Wrong file format,<br>please select a different file with ".txt" extension.</b>';
		//reset and enable choosing file
		document.getElementById("fileInput").value=null;
		document.getElementById("fileInput").disabled=false;
		//clear chosen level
		document.getElementById("gameLevel").selectedIndex = -1
		document.getElementById("gameLevel").disabled=true;
		return false
	}else{
		document.getElementById("fileInput").disabled=true;
		return true;
	};
	
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hideInstructions(){
	document.getElementById("instructionDiv").hidden=true;
	document.getElementById("hideInstructionsBtn").hidden=true;
	document.getElementById("unhideInstructionsBtn").hidden=false;
};

function unhideInstructions(){
	document.getElementById("instructionDiv").hidden=false;
	document.getElementById("hideInstructionsBtn").hidden=false;
	document.getElementById("unhideInstructionsBtn").hidden=true;
};

function hideOrShowElements(){
	
	if(
		(document.getElementById("gameLevel").selectedIndex == -1) ||
		(document.getElementById("fileInput").disabled==false) 
		//|| (chancesCount==0)
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
	
	}
	else if(
		(document.getElementById("gameLevel").selectedIndex > -1) ||
		(document.getElementById("fileInput").disabled==true) 
		//|| (chancesCount==0)
	){
				//hide unhide elements
		document.getElementById("chancesCounterLabel_1").hidden =false;
		document.getElementById("chancesCounter").hidden = false;
		document.getElementById("chancesCounterLabel_2").hidden = false;
		
		document.getElementById("wordPolishHeader").hidden =  false;
		document.getElementById("wordPolish").hidden =  false;
		document.getElementById("wordDisplay").hidden =  false;
		document.getElementById("guessInputLabel").hidden =  false;
		document.getElementById("guessInput").hidden = false;
		
		//disable enable buttons
		document.getElementById("guessLetter").disabled= false;
		document.getElementById("guessWord").disabled= false;
		document.getElementById("newGame").disabled= false;
		document.getElementById("giveUpBtn").disabled= false;
		document.getElementById("guessInput").disabled= false;
	}
	else{
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
	//select chances form dropdown list
	let chancesCounter = document.getElementById('gameLevel').value;
	chancesCount = chancesCounter;
	selectedLevel = parseInt(chancesCounter);
	document.getElementById('gameLevel').disabled=true;
	
	//setting chances info text
	document.getElementById('chancesCounterLabel_1').textContent="You have ";
	document.getElementById('chancesCounter').textContent=chancesCount;
	document.getElementById('chancesCounterLabel_2').textContent=" chances left.";
	
	hideOrShowElements();
};


function chooseWord(validLines) {
	// selects one of valid lines 
    let randomWordPair = validLines[Math.floor(Math.random() * validLines.length)];
	// document.getElementById("wordTest").innerHTML =validLines + "<br><br>" + randomWordPair;
	wordPair =  randomWordPair.split(";");
	wordToGuess = wordPair[1].toLowerCase().trim();
    currentWord = wordPair[0].toLowerCase().trim();

	specialCharsList = [' ', ',']
	
	// setting the pattern for user to guess a word
	displayWord = ""
	for(let i=0; i < currentWord.length; i++){
	
	 	if(currentWord.charAt(i)==" "){
			displayWord = displayWord + " ";
	 	}else if(currentWord.charAt(i)=="'"){
			displayWord = displayWord + "'";
	 	}else if(currentWord.charAt(i)=="-"){
			displayWord = displayWord + "-";
	 	}else if(currentWord.charAt(i)==","){
			displayWord = displayWord + ",";
	 	}else{
			displayWord = displayWord + "●";
	 	};
	 };

	document.getElementById('wordPolishHeader').textContent = "Translate the word: ";
	document.getElementById('wordPolishHeader').style.fontWeight='bold';
	document.getElementById('wordPolish').textContent = wordToGuess;
	document.getElementById('wordDisplay').textContent = displayWord;
    usedLetters = [];
	document.getElementById('chancesCounter').textContent=chancesCount;
};

function guessLetter() {
    let userLetter = document.getElementById('guessInput').value;
	let letter = userLetter.toLowerCase().trim();
	document.getElementById("test").textContent="";
	document.getElementById('gameLevel').disabled=true;

	//letter not in the word to guess
	if (! currentWord.includes(letter) && !usedLetters.includes(letter) && letter.length==1){
		chancesCount -=1;
		document.getElementById('chancesCounter').textContent=chancesCount;
	};

	if (usedLetters.includes(letter)){
		//check if letter has been already used
		document.getElementById("test").innerHTML = "Letter <b>" + letter + "</b> has already been used.";
		document.getElementById("guessInput").value = "";
	};

	if (chancesCount>0){
		if (letter.length===1){
			if (!usedLetters.includes(letter)) {
				usedLetters.push(letter);
				document.getElementById('usedLetters').textContent = 'Used letters: ' + usedLetters.join(', ');

				// replacing with guessed letter in the guess pattern
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
				document.getElementById("guessInput").value = "";

				//move focus to text field
				document.getElementById("guessInput").focus();

				//check if all letters has been guessed
				wordByLetters = document.getElementById("wordDisplay").textContent;
				if (wordByLetters === currentWord){
					checkWin();
				};

			}else{
				document.getElementById("guessInput").value = ""
			};
		}else{
			document.getElementById("test").textContent="Type a letter";
			document.getElementById("guessInput").value = "";

			//move focus to text field
			document.getElementById("guessInput").focus();
		};
	}else{
		//all chances lost
		document.getElementById("guessInput").value="";
		document.getElementById('resultFail').innerHTML = "Game over!<br>You've lost your last chance!<br><br>" 
			+ 'The correct answer for <b>'
			+ wordToGuess
			+ '</b> is <b>' 
			+ currentWord + '</b>.';
		
		endGame();
	};
	
}

function guessWord() {
    let userWord = document.getElementById('guessInput').value;
	let word = userWord.toLowerCase().trim();
	document.getElementById("test").textContent=""
	if (word.length > 0){
		if (word === currentWord) {
			displayWord = currentWord;
			document.getElementById('wordDisplay').textContent = displayWord;
			document.getElementById("guessInput").value = "";
			checkWin();
		}else{
			//document.getElementById("guessInput").value = "";
			checkWin();
		};
	}else{
		document.getElementById("test").textContent="Type a word";
		//move focus to text field
		document.getElementById("guessInput").focus();
	};
};

function giveUp(){

	chancesCount=0;
	document.getElementById('giveUp').innerHTML = 'The correct answer for <b>'
													+ wordToGuess +'</b> is <b>'+ currentWord +"</b>.";

	//set new index
	newIndex = setIndexByLevel(selectedLevel);
	document.getElementById("gameLevel").selectedIndex = newIndex;
	chancesCount= document.getElementById("gameLevel").value;

	endGame();
	chancesCount= document.getElementById("gameLevel").disabled=true;
};

function checkWin() {
    if (displayWord === currentWord) {
		correctAnswer = capitalizeFirstLetter(displayWord);
        document.getElementById('resultWin').innerHTML = "Congratulations!<br>You've guessed the word!<br><b>"
			+ correctAnswer
			+ '</b> is the correct answer for <b>' + wordToGuess +'</b>.';
    }else{
        document.getElementById('resultFail').innerHTML = 'Game over!<br>The correct answer for <b>'
			+ wordToGuess
			+ '</b> is <b>' 
			+ currentWord + '</b>.';
			
    };
	endGame();
	// document.getElementById("gameLevel").disabled=true;
};


function setIndexByLevel(level){
	if (level == 3){
		index = 0;
	}else if (level == 5){
		index = 1;
	}else if (level == 10){
		index = 2;
	}else{
		index = -1;
	};
	return index;
};


function newGame(){
	chancesCount=0;
	document.getElementById("guessInput").value="";
	document.getElementById('resultWin').textContent="";
	document.getElementById('resultFail').textContent="";
	document.getElementById('giveUp').textContent="";

	chooseWord(validLinesFromFile);
	selectChances();
	
	
	//hide unhide elements
	document.getElementById("wordPolishHeader").hidden = false;
	document.getElementById("wordPolish").hidden = false;
	document.getElementById("wordDisplay").hidden = false;
	

	//new game level
	newIndex = setIndexByLevel(selectedLevel);
	document.getElementById("gameLevel").selectedIndex = newIndex;
	chancesCount= document.getElementById("gameLevel").value;
	
	//disable enable buttons
	document.getElementById("guessLetter").disabled=false;
	document.getElementById("guessWord").disabled=false;
	document.getElementById("newGame").disabled=false;
	document.getElementById("giveUpBtn").disabled=false;
	document.getElementById("guessInput").disabled=false;
	document.getElementById('gameLevel').disabled=false;
	document.getElementById("fileInput").disabled=true;	
	document.getElementById("gameLevel").disabled=false;

	//move focus to text field
	document.getElementById("guessInput").focus();
};
