const funstuffScreen = document.getElementById("Funstuff");
const homepageScreen = document.getElementById("homepage");
const gameScreen = document.getElementById("gameScreen");
const FunstuffButton = document.getElementById("FunstuffButton");
const backButton = document.getElementById("backButton");
const funstuffSection = document.getElementById("funstuff-section");


function showScreen(screen) {
    if (screen === "Funstuff") {
        homepageScreen.style.display = "none";
        funstuffScreen.style.display = "block";
    }
}

function showPortfolioScreen(screen) {
    if (screen === "Homepage") {
        funstuffScreen.style.display = "none";
        homepageScreen.style.display = "block";
    }
}
 function showMessage() {
    document.getElementById("message").textContent =
        "Thanks for visiting my portfolio!";
};
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

FunstuffButton.addEventListener("click", function () {
    showScreen("Funstuff");

    window.requestAnimationFrame(function () {
        funstuffScreen.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

backButton.addEventListener("click", function () {
    showPortfolioScreen("Homepage");

    window.requestAnimationFrame(function () {
        homepageScreen.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

document.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener("click", function () {
        highlightSection(getSectionFromLink(link));
    });
})
