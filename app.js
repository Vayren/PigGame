/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, 
    prevDice = 0,
    winScore = 100;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if(gamePlaying) {

        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        var diceDOM1 = document.querySelector('.dice--1');
        var diceDOM2 = document.querySelector('.dice--2');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';

        diceDOM1.src = "dice-" + dice1 + ".png";
        diceDOM2.src = "dice-" + dice2 + ".png";

        //One dice
        /*if( prevDice === 6 && dice === 6 ) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if(dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
        prevDice = dice;*/

        //Two dices
        if(dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= winScore){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice--1').style.display = 'none';
            document.querySelector('.dice--2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();  
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-score').addEventListener('click', function (e) {
    e.preventDefault();
    var newWinScore = Number(document.querySelector('.input-score').value);
    winScore = newWinScore > 0 ? newWinScore : 100; 
    document.querySelector('.current-winscore span').textContent = winScore;
    document.querySelector('.input-score').value = '';
})

function init () {
    
    gamePlaying = true;

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.current-winscore span').textContent = '100';
    document.querySelector('.dice--1').style.display = 'none';
    document.querySelector('.dice--2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

}

function nextPlayer () {
    roundScore = 0;
    document.querySelector('.dice--1').style.display = 'none';
    document.querySelector('.dice--2').style.display = 'none';
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}