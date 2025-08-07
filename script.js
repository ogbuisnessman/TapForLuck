let clicks = 0;

// Retrieve clover counts object or initialize it
let clovers = localStorage.getItem("clovers")
  ? JSON.parse(localStorage.getItem("clovers"))
  : {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    };

const clickButton = document.getElementById("click-button");
const cloverCountDisplay = document.getElementById("clover-count");
const progressBar = document.getElementById("progress-bar");

const tapsNeeded = 5;

const cloverTypes = [
  { type: "common", chance: 60, emoji: "🍀" },
  { type: "uncommon", chance: 25, emoji: "🍃" },
  { type: "rare", chance: 10, emoji: "🌟" },
  { type: "epic", chance: 4, emoji: "✨" },
  { type: "legendary", chance: 1, emoji: "💎" },
];

// Calculate total clovers collected (sum all)
function totalClovers() {
  return Object.values(clovers).reduce((a, b) => a + b, 0);
}

// Randomly pick a clover based on weighted chance
function getRandomClover() {
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const clover of cloverTypes) {
    cumulative += clover.chance;
    if (rand <= cumulative) {
      return clover.type;
    }
  }
  // fallback (should not happen)
  return "common";
}

clickButton.addEventListener("click", () => {
  clicks++;
  updateProgressBar();
  updateButtonText();

  if (clicks >= tapsNeeded) {
    clicks = 0;

    // Get a random clover type based on probabilities
    const newCloverType = getRandomClover();

    // Increment count for that clover
    clovers[newCloverType]++;
    localStorage.setItem("clovers", JSON.stringify(clovers));

    // Update display with total clovers
    cloverCountDisplay.textContent = totalClovers();

    updateProgressBar();
    updateButtonText();

    // Optional: show alert or some feedback with emoji and clover type
    alert(`You got a ${cloverTypes.find(c => c.type === newCloverType).emoji} ${capitalize(newCloverType)} Clover!`);
  }
});

function updateProgressBar() {
  const percent = (clicks / tapsNeeded) * 100;
  progressBar.style.width = percent + "%";
}

function updateButtonText() {
  if (clicks === 0) {
    clickButton.textContent = "Tap!";
  } else {
    clickButton.textContent = `${clicks}/${tapsNeeded}`;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize on load
cloverCountDisplay.textContent = totalClovers();
updateButtonText();
updateProgressBar();
