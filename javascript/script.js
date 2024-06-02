console.log("😽");
// Opbouw van code volgorde:

// 1 - alle constanten
// 2 - alle lets
// 3 - alle functions
// 4 -event listeners

// Bij alles commentaar schrijven!!!

// const buttons
const foodbutton = document.getElementById("food");
const sleepbutton = document.getElementById("sleep");
const wcbutton = document.getElementById("toilet");
const bathbutton = document.getElementById("bath");
const ballbutton = document.getElementById("ball");

// const background
const background = document.getElementById("background");

// Varible om te checken of een actie bezig is.
let actionIsActive = false;

const state = {
    hunger: 100,
    energy: 100,
    hygiene: 100,
    fun: 100
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
 * 1. Change picture.
 * 2. Play sound.
 * 3. Go back to default image / state after 4 seconds.
 * 4. Increase belonging progress bar.
 */
function callAction(action) {
    if (actionIsActive === false) {
        actionIsActive = true;

        background.style.backgroundImage = 'url("' + action.image + '")';
    
        playSound(action.soundeffect);
    
        setTimeout( function(){
            background.style.backgroundImage = 'url("images/HappyMochi.png")';

            resetProgressBar(action.state);

            actionIsActive = false;
        }, 3000)
    }
}

/**
 * https://stackoverflow-com.translate.goog/questions/22766719/stop-audio-after-x-seconds-in-js?_x_tr_sl=en&_x_tr_tl=nl&_x_tr_hl=nl&_x_tr_pto=sc
 */
function playSound(sound) {
    const audio = new Audio(sound); // Creëer een nieuw Audio Element.

    audio.volume = 0.5; // Zet het geluid zachter.
    audio.play();

    setTimeout(function () {
        audio.pause();
    }, 2000);
}

/**
 * Verander de kleur van de progressbar-bar, met toegewezen ID.
 */
function changeProgressBar(progressBarId, percentage) {

    const progessBarElement = document.getElementById(progressBarId);

    progessBarElement.style.width = percentage + "%";

    if (state.hunger < 0) {
        state.hunger = 0;
    }
    if (state.energy < 0) {
        state.energy = 0;
    }
    if (state.hygiene < 0) {
        state.hygiene = 0;
    }
    if (state.fun < 0) {
        state.fun = 0;
    }

    if (state.hunger > 100) {
        state.hunger = 100;
    }
    if (state.energy > 100) {
        state.energy = 100;
    }
    if (state.hygiene > 100) {
        state.hygiene = 100;
    }
    if (state.fun > 100) {
        state.fun = 100;
    }
}

/**
 * Reset progressbar met toegewezen ID.
 */
function resetProgressBar(progressBarId) {
    state[progressBarId] = 100;

    changeProgressBar(progressBarId, state[progressBarId]);
}

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

setInterval(function () {
    const decreaseSpeed = 2;

    state.hunger -= decreaseSpeed;
    state.energy -= decreaseSpeed;
    state.hygiene -= decreaseSpeed;
    state.fun -= decreaseSpeed;

    changeProgressBar('hunger', state.hunger);
    changeProgressBar('energy', state.energy);
    changeProgressBar('hygiene', state.hygiene);
    changeProgressBar('fun', state.fun);
}, 400);

/**
    Audio Bronnen 📝

    https://www.youtube.com/watch?v=3xlws5og44U
    https://www.myinstants.com/en/instant/crunch/
    https://www.myinstants.com/en/instant/brahms-lullaby-sleep-song-12398/
    https://www.myinstants.com/en/instant/who-lets-dogss-out/
    https://www.myinstants.com/en/instant/bubbles/
    https://www.myinstants.com/en/instant/toilet-flush-95497/
 */