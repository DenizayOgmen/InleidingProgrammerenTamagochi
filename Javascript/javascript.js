console.log("😽");
// Opbouw van code volgorde:

// 1 - alle constanten
// 2 - alle lets
// 3 - alle functions
// 4 -event listeners

// bij alles commentaar schrijven!!!
const foodbutton = document.getElementById("food");
const sleepbutton = document.getElementById("sleep");
const wcbutton = document.getElementById("toilet");
const bathbutton = document.getElementById("bath");
// Voor het veranderen van de achtergrond
const background = document.querySelector("#background");

let healthbar = document.getElementById("health");
let health = 100 
let i = 100;

// changeHealthBar('30%');

function changeHealthBar(percentage) { // 30 veranderd hij naar "30%"
    healthbar.style.width = percentage + "%";
    if (percentage < 20) {
        healthbar.style.backgroundColor = "red";
    } else if (percentage < 40) {
        healthbar.style.backgroundColor = "orange";
    } else {
        healthbar.style.backgroundColor = ""; // reset to default color
        
    }
}

function resetHealth() {
    health += 20;

    background.removeAttribute("class");
    background.classList.add("etenAchtergrond")
    setTimeout( function(){
        background.removeAttribute("class");
        background.classList.add("container")
    }, 3000)

    if (health >= 100) {
        health = 100;
    }
   
}

setInterval(function () {
    health -= 1;

    if (health <= 0) {
        health = 0;
    }
    console.log(health)
    changeHealthBar(health);
}, 400);

foodbutton.addEventListener("click", resetHealth);

