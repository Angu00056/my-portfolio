const funstuffScreen = document.getElementById("Funstuff");
const homepageScreen = document.getElementById("homepage");
const funstuffButton = document.getElementById("FunstuffButton");
const backButton = document.getElementById("backButton");
const funstuffSection = document.getElementById("funstuff-section");

function showMessage() {
    document.getElementById("message").textContent =
        "Thanks for visiting my portfolio!";
}

function showScreen(screenName) {
    if (homepageScreen) {
        homepageScreen.style.display = screenName === "Funstuff" ? "none" : "block";
    }

    if (funstuffScreen) {
        funstuffScreen.style.display = screenName === "Funstuff" ? "block" : "none";
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
        showScreen("Funstuff");

        window.requestAnimationFrame(function () {
            if (funstuffScreen) {
                funstuffScreen.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

if (backButton) {
    backButton.addEventListener("click", function () {
        showScreen("Homepage");

        window.requestAnimationFrame(function () {
            if (funstuffSection) {
                funstuffSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

document.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener("click", function () {
        highlightSection(getSectionFromLink(link));
    });
});