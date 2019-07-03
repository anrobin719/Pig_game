/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScores, activePlayer, dice, gamePlaying;
const diceImg = document.querySelector(".dice");


init();

// ROLLING DICE
document.querySelector(".btn-roll").addEventListener("click", function () {
    if(gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
    
        if(dice !== 1) {
            // add
            roundScores += dice;
            document.querySelector(`#current-${activePlayer}`).innerHTML = roundScores;
            diceImg.style.display = "block";
            diceImg.setAttribute("src", `dice-${dice}.png`);
        } else {
            // turn to 0
            changePlayer();
        }
    }


});



// HOLD BUTTON
document.querySelector(".btn-hold").addEventListener("click", function () {
    if(gamePlaying) {
         // push roundScores to totalScore
        scores[activePlayer] += roundScores;

        if (scores[activePlayer] >= 100) {
            document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer];
            document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
            document.querySelector(`#name-${activePlayer}`).innerHTML = "WINNER";
            diceImg.style.display = "none";
            document.querySelector(`#current-${activePlayer}`).innerHTML = 0;
            gamePlaying = false;

        } else {
            document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer];
            changePlayer();
        }
    }

});



function changePlayer() {
    roundScores = 0;
    document.querySelector(`#current-${activePlayer}`).innerHTML = 0;
    diceImg.style.display = "none";

    // activeplayer change
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}



// NEW GAME BUTTON
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    roundScores = 0;
    activePlayer = 0;
    scores = [0, 0];
    gamePlaying = true;
    
    diceImg.style.display = "none";

    document.querySelector(`#current-0`).innerHTML = 0;
    document.querySelector(`#score-0`).innerHTML = 0;
    document.querySelector(`#current-1`).innerHTML = 0;
    document.querySelector(`#score-1`).innerHTML = 0;
    
    document.querySelector(`#name-0`).innerHTML = "Player 1";
    document.querySelector(`#name-1`).innerHTML = "Player 2";
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
}