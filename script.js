:root {
	--header-font-color: #002080;
	--background-color:#b3c6ff;
	--button-color:#F7F7D4;
	--button-focus-color:#f5f517f6;;
	--button-font-color:#FE2712;
	--disabled-button-color:#f5f5f5;
	--disabled-button-font-color:#fae6e2;
	--win-font-color:#008000;
	--fail-font-color:#e60000;
	--guessInputColor:#dfe7ff;
	--guessInputFocusColor:#88a2f7;
	--semiBoldFontWeight:530;
}

body{
	background-color: var(--background-color);
	font-size:20px;
	font-family:Helvetica;
}

h1{
	text-align: center;
	color: var(--header-font-color)
}

div{
	margin-top: 10px;
	margin-bottom: 10px;
}

#instructionHeader{
	text-transform:uppercase;
}

#mainDiv{
	margin-left:25%;
	margin-right:25%;
}

#wordDisplay{
	font-size:200%;
}

#textDiv{
	text-align: center;
}

#guessDiv{
	text-align: center;
	width:100%;
}

#guesButtonsDiv{
	width:100%;
}

#resultWin{
	color:var(--win-font-color);
	font-weight:var(--semiBoldFontWeight);
	font-size:25px;
}

#resultFail{
	color:var(--fail-font-color);
	font-weight:var(--semiBoldFontWeight);
	font-size:25px;
}

#giveUp{
	font-size:25px;
}

#guessInput{
	background-color:var(--guessInputColor);
	font-weight:bold;
	font-size:15px;
}

#guessLetter{
	width:30%;
	height:100%;
	margin-right:5px;
	
}

#guessWord{
	width:30%;
	height:100%;
	margin-left:5px;
	margin-right:5px;
}

#giveUpBtn{
	width:30%;
	height:100%;
	margin-left:5px;
}

#newGameDiv{
	width:100%;
	text-align: center;
}

	
#newGame{
	width:90%;
	height:100%;
	margin-left:10px;
	margin-right:10px;
}

.myButton{
	background-color:var(--button-color);
	color: var(--button-font-color);
	font-weight:bold;
	font-size:20px;
	margin-bottom:10px;
	border-radius: 10px;
	border:none;
}



button:hover{
	cursor:pointer;
	background-color:var(--button-focus-color);
}

button:focus{
	cursor:pointer;
	background-color:var(--button-focus-color);
}

select:hover{
	cursor:pointer;
}

#fileInput:hover{
	cursor:pointer;
}

#guessInput:hover{
	background-color:var(--guessInputFocusColor);
}

#guessInput:focus{
	background-color:var(--guessInputFocusColor);
}

button:disabled{
	opacity: 0.3;
	cursor:default;
}

select:disabled{
	cursor:default;
}
