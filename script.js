const menu = document.getElementById("menu");
const settings = document.getElementById("settings");
const game = document.getElementById("game");

const startBtn = document.getElementById("startBtn");
const settingsBtn = document.getElementById("settingsBtn");
const backBtn = document.getElementById("backBtn");


const story = document.getElementById("story");
const choice1 = document.getElementById("choice1"); 
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choices = document.getElementById("choices");
const sceneimage = document.getElementById("sceneimage");
const restart = document.getElementById("restart");
const healthDisplay = document.getElementById("health");
const moneyDisplay = document.getElementById("money");
const confidenceDisplay = document.getElementById("confidence");

choice1.addEventListener("click", () => makeChoice(0));
choice2.addEventListener("click", () => makeChoice(1));
choice3.addEventListener("click", () => makeChoice(2));

let currentScene = "start";
let health = 100;
let money = 20;
let confidence = 100;

const scenes = {
    start: {
        text: "Choose a shirt.",
        sceneimage: "images/shirts.jpg",
        choices: [
            { text: "Red Shirt", next: "red" },
            { text: "Blue Shirt", next: "blue" },
            { text: "Yellow Shirt", next: "yellow" }
        ]
    },

    red: {
        text: "You put on a red shirt. What should you do next?",
        effects: {
            confidence: 5
        },
        sceneimage: "images/redshirt.jpg",
        choices: [
            { text: "Eat", next: "eat" },
            { text: "Go Outside", next: "outside" },
            { text: "Read", next: "read" }
        ]
    },

    blue: {
        text: "You put on a blue shirt. What should you do next?",
        effects: {
            confidence: 5
        },
        sceneimage: "images/blueshirt.jpg",
        choices: [
            { text: "Eat", next: "eat" },
            { text: "Go Outside", next: "outside" },
            { text: "Read", next: "read" }
        ]
    },

    yellow: {
        text: "You put on a yellow shirt. What should you do next?",
        effects: {
            confidence: 5
        },
        sceneimage: "images/yellowshirt.jpg",
        choices: [
            { text: "Eat", next: "eat" },
            { text: "Go Outside", next: "outside" },
            { text: "Read", next: "read" }
        ]
    },

    outside: {
        text: "Sun shining, grass greening, birds chirping, it is a nice day out. What should you do next?",
        effects: {
            
        },
        choices:  [
            { text: "Go back inside", next: "back inside"},
            { text: "Go for a drive", next: "drive"},
            { text: "Say hello to your neighboor", next: "neighboor"}
        ]
    },

    eat: {
        text: "What do you want to eat?",
        choices: [
            { text: "Eggs", next: "eggs" },
            { text: "Pancakes", next: "pancakes" },
            { text: "Cereal", next: "cereal" }
        ]
    }
};

startBtn.addEventListener("click", () => {

    showScreen(game);

    showScene("start");
    updateStats();

});

settingsBtn.addEventListener("click", () => {

    showScreen(settings);

});

backBtn.addEventListener("click", () => {

    showScreen(menu);

});

restart.addEventListener("click", () => {

    health = 100;
    money = 20;
    confidence = 100;

    updateStats();
    showScene("start");

});
function showScreen(screen) {

    menu.style.display = "none";
    settings.style.display = "none";
    game.style.display = "none";

    screen.style.display = screen === game ? "flex" : "block";

}


function showScene(sceneName) {

    currentScene = sceneName;

    const scene = scenes[sceneName];

    story.textContent = scene.text;
    sceneimage.src = scene.sceneimage || "images/shirts.jpg";

    choice1.textContent = scene.choices[0].text;
    choice2.textContent = scene.choices[1].text;
    choice3.textContent = scene.choices[2].text;

}

const choice = scene.choices[choiceIndex];

function showScene(sceneName) {

    currentScene = sceneName;

    const scene = scenes[sceneName];

    // Apply stat changes
    if (scene.effects) {

        if (scene.effects.health) {
            health += scene.effects.health;
        }

        if (scene.effects.money) {
            money += scene.effects.money;
        }

        if (scene.effects.confidence) {
            confidence += scene.effects.confidence;
        }

        updateStats();
    }

    story.textContent = scene.text;
    sceneimage.src = scene.sceneimage || "images/shirts.jpg";

    choice1.textContent = scene.choices[0].text;
    choice2.textContent = scene.choices[1].text;
    choice3.textContent = scene.choices[2].text;
}

function makeChoice(choiceIndex) {

    const scene = scenes[currentScene];

    const nextScene = scene.choices[choiceIndex].next;

    showScene(nextScene);

}

function restartStory() {
    showScene("start");
}
function updateStats() {
    healthDisplay.textContent = health;
    moneyDisplay.textContent = money;
    confidenceDisplay.textContent = confidence;
}
updateStats();