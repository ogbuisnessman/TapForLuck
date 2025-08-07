let clicks = 0;

const tapsNeeded = 5;

const cloverTypes = [
  { type: "common", chance: 60, emoji: "🍀" },
  { type: "uncommon", chance: 25, emoji: "🍃" },
  { type: "rare", chance: 10, emoji: "🌟" },
  { type: "epic", chance: 4, emoji: "✨" },
  { type: "legendary", chance: 0.8, emoji: "💎" },
  { type: "divine", chance: 0.2, emoji: "☀️" },
];

// Load clovers from localStorage or initialize
let clovers = JSON.parse(localStorage.getItem("clovers"));
if (!clovers) {
  clovers = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    divine: 0,
  };
}

const clickButton = document.getElementById("click-button");
const cloverCountDisplay = document.getElementById("clover-count");
const progressBar = document.getElementById("progress-bar");
const cloverMessage = document.getElementById("clover-message");

function totalClovers() {
  return Object.values(clovers).reduce((a, b) => a + b, 0);
}

function getRandomClover() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const clover of cloverTypes) {
    cumulative += clover.chance;
    if (rand <= cumulative) return clover.type;
  }
  return "common";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showMessage(text) {
  cloverMessage.textContent = text;
  cloverMessage.style.opacity = "1";
  setTimeout(() => {
    cloverMessage.style.opacity = "0";
  }, 3000);
}

function updateProgressBar() {
  progressBar.style.width = (clicks / tapsNeeded) * 100 + "%";
}

function updateButtonText() {
  clickButton.textContent = clicks === 0 ? "Tap!" : `${clicks}/${tapsNeeded}`;
}

clickButton.addEventListener("click", () => {
  clicks++;
  updateProgressBar();
  updateButtonText();

  if (clicks >= tapsNeeded) {
    clicks = 0;
    const newClover = getRandomClover();
    clovers[newClover]++;
    localStorage.setItem("clovers", JSON.stringify(clovers));
    cloverCountDisplay.textContent = totalClovers();
    updateProgressBar();
    updateButtonText();
    const emoji = cloverTypes.find(c => c.type === newClover).emoji;
    showMessage(`You got a ${emoji} ${capitalize(newClover)} Clover!`);
  }
});

// Initialize
cloverCountDisplay.textContent = totalClovers();
updateButtonText();
updateProgressBar();
