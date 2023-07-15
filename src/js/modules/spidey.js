const spidey = document.getElementById("spidey");
const fireBall = document.getElementById("fire-ball");
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');

let scoreInterval;
let currentScore = 0;
let bestScore;

if(!localStorage.getItem("scoreSpideyGame")) {
   localStorage.setItem("scoreSpideyGame", "0");
}
let saveScore = +localStorage.getItem("scoreSpideyGame"); 
let setScore = new Set([saveScore]);
bestScoreElement.textContent = saveScore;


document.addEventListener("keydown", function(event) {
  spideyJump();
});

document.addEventListener("touchstart", function(event) {
  spideyJump();
});

startButton.addEventListener("click", function() {
  fireBall.classList.add("game-spidey__fire-ball_active");

  if (!scoreInterval) {
    currentScore = 0;
    scoreInterval = setInterval(() => {
      currentScore++;
      scoreElement.textContent = currentScore;
    }, 1000);
  }
});

function spideyJump() {
  if (!spidey.classList.contains("game-spidey__spidey_jump")) {
    spidey.classList.add("game-spidey__spidey_jump");
    spidey.addEventListener("animationend", function() {
      spidey.classList.remove("game-spidey__spidey_jump");
    }, { once: true });
  }
}

let isAlive = setInterval(function() {
  const spideyRect = spidey.getBoundingClientRect();
  const fireBallRect = fireBall.getBoundingClientRect();
  const fireBallLeft = fireBallRect.left;
  const fireBallRight = fireBallRect.right;
  const fireBallTop = fireBallRect.top;
  const fireBallBottom = fireBallRect.bottom;

  if (fireBallLeft < fireBallRight && fireBallRight > spideyRect.left && fireBallLeft < spideyRect.right && fireBallTop < spideyRect.bottom && fireBallBottom > spideyRect.top) {
   setScore.add(currentScore);
   alert("Game Over!");
   fireBall.classList.remove("game-spidey__fire-ball_active");
   clearInterval(scoreInterval);
   scoreInterval = null;
   currentScore = 0;
   scoreElement.textContent = currentScore;
   bestScore = Math.max(...setScore);
   bestScoreElement.textContent = bestScore;

   if(saveScore < bestScore) {
      localStorage.setItem("scoreSpideyGame", bestScore.toString());
   }
  }
}, 10);
