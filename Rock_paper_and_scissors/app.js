const computerChoice = document.getElementById("computer-choice");
const userChoice = document.getElementById("user-choice");
const result = document.getElementById("result");
const possibleOptions = document.querySelectorAll(".bartan");
let user;
let comp;
let res;

possibleOptions.forEach((possibleChoice) => {
  possibleChoice.addEventListener("click", (e) => {
    user = e.target.id;
    userChoice.innerHTML = user;
    generateRandomNumber();
  });
});

function generateRandomNumber() {
  const randomNum = Math.floor(Math.random() * possibleOptions.length + 1);

  if (randomNum === 1) {
    comp = "rock";
  } else if (randomNum === 2) {
    comp = "paper";
  } else {
    comp = "scissors";
  }

  computerChoice.innerHTML = comp;

  getResult();
}

function getResult() {
  console.log("computer ne ye chuna hai: " + comp);
  console.log("user ne ye chuna hai: " + user);
  if (comp === user) {
    res = "it's a draw you donut";
  } else if (comp === "rock" && user === "paper") {
    res = "user wins";
  } else if (comp === "rock" && user === "scissors") {
    res = "computer wins";
  } else if (comp === "paper" && user === "rock") {
    res = "computer wins";
  } else if (comp === "paper" && user === "scissors") {
    res = "user wins";
  } else if (comp === "scissors" && user === "rock") {
    res = "user wins";
  } else if (comp === "scissors" && user === "paper") {
    res = "computer wins";
  }

  result.innerHTML = res;
}
