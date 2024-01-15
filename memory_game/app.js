const cardArr = [
  {
    name: "fries",
    img: "tasweeren/fries.png",
  },
  {
    name: "cheeseburger",
    img: "tasweeren/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "tasweeren/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "tasweeren/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "tasweeren/milkshake.png",
  },
  {
    name: "pizza",
    img: "tasweeren/pizza.png",
  },
  {
    name: "fries",
    img: "tasweeren/fries.png",
  },
  {
    name: "cheeseburger",
    img: "tasweeren/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "tasweeren/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "tasweeren/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "tasweeren/milkshake.png",
  },
  {
    name: "pizza",
    img: "tasweeren/pizza.png",
  },
];

cardArr.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
let cardChoosen = [];
let cardChoosenId = [];
const cardWon = [];
const res = document.querySelector('#result');

function createBoard() {
  for (let i = 0; i < cardArr.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "tasweeren/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    // console.log(card);
    gridDisplay.append(card);
  }
}

createBoard();

function flipCard() {
  const cardId = this.getAttribute("data-id");
  console.log(cardArr[cardId].name);
  cardChoosen.push(cardArr[cardId].name);
  cardChoosenId.push(cardId);
  console.log(cardChoosen);
  this.setAttribute("src", cardArr[cardId].img);
  if (cardChoosen.length === 2) {
    setTimeout(checkMatch, 100);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("img");
  if (
    cardChoosenId[0] == cardChoosenId[1] ||
    cardChoosen[0] != cardChoosen[1]
  ) {
    cards[cardChoosenId[0]].setAttribute("src", "tasweeren/blank.png");
    cards[cardChoosenId[1]].setAttribute("src", "tasweeren/blank.png");
  } else if (cardChoosen[0] == cardChoosen[1]) {
    alert("ayyyyyyy");
    cards[cardChoosenId[0]].setAttribute("src", "tasweeren/white.png");
    cards[cardChoosenId[1]].setAttribute("src", "tasweeren/white.png");
    cards[cardChoosenId[0]].removeEventListener("click", flipCard);
    cards[cardChoosenId[1]].removeEventListener("click", flipCard);
    cardWon.push(cardChoosen);
    res.innerHTML = cardWon.length;
  }
  cardChoosen = [];
  cardChoosenId = [];

  if (cardWon.length == cardArr.length / 2) {
    res.innerHTML = "Epic gamer moment";
  }
}
