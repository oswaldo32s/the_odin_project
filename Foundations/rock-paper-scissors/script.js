let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let ComputerValue = "";

  switch (Math.round(Math.random() * 2)) {
    case 0:
      ComputerValue = "Rock";
      break;
    case 1:
      ComputerValue = "Paper";
      break;
    default:
      ComputerValue = "Scissors";
  }
  return ComputerValue;
}

function getUserChoice() {
  const UserChoice = prompt("Let's play, Rock, Paper or Scissors?", "Paper");
  return UserChoice;
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    playRound(getUserChoice(), getComputerChoice());
  }

  if (computerScore == humanScore) {
    console.log("It's a Draw!");
  } else if (computerScore > humanScore) {
    console.log("Computer Wins!");
  } else {
    console.log("User Wins!");
  }

  function playRound(userChoice, computerChoice) {
    const winner = getWinner(userChoice, computerChoice);
    addScore(winner);
    console.log("User: " + humanScore);
    console.log("Computer: " + computerScore);
  }

  function getWinner(userChoice, computerChoice) {
    if (userChoice == computerChoice) {
      return "draw";
    } else if (userChoice == "Rock" && computerChoice == "Scissors") {
      return "user";
    } else if (userChoice == "Paper" && computerChoice == "Rock") {
      return "user";
    } else if (userChoice == "Scissors" && computerChoice == "Paper") {
      return "user";
    } else {
      return "computer";
    }
  }

  function addScore(winner) {
    if (winner === "user") {
      humanScore++;
    } else if (winner === "computer") {
      computerScore++;
    }
  }
}

playGame();
