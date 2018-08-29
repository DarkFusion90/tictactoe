var PLAYER1_NAME = "" , PLAYER2_NAME = "";
var turn = "player_two";
var victoryFlag = false;
var point1 = "", point2 = "", point3 = "";
var round_number = 1;
var table_row_counter = 0;
var player1_wins_counter = 0, player2_wins_counter = 0;

function registerPlayers(button_clicked){
  //hide the form after completion (clicked either skip or play button)
  document.getElementById("enter-names-dialog").style.display = "none";
  var player1_form  = document.getElementById("player1_name").value;
  var player2_form = document.getElementById("player2_name").value;
  if(button_clicked == "skip"){
    PLAYER1_NAME = "Player 1";
    PLAYER2_NAME = "Player 2";
  }
  else if(button_clicked == "play"){
    //in case the user clicks "play" without entering names, then player name(s) will be default (Player 1 and Player 2)
    if(player1_form == "" || player1_form.toString().trim().length == 0){   //second condition checks if string contains only whitespaces
      PLAYER1_NAME = "Player 1";
    }
    else{
      PLAYER1_NAME = player1_form;
      document.getElementById("player1-header").innerHTML = ""+player1_form;
    }
    //in case the user clicks "play" without entering names, then player name(s) will be default (Player 1 and Player 2)
    if(player2_form == "" || player2_form.toString().trim().length == 0){ //second condition checks if string contains only whitespaces
      PLAYER2_NAME = "Player 2";
    }
    else{
      PLAYER2_NAME = player2_form;
      document.getElementById("player2-header").innerHTML = ""+player2_form;
    }
  }
}

function whoseTurn() {
  return turn;
}

function switchTurns() {
  if (whoseTurn() == "player_one") {
    turn = "player_two";
  }
  else if (whoseTurn() == "player_two") {
    turn = "player_one";
  }
}

function print_Cross_or_Zero(_name) {
  switchTurns();
  var getTurn = whoseTurn();

  if (document.getElementById(_name).innerHTML === "") {  //to avoid overriding any (X or O) already present
    if (getTurn == "player_one") {
      document.getElementById(_name).innerHTML = "X";
    }
    else {
      document.getElementById(_name).innerHTML = "O";
    }
  }
  analyseGame(); //this function will check if  either of the players has won the game OR the game has ended with no victories
}

function analyseGame() {
  analyseVerticalVictory();    //a condition when a player wins by matching elements (X or O) through columns
  analyzeHorizontalVictory();  //a condition when a player wins by matching elements (X or O) through rows
  analyzeDiagonalVictory();    //a condition when a player wins by matching elements (X or O) diagonally
  if (analyseDeadEnd() == true && victoryFlag == false) {         //a condition where no one wins the game
    round_number++;
    updateRounds(turn, "draw");
  }
}

function analyseVerticalVictory() {
  //scenario 1: winning by matching the first column. id's= 1, 4 ,7
  point1 = document.getElementById("one").innerHTML.toString();
  point2 = document.getElementById("four").innerHTML.toString();
  point3 = document.getElementById("seven").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }
  //scenario 2: winning by matching the second column. id's= 2, 5 ,8
  point1 = document.getElementById("two").innerHTML.toString();
  point2 = document.getElementById("five").innerHTML.toString();
  point3 = document.getElementById("eight").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }
  //scenario 3: winning by matching the third column. id's= 3, 6 ,9
  point1 = document.getElementById("three").innerHTML.toString();
  point2 = document.getElementById("six").innerHTML.toString();
  point3 = document.getElementById("nine").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }
}

function analyzeHorizontalVictory() {
  var point1 = "", point2 = "", point3 = "";

  //scenario one: first row matches
  point1 = document.getElementById("one").innerHTML.toString();
  point2 = document.getElementById("two").innerHTML.toString();
  point3 = document.getElementById("three").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }

  //scenario two: second column matches
  point1 = document.getElementById("four").innerHTML.toString();
  point2 = document.getElementById("five").innerHTML.toString();
  point3 = document.getElementById("six").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }

  //scenario three: third column matches
  point1 = document.getElementById("seven").innerHTML.toString();
  point2 = document.getElementById("eight").innerHTML.toString();
  point3 = document.getElementById("nine").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }
}

function analyzeDiagonalVictory() {
  var point1 = "", point2 = "", point3 = "";
  //"left to right" diagonal matches
  point1 = document.getElementById("one").innerHTML.toString();
  point2 = document.getElementById("five").innerHTML.toString();
  point3 = document.getElementById("nine").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }

  //"right to left" diagonal matches
  point1 = document.getElementById("three").innerHTML.toString();
  point2 = document.getElementById("five").innerHTML.toString();
  point3 = document.getElementById("seven").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }


}

function analyseDeadEnd() {
  //gets all <p> elements that contain X , 0 or nothing ("" i.e., null)
  var cross_zero = document.getElementsByClassName("cross-or-zero");
  //counter to count number of occupied (having X or 0) <p> elements. 
  //if counter == 9 (total cells in the game) , then game is in dead end.
  var counter = 0;

  for (var i = 0; i < cross_zero.length; i++) {
    var element = cross_zero[i];
    if (element.innerHTML.toString() !== "") {
      counter++;
    }
  }

  if (counter == 9) {
    return true;
  }
  else {
    return false;
  }

}

function updateRounds(whoseTurn, status) {
  if (status == "victory") {
    if (whoseTurn == "player_one") {
      document.getElementsByClassName('player1-scores')[table_row_counter].innerHTML = "&#10004";   //tick mark
      document.getElementsByClassName('player1-scores')[table_row_counter].style.color = " hsl(120, 68%, 46%)";
      document.getElementsByClassName('player2-scores')[table_row_counter].innerHTML = "&#x2717";   //cross
      document.getElementsByClassName('player2-scores')[table_row_counter].style.color = "hsl(0, 100%, 55%)";
      table_row_counter++;
      player1_wins_counter++;
    }
    else if (whoseTurn == "player_two") {
      document.getElementsByClassName('player2-scores')[table_row_counter].innerHTML = "&#10004";
      document.getElementsByClassName('player2-scores')[table_row_counter].style.color = " hsl(120, 68%, 46%)";
      document.getElementsByClassName('player1-scores')[table_row_counter].innerHTML = "&#x2717";
      document.getElementsByClassName('player1-scores')[table_row_counter].style.color = "hsl(0, 100%, 55%)";
      table_row_counter++;
      player2_wins_counter++;
    }
  }

  else if (status == "draw") {
    document.getElementsByClassName('player1-scores')[table_row_counter].innerHTML = "&#x2717";
    document.getElementsByClassName('player2-scores')[table_row_counter].innerHTML = "&#x2717";
    document.getElementsByClassName('player1-scores')[table_row_counter].style.color = "hsl(0, 100%, 55%)";
    document.getElementsByClassName('player2-scores')[table_row_counter].style.color = "hsl(0, 100%, 55%)";
    table_row_counter++;
  }

  clearPlayground();  //reset all cells to empty. Cannot use reload() as this will reload the game table too
  if (round_number == 6) {
    checkTheWinner();
  }
}

function victory() {
  victoryFlag = false;
  round_number++;
  updateRounds(turn, "victory");
}

function clearPlayground(){
  for(var i=0; i<9; i++){
    document.getElementsByClassName("cross-or-zero")[i].innerHTML = "";
  }
}

function checkTheWinner() {
  if (player1_wins_counter > player2_wins_counter) {  //player1 wins
    showDialog("player_one", "victory");
  }
  else if (player2_wins_counter > player1_wins_counter) {  //player2 wins
    showDialog("player_two", "victory");
  }
  else if (player1_wins_counter == player2_wins_counter) {  //Draw: None wins
    showDialog(turn, "draw");
  }
}

function showDialog(turnn, status) {
  document.getElementById("dialog").style.display = "block";
  if (status == "victory") {
    document.getElementById("message").innerHTML = "Victory!";
    if (turnn === "player_one") {
      document.getElementById("winner-name-message").innerHTML = "<em>"+PLAYER1_NAME+"</em>   wins";
    }
    else if (turnn === "player_two") {
      document.getElementById("winner-name-message").innerHTML = "<em>"+PLAYER2_NAME+"</em>   wins";
    }
  }

  else if (status == "draw") {
    document.getElementById("message").innerHTML = "That's a Tie!";
  }
