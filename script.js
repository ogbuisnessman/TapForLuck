let clicks = 0;

let clovers = localStorage.getItem("clovers")
  ? JSON.parse(localStorage.getItem("clovers"))
  : {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      divine: 0,
    };

const clickButton = document.getElementById("click-button");
const cloverCountDisplay = document.getElementById("clover-count");
const progressBar = document.getElementById("progress-bar");
const cloverMessage = document.getElementById("clover-message");

const tapsNeeded = 5;

const cloverTypes = [
  { type: "common", chance: 60, emoji: "🍀" },
  { type: "uncommon", chance: 25, emoji: "🍃" },
  { type: "rare", chance: 10, emoji: "🌟" },
  { type: "epic", chance: 4, emoji: "✨" },
  { type: "legendary", chance: 0.8, emoji: "💎" },
  { type: "divine", chance: 0.2, emoji: "☀️" },  // secret super rare!
];

// Sum clovers count
function totalClovers() {
  return Object.values(clovers).reduce((a, b) => a + b, 0);
}

// Pick clover based on chance, including Divine
function getRandomClover() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const clover of cloverTypes) {
    cumulative += clover.chance;
    if (rand <= cumulative) {
      return clover.type;
    }
  }
  return "common"; // fallback
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showCloverMessage(text) {
  cloverMessage.textContent = text;
  cloverMessage.style.opacity = "1";
  cloverMessage.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    cloverMessage.style.transition = "opacity 1s ease";
    cloverMessage.style.opacity = "0";
  }, 3000);
}

clickButton.addEventListener("click", () => {
  clicks++;
  updateProgressBar();
  updateButtonText();

  if (clicks >= tapsNeeded) {
    clicks = 0;
    const newCloverType = getRandomClover();

    clovers[newCloverType]++;
    localStorage.setItem("clovers", JSON.stringify(clovers));

    cloverCountDisplay.textContent = totalClovers();

    updateProgressBar();
    updateButtonText();

    showCloverMessage(`You got a ${cloverTypes.find(c => c.type === newCloverType).emoji} ${capitalize(newCloverType)} Clover!`);
  }
});

function updateProgressBar() {
  const percent = (clicks / tapsNeeded) * 100;
  progressBar.style.width = percent + "%";
}

function updateButtonText() {
  clickButton.textContent = clicks === 0 ? "Tap!" : `${clicks}/${tapsNeeded}`;
}

// Initialize display on load
cloverCountDisplay.textContent = totalClovers();
updateButtonText();
updateProgressBar();
