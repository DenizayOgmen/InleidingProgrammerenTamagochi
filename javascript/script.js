// Bron: Wieb 😎 (Oud Klasgenottje)

// Opbouw van code volgorde:

// 1 - alle constanten
// 2 - alle lets
// 3 - alle functions
// 4 - event listeners

// Bij alles commentaar schrijven!!!

// ------------------------------------------------------------------------------------------------------------------

/**
 * States.
 */

const dogState = {
    hunger: 100,
    energy: 100,
    hygiene: 100,
    fun: 100,
};

const gameState = {
    gameOver: false,
    actionIsActive: false // Variable om te checken of een actie bezig is.
};

/**
 * Data.
 */

const dogImages = {
    happy: "images/HappyMochi.png",
    sad: "images/SadMochi.png",
    angry: "images/AngryMochi.png",
    finish: "images/gameOver.png"
};

const soundEffects = {
    gameOver: "sounds/game-over-sound.mp3"
};

const actions = [
    {
        id: 'food',
        image: 'images/MochiEating.png',
        soundeffect: 'sounds/crunch.mp3',
        state: 'hunger'
    },
    {
        id: 'sleep',
        image: 'images/MochiSleeping.png',
        soundeffect: 'sounds/lullaby.mp3',
        state: 'energy'
    },
    {
        id: 'toilet',
        image: 'images/MochiPooping.png',
        soundeffect: 'sounds/toiletFlush.mp3',
        state: 'hygiene'
    },
    {
        id: 'bath',
        image: 'images/MochiBathing.png',
        soundeffect: 'sounds/bubbles.mp3',
        state: 'hygiene'
    },
    {
        id: 'ball',
        image: 'images/MochiPlaying.png',
        soundeffect: 'sounds/dogsOut.mp3',
        state: 'fun'
    }
];

/**
 * HTML Elements.
 */
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Footer Menu Buttons
const foodbutton = document.getElementById("food");
const sleepbutton = document.getElementById("sleep");
const wcbutton = document.getElementById("toilet");
const bathbutton = document.getElementById("bath");
const ballbutton = document.getElementById("ball");
const background = document.getElementById("background");

/**
 * Decrease alle dog states elke seconden.
 */
const gameInterval = setInterval(function () {
    if (checkIfGameOver()) {
        endTamagotchiGame();

        // Stop interval loop wanneer gameOver true is.
        return clearInterval(gameInterval);
    }

    const decreaseSpeed = 5;

    dogState.hunger -= decreaseSpeed;
    dogState.energy -= decreaseSpeed;
    dogState.hygiene -= decreaseSpeed;
    dogState.fun -= decreaseSpeed;

    changeProgressBar('hunger', dogState.hunger);
    changeProgressBar('energy', dogState.energy);
    changeProgressBar('hygiene', dogState.hygiene);
    changeProgressBar('fun', dogState.fun);
}, 1000);

// ------------------------------------------------------------------------------------------------------------------

/**
 * 1. Change picture.
 * 2. Play sound.
 * 3. Go back to default image / state after 4 seconds.
 * 4. Increase belonging progress bar.
 */
function callAction(action) {
    if (gameState.actionIsActive === false) {
        gameState.actionIsActive = true;

        resetProgressBar(action.state);

        changeBackgroundImage(action.image);
    
        playSound(action.soundeffect, 3000);
    
        const actionInterval = setTimeout(function(){
            if (checkIfGameOver() === false) {
                changeBackgroundImage(dogImages.happy);
                gameState.actionIsActive = false;
            }
        }, 3000)
    }
}

/**
 * https://stackoverflow-com.translate.goog/questions/22766719/stop-audio-after-x-seconds-in-js?_x_tr_sl=en&_x_tr_tl=nl&_x_tr_hl=nl&_x_tr_pto=sc
 */
function playSound(sound, durationInMs) {
    const audio = new Audio(sound); // Creëer een nieuw Audio Element.

    audio.volume = 0; // Zet het geluid zachter.
    audio.play();

    if (durationInMs !== undefined) { // Speel geluid helemaal af als de tijd niet is aangegeven.
        setTimeout(function () {
            audio.pause();
        }, durationInMs);
    }
}

/**
 * Verander de kleur van de progressbar-bar, met toegewezen ID.
 * Zorg dat de states niet onder 0 of boven de 100 gaan. 🤷‍♀️
 */
function changeProgressBar(progressBarId, percentage) {
    if (dogState.hunger < 0) {
        dogState.hunger = 0;
    }
    if (dogState.energy < 0) {
        dogState.energy = 0;
    }
    if (dogState.hygiene < 0) {
        dogState.hygiene = 0;
    }
    if (dogState.fun < 0) {
        dogState.fun = 0;
    }

    if (dogState.hunger > 100) {
        dogState.hunger = 100;
    }
    if (dogState.energy > 100) {
        dogState.energy = 100;
    }
    if (dogState.hygiene > 100) {
        dogState.hygiene = 100;
    }
    if (dogState.fun > 100) {
        dogState.fun = 100;
    }

    const progressBarElement = document.getElementById(progressBarId);
    progressBarElement.style.width = percentage + "%";

    if (percentage <= 20) {
        progressBarElement.style.backgroundColor = "red";
        changeBackgroundImage(dogImages.angry);
    } else if (percentage <= 40) {
        progressBarElement.style.backgroundColor = "orange";
        changeBackgroundImage(dogImages.sad);
    } else {
        progressBarElement.style.backgroundColor = "rgb(14, 197, 42)";
    }
}

function changeBackgroundImage(image) {
    background.style.backgroundImage = 'url("' + image + '")';
}

/**
 * Reset progressbar met toegewezen ID.
 */
function resetProgressBar(progressBarId) {
    dogState[progressBarId] = 100;

    changeProgressBar(progressBarId, dogState[progressBarId]);
}

/**
 * Check if one of the dog states is 0 or less.
 */
function checkIfGameOver() {
    if (dogState.hunger <= 0 || dogState.energy <= 0 || dogState.hygiene <= 0 || dogState.fun <= 0) {
        return true;
    } else {
        return false;
    }    
}

/**
 * 1. Stop the interval loop thing.
 * 2. Change background image naar dog left.
 * 3. Play game over sound.
 * 4. Remove header & footer UI elementen.
 */
function endTamagotchiGame () {
    gameState.gameOver = true;

    playSound(soundEffects.gameOver);
    changeBackgroundImage(dogImages.finish);
    removeUI();
}

function removeUI() {
    header.style.display = 'none';
    footer.style.display = 'none';
}

// ------------------------------------------------------------------------------------------------------------------

foodbutton.addEventListener('click', function() {
    callAction(actions[0]);
});

sleepbutton.addEventListener('click', function() {
    callAction(actions[1]);
});

wcbutton.addEventListener('click', function() {
    callAction(actions[2]);
});

bathbutton.addEventListener('click', function() {
    callAction(actions[3]);
});

ballbutton.addEventListener('click', function() {
    callAction(actions[4]);
});

// ------------------------------------------------------------------------------------------------------------------

/**
    Audio Bronnen 📝

    https://www.youtube.com/watch?v=3xlws5og44U
    https://www.myinstants.com/en/instant/crunch/
    https://www.myinstants.com/en/instant/brahms-lullaby-sleep-song-12398/
    https://www.myinstants.com/en/instant/who-lets-dogss-out/
    https://www.myinstants.com/en/instant/bubbles/
    https://www.myinstants.com/en/instant/toilet-flush-95497/
    https://www.myinstants.com/en/instant/game-over-titanic-69465/
 */