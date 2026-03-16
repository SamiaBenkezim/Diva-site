const screen1 = document.getElementById('screen-invitation');
const screen2 = document.getElementById('screen-game');
const imReadyBtn = document.getElementById('btn-yes');
const emotionInput = document.getElementById('user-emotion');
const warningMsg = document.getElementById('warning-msg');
imReadyBtn.addEventListener('click', function() {
    const userText = emotionInput.value.trim();
    if (userText === "") {
        warningMsg.classList.remove('hidden');
        console.log("Input is empty!");
    } else {
        screen1.style.display="none";
        screen2.style.display="block";
        console.log("Moving to Screen 2!");
    }
});
const btnNo = document.getElementById('btn-no-game');
const btnYes = document.getElementById('btn-yes-game');
const prankWrap = document.querySelector('.prank-wrap');
const gameBox = document.getElementById('game-box');
let currentScale = 1.0;
const shrinkFactor = 0.15; 
const minScale = 0.15; 
const handleNoMove = () => {
    currentScale -= shrinkFactor;
    if (currentScale <= minScale) {
        btnNo.style.display = 'none';
        return;
    }
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = `scale(${currentScale})`;
};
const handleYesClick = () => {
    prankWrap.classList.add('hidden');
    gameBox.classList.remove('hidden');
};
btnNo.addEventListener('mouseover', handleNoMove);
btnYes.addEventListener('click', handleYesClick);
const grid = document.getElementById('memory-grid');
const moveDisplay = document.getElementById('move-counter');
const winMessage = document.getElementById('win-message');

const symbols = ["🍎", "🍎", "⭐", "⭐", "🌈", "🌈", "🌸", "🌸", "🍦", "🍦", "🐱", "🐱", "🎈", "🎈", "💎", "💎"];
let flippedCards = [];
let moves = 0;
let matches = 0;
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function createGame() {
    shuffle(symbols);
    grid.innerHTML = ''; 
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerText = "?";
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            moveDisplay.innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matches++;
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
        
            if (matches === 8) {
                winMessage.classList.remove('hidden');
                setTimeout(() => {
                    window.addEventListener('click', transitionToDiva, { once: true });
                }, 500);
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = "?";
            card2.innerText = "?";
            flippedCards = [];
        }, 1000);
    }
}

function transitionToDiva() {
    const gameScreen = document.getElementById('screen-game');
    const divaScreen = document.getElementById('screen-diva');
    gameScreen.style.display = "none"; 
    divaScreen.classList.remove('hidden');
    divaScreen.style.display = "block";
    
    console.log("Final screen reached! ✨💅");
}
btnYes.addEventListener('click', () => {
    prankWrap.classList.add('hidden');
    gameBox.classList.remove('hidden');
    createGame(); 
});
const myFinalMessage = "You did it! You played the game, you won, and now you're officially recognized as the ultimate DIVA. 💅 Keep shining, keep slaying, and keep sparkling! ✨. By the power of confidence, courage, and pure diva energy,you are now officially Crowned as an ✨ ULTIMATE DIVA ✨May you always shine unapologetically, trust yourself deeply,and never allow anyone to dim your light. This title is permanent, non-transferable, and proudly deserved.  Certified with love 💖   Status: ICONIC FOREVER";

let i = 0;

function runTypingEffect() {
    const container = document.getElementById('typing-window-content');
    if (i < myFinalMessage.length) {
        container.innerHTML += myFinalMessage.charAt(i);
        i++;
        const windowDiv = document.querySelector('.typing-window');
        windowDiv.scrollTop = windowDiv.scrollHeight;
        
        setTimeout(runTypingEffect, 50); 
    }
}

function transitionToDiva() {
    const gameScreen = document.getElementById('screen-game');
    const divaScreen = document.getElementById('screen-diva');
    gameScreen.style.display = "none"; 
    divaScreen.classList.remove('hidden');
    divaScreen.style.display = "block";
   
    runTypingEffect();
}
