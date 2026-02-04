// 1. Get the Screen Containers
const screen1 = document.getElementById('screen-invitation');
const screen2 = document.getElementById('screen-game');

// 2. Get the Inputs and Buttons
const imReadyBtn = document.getElementById('btn-yes');
const emotionInput = document.getElementById('user-emotion');
const warningMsg = document.getElementById('warning-msg');
imReadyBtn.addEventListener('click', function() {
    // Get the text from the box and remove extra spaces
    const userText = emotionInput.value.trim();

    if (userText === "") {
        // IF EMPTY: Show the warning message
        warningMsg.classList.remove('hidden');
        console.log("Input is empty!");
    } else {
        // IF FULL: Hide Screen 1 and Show Screen 2
        screen1.style.display="none";
        screen2.style.display="block";
        console.log("Moving to Screen 2!");
    }
});
// Grab all necessary elements
const btnNo = document.getElementById('btn-no-game');
const btnYes = document.getElementById('btn-yes-game');
const prankWrap = document.querySelector('.prank-wrap');
const gameBox = document.getElementById('game-box');

// Tracker for the shrinking effect
let currentScale = 1.0;
const shrinkFactor = 0.15; // Amount to shrink each time
const minScale = 0.15;      // Point at which it disappears

// Logic for the "No" button escape and shrink
const handleNoMove = () => {
    // 1. Calculate new scale
    currentScale -= shrinkFactor;

    // 2. Check if button should vanish
    if (currentScale <= minScale) {
        btnNo.style.display = 'none';
        return;
    }

    // 3. Calculate random position within the viewport
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // 4. Update styles
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = `scale(${currentScale})`;
};

// Logic for the "Yes" button success
const handleYesClick = () => {
    prankWrap.classList.add('hidden');
    gameBox.classList.remove('hidden');
};

// Attach Listeners
btnNo.addEventListener('mouseover', handleNoMove);
btnYes.addEventListener('click', handleYesClick);



const grid = document.getElementById('memory-grid');
const moveDisplay = document.getElementById('move-counter');
const winMessage = document.getElementById('win-message');

const symbols = ["🍎", "🍎", "⭐", "⭐", "🌈", "🌈", "🌸", "🌸", "🍦", "🍦", "🐱", "🐱", "🎈", "🎈", "💎", "💎"];
let flippedCards = [];
let moves = 0;
let matches = 0;

// Shuffles the symbols
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function createGame() {
    shuffle(symbols);
    grid.innerHTML = ''; // Clear grid
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerText = "?"; // Hidden state
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
// --- KEEP YOUR TOP CODE THE SAME UNTIL checkMatch() ---

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matches++;
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            
            // WIN CONDITION
            if (matches === 8) {
                winMessage.classList.remove('hidden');
                
                // Allow a tiny delay so the "winning click" doesn't 
                // accidentally trigger the next screen immediately
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

// THE TRANSITION FUNCTION
function transitionToDiva() {
    const gameScreen = document.getElementById('screen-game');
    const divaScreen = document.getElementById('screen-diva');

    // Force Hide Game / Show Diva
    gameScreen.style.display = "none"; 
    divaScreen.classList.remove('hidden');
    divaScreen.style.display = "block";
    
    console.log("Final screen reached! ✨💅");
}

// Update your existing "Yes" button listener to start the game
btnYes.addEventListener('click', () => {
    prankWrap.classList.add('hidden');
    gameBox.classList.remove('hidden');
    createGame(); // Initialize the grid
});
// Change this text to whatever you want!
// Change this text to whatever you want!
const myFinalMessage = "You did it! You played the game, you won, and now you're officially recognized as the ultimate DIVA. 💅 Keep shining, keep slaying, and keep sparkling! ✨. By the power of confidence, courage, and pure diva energy,you are now officially Crowned as an ✨ ULTIMATE DIVA ✨May you always shine unapologetically, trust yourself deeply,and never allow anyone to dim your light. This title is permanent, non-transferable, and proudly deserved.  Certified with love 💖   Status: ICONIC FOREVER";

let i = 0;

function runTypingEffect() {
    const container = document.getElementById('typing-window-content');
    if (i < myFinalMessage.length) {
        container.innerHTML += myFinalMessage.charAt(i);
        i++;
        // Auto-scroll the window as it types
        const windowDiv = document.querySelector('.typing-window');
        windowDiv.scrollTop = windowDiv.scrollHeight;
        
        setTimeout(runTypingEffect, 50); // Speed of 50ms per letter
    }
}

function transitionToDiva() {
    const gameScreen = document.getElementById('screen-game');
    const divaScreen = document.getElementById('screen-diva');

    gameScreen.style.display = "none"; 
    divaScreen.classList.remove('hidden');
    divaScreen.style.display = "block";
    
    // Start the typing!
    runTypingEffect();
}