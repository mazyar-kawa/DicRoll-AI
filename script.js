`use strict`;
const currentPlayare0 = document.querySelector(".left");
const currentPlayare1 = document.querySelector(".right");
const score0 = document.querySelector(".score--1");
const score1 = document.querySelector(".score--2");
const diceEl = document.querySelector(".dice");
const currentScorePlayer0 = document.querySelector(".current--1");
const currentScorePlayer1 = document.querySelector(".current--2");
const rolleDice = document.querySelector(".roll-dice");
const newGame = document.querySelector(".new-game");
const hold = document.querySelector(".hold");
const messageHidden = document.querySelector(".message");
const messageContext = document.querySelector(".message-context");

let scores, currnetScore, activePlayer, playing;

function init() {
  diceEl.classList.add("hidden");
  scores = [0, 0];
  currnetScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentPlayare0.classList.add("player--active");
  messageHidden.classList.add("hidden");
  currentPlayare1.classList.remove("player--active");
}

init();

const switchPlayer = () => {
  document.querySelector(`.current--${activePlayer + 1}`).textContent = 0;
  currnetScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentPlayare0.classList.toggle("player--active");
  currentPlayare1.classList.toggle("player--active");
  rolleDice.classList.toggle("hidden");
  hold.classList.toggle("hidden");
  newGame.classList.toggle("hidden");
};

const changePlayer = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./imgs/dice-${dice}.png`;

    if (dice !== 1) {
      currnetScore += dice;
      document.querySelector(`.current--${activePlayer + 1}`).textContent =
        currnetScore;
    } else {
      document.querySelector(`.score--${activePlayer + 1}`).textContent = 0;
      scores[activePlayer] = 0;
      switchPlayer();
    }
    if (activePlayer === 1) {
      const randomHold = Math.trunc(Math.random() * 3) + 1;
      setTimeout(() => {
        if (randomHold === 1) {
          changePlayer();
        } else {
          holdScore();
        }
      }, 2000);
    }
  }
};

rolleDice.addEventListener("click", function () {
  changePlayer();
});

const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currnetScore;
    document.querySelector(`.score--${activePlayer + 1}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      messageHidden.classList.toggle("hidden");
      messageContext.textContent = `Player ${activePlayer + 1} is winner`;
    } else {
      switchPlayer();
    }
  }
};

hold.addEventListener("click", function () {
  holdScore();
  if (activePlayer === 1) {
    changePlayer();
  }
});

newGame.addEventListener("click", init);
