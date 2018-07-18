
var turn = "player_two";
var victoryFlag = false;
var point1 = "", point2 = "", point3 = "";


function whoseTurn() {
  return turn;
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

function switchTurns() {
  if (whoseTurn() == "player_one") {
    turn = "player_two";
  }
  else if (whoseTurn() == "player_two") {
    turn = "player_one";
  }
}

function analyseGame() {
  analyseVerticalVictory();    //a condition when a player wins by matching elements (X or O) through columns
  analyzeHorizontalVictory();  //a condition when a player wins by matching elements (X or O) through rows
  analyzeDiagonalVictory();    //a condition when a player wins by matching elements (X or O) diagonally
  if (analyseDeadEnd() == true && victoryFlag == false) {         //a condition where no one wins the game
    showDialog(turn, "dead-end");
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

  //scenario two: second columnmatches
  point1 = document.getElementById("four").innerHTML.toString();
  point2 = document.getElementById("five").innerHTML.toString();
  point3 = document.getElementById("six").innerHTML.toString();
  if (point1 != "" && point2 != "" && point3 != "") {
    if (point1 === point2 && point1 === point3 && point2 === point3) {
      victory();
      victoryFlag = true;
    }
  }

  //scenario three: third row matches
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

function victory() {
  victoryFlag = false;
  showDialog(turn, "victory");
}

function showDialog(turnn, status) {
  document.getElementById("dialog").style.display = "block";
  if (status == "victory") {
    document.getElementById("message").innerHTML = "Victory!";
    if (turnn === "player_one") {
      document.getElementById("winner-name-message").innerHTML = "<em>Player 1</em> wins";
    }
    else if (turnn === "player_two") {
      document.getElementById("winner-name-message").innerHTML = "<em>Player 2</em> wins";
    }
  }

  else if(status=="dead-end"){
    document.getElementById("message").innerHTML = "No one wins!";
  }
}
