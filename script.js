// ============= PORTFOLIO NAVIGATION =============
const funstuffScreen = document.getElementById("Funstuff");
const homepageScreen = document.getElementById("homepage");
const gameScreen = document.getElementById("gameScreen");
const funstuffButton = document.getElementById("FunstuffButton");
const interactiveStoryButton = document.getElementById("InteractiveStoryButton");
const backButton = document.getElementById("backButton");
const funstuffSection = document.getElementById("funstuff-section");

function showMessage() {
    document.getElementById("message").textContent =
        "Thanks for visiting my portfolio!";
}

function showPortfolioScreen(screenName) {
    if (homepageScreen) {
        homepageScreen.style.display = screenName === "Funstuff" ? "none" : "block";
    }

    if (funstuffScreen) {
        funstuffScreen.style.display = screenName === "Funstuff" ? "block" : "none";
    }

    if (gameScreen) {
        gameScreen.style.display = "none";
    }
}

function highlightSection(target) {
    if (!target) return;

    target.classList.remove("section-highlight");
    void target.offsetWidth;
    target.classList.add("section-highlight");

    window.setTimeout(function () {
        target.classList.remove("section-highlight");
    }, 900);
}

function getSectionFromLink(link) {
    const href = link.getAttribute("href");

    if (!href) return null;

    if (href.startsWith("#")) {
        const id = decodeURIComponent(href.slice(1));
        return document.getElementById(id);
    }

    return link.closest("section");
}

if (funstuffButton) {
    funstuffButton.addEventListener("click", function () {
        showPortfolioScreen("Funstuff");

        window.requestAnimationFrame(function () {
            if (funstuffScreen) {
                funstuffScreen.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

if (backButton) {
    backButton.addEventListener("click", function () {
        showPortfolioScreen("Homepage");

        window.requestAnimationFrame(function () {
            if (funstuffSection) {
                funstuffSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

if (interactiveStoryButton) {
    interactiveStoryButton.addEventListener("click", function () {
        if (gameScreen) {
            gameScreen.style.display = "block";
            if (homepageScreen) homepageScreen.style.display = "none";
            if (funstuffScreen) funstuffScreen.style.display = "none";
            showGameScreen("menu");
        }
    });
}

document.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener("click", function () {
        highlightSection(getSectionFromLink(link));
    });
});

// ============= GAME LOGIC =============
const menu = document.getElementById("menu");
const settings = document.getElementById("settings");
const game = document.getElementById("game");

const startBtn = document.getElementById("startBtn");
const settingsBtn = document.getElementById("settingsBtn");
const lightToggle = document.getElementById("lightToggle");
const backBtn = document.getElementById("backBtn");
const gameBackBtn = document.getElementById("gameBackBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const backToPortfolioBtn = document.getElementById("backToPortfolioBtn");

const story = document.getElementById("story");
const choice1 = document.getElementById("choice1"); 
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choiceButtons = [choice1, choice2, choice3];
const choices = document.getElementById("choices");
const sceneimage = document.getElementById("sceneimage");
const healthDisplay = document.getElementById("health");
const moneyDisplay = document.getElementById("money");
const confidenceDisplay = document.getElementById("confidence");

choice1.addEventListener("click", () => makeChoice(0));
choice2.addEventListener("click", () => makeChoice(1));
choice3.addEventListener("click", () => makeChoice(2));

saveBtn.addEventListener("click", () => saveProgress());
resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all progress?")) {
        resetProgress();
    }
});

window.addEventListener("load", () => {
    updateStartButtonLabel();
});

if (lightToggle) {
    lightToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-mode", lightToggle.checked);
    });
}

let currentScene = "start";
let health = 100;
let money = 20;
let confidence = 100;

function updateStartButtonLabel() {
    const hasSavedProgress = Boolean(localStorage.getItem("gameProgress"));
    startBtn.textContent = hasSavedProgress ? "Continue Game" : "Start Game";
}

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
            { text: "Eat", next: "eat", requires: { health: 90 } },
            { text: "Go Outside", next: "outside", requires: { confidence: 105 } },
            { text: "Read", next: "read"}
        ]
    },

    blue: {
        text: "You put on a blue shirt. What should you do next?",
        effects: {
            confidence: 5
        },
        sceneimage: "images/blueshirt.jpg",
        choices: [
            { text: "Eat", next: "eat", requires: { health: 90 } },
            { text: "Go Outside", next: "outside", requires: { confidence: 105 } },
            { text: "Read", next: "read",}
        ]
    },

    yellow: {
        text: "You put on a yellow shirt. What should you do next?",
        effects: {
            confidence: 5
        },
        sceneimage: "images/yellowshirt.jpg",
        choices: [
            { text: "Eat", next: "eat", requires: { health: 90 } },
            { text: "Go Outside", next: "outside", requires: { confidence: 105 } },
            { text: "Read", next: "read"}
        ]
    },

    outside: {
        text: "Sun shining, grass greening, birds chirping, it is a nice day out. What should you do next?",
        effects: {
        
        },
        seneimage: "images/outside.jpg",
        choices:  [
            { text: "Go back inside", next: "back inside"},
            { text: "Go for a drive", next: "drive"},
            { text: "Say hello to your neighboor", next: "neighboor"}
        ]
    },

    eat: {
        text: "You want to eat something yummy and nutritious. What do you eat?",
        choices: [
            { text: "Eggs", next: "eggs" },
            { text: "Pancakes", next: "pancakes" },
            { text: "Cereal", next: "cereal" }
        ]
    },

    read: {
        text: "You decide to read a novel. What genre do you prefer right now?",
        choices: [
            { text: "Romance", next: "romance" },
            { text: "Dark Thriller", next: "darkthriller" },
            { text: "Fantasy", next: "fantasy" }
        ]
    }
};

startBtn.addEventListener("click", () => {
    showGameScreen("game");

    const savedState = localStorage.getItem("gameProgress");
    if (savedState) {
        loadProgress();
    } else {
        showScene("start");
        updateStats();
    }
});

settingsBtn.addEventListener("click", () => {
    showGameScreen("settings");
});

backBtn.addEventListener("click", () => {
    showGameScreen("menu");
});

gameBackBtn.addEventListener("click", () => {
    const shouldSave = confirm("Would you like to save your progress before exiting?");

    if (shouldSave) {
        saveProgress();
    }

    showGameScreen("menu");
});

if (backToPortfolioBtn) {
    backToPortfolioBtn.addEventListener("click", () => {
        if (gameScreen) gameScreen.style.display = "none";
        if (homepageScreen) homepageScreen.style.display = "block";
        if (funstuffScreen) funstuffScreen.style.display = "none";
    });
}

function showGameScreen(screen) {
    if (screen === "menu") {
        menu.style.display = "block";
        settings.style.display = "none";
        game.style.display = "none";
    } else if (screen === "settings") {
        menu.style.display = "none";
        settings.style.display = "block";
        game.style.display = "none";
    } else if (screen === "game") {
        menu.style.display = "none";
        settings.style.display = "none";
        game.style.display = "flex";
    }
}

function isChoiceAvailable(choice) {
    if (typeof choice?.enabled === "function") {
        return choice.enabled({ health, money, confidence, currentScene });
    }

    if (typeof choice?.condition === "function") {
        return choice.condition({ health, money, confidence, currentScene });
    }

    if (choice?.requires) {
        return Object.entries(choice.requires).every(([stat, requiredValue]) => {
            const currentValue = { health, money, confidence }[stat];
            return typeof currentValue === "number" && currentValue >= requiredValue;
        });
    }

    return true;
}

function showScene(sceneName, applyEffects = true) {

    currentScene = sceneName;

    const scene = scenes[sceneName];
    const previousStats = { health, money, confidence };

    // Apply stat changes
    if (applyEffects && scene.effects) {

        if (Object.prototype.hasOwnProperty.call(scene.effects, "health")) {
            health += scene.effects.health;
        }

        if (Object.prototype.hasOwnProperty.call(scene.effects, "money")) {
            money += scene.effects.money;
        }

        if (Object.prototype.hasOwnProperty.call(scene.effects, "confidence")) {
            confidence += scene.effects.confidence;
        }
    }

    updateStats(previousStats);

    // Fade out animation
    story.classList.add("fade-out");
    sceneimage.classList.add("fade-out");

    // Update content after fade out completes
    setTimeout(() => {
        story.textContent = scene.text;
        sceneimage.src = scene.sceneimage || "images/shirts.jpg";

        choiceButtons.forEach((button, index) => {
            const choice = scene.choices[index];

            if (!choice) {
                button.style.display = "none";
                button.disabled = true;
                button.textContent = "";
                return;
            }

            button.style.display = "inline-block";
            button.disabled = !isChoiceAvailable(choice);
            button.textContent = choice.text;
        });

        // Fade in animation
        story.classList.remove("fade-out");
        sceneimage.classList.remove("fade-out");
        story.classList.add("fade-in");
        sceneimage.classList.add("fade-in");

        // Remove fade-in class after animation completes
        setTimeout(() => {
            story.classList.remove("fade-in");
            sceneimage.classList.remove("fade-in");
        }, 400);
    }, 200);
}

function makeChoice(choiceIndex) {

    const scene = scenes[currentScene];
    const choice = scene.choices[choiceIndex];

    if (!choice || !isChoiceAvailable(choice)) {
        return;
    }

    const nextScene = choice.next;

    showScene(nextScene);

}

function flashStat(display, value, previousValue) {
    display.textContent = value;

    if (previousValue === undefined || value === previousValue) {
        display.classList.remove("flash-up", "flash-down");
        return;
    }

    display.classList.remove("flash-up", "flash-down");
    void display.offsetWidth;
    display.classList.add(value > previousValue ? "flash-up" : "flash-down");

    setTimeout(() => {
        display.classList.remove("flash-up", "flash-down");
    }, 500);
}

function updateStats(previousStats = null) {
    const previous = previousStats || {};
    flashStat(healthDisplay, health, previous.health);
    flashStat(moneyDisplay, money, previous.money);
    flashStat(confidenceDisplay, confidence, previous.confidence);
}

function saveProgress() {
    const gameState = {
        currentScene: currentScene,
        health: health,
        money: money,
        confidence: confidence
    };
    localStorage.setItem("gameProgress", JSON.stringify(gameState));
    updateStartButtonLabel();
    alert("Progress saved!");
}

function loadProgress() {
    const savedState = localStorage.getItem("gameProgress");
    if (savedState) {
        const gameState = JSON.parse(savedState);
        currentScene = gameState.currentScene;
        health = gameState.health;
        money = gameState.money;
        confidence = gameState.confidence;
        updateStats();
        showScene(currentScene, false);
    }
}

function resetProgress() {
    health = 100;
    money = 20;
    confidence = 100;
    currentScene = "start";
    localStorage.removeItem("gameProgress");
    updateStartButtonLabel();
    updateStats();
    showScene("start");
    alert("Progress reset!");
}

updateStats();
updateStartButtonLabel();