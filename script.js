let clickCount = 0;
let totalClovers = parseInt(localStorage.getItem('totalClovers')) || 0;
const bar = document.getElementById('bar');
const countText = document.getElementById('tap-count');
const result = document.getElementById('result');
const totalDisplay = document.getElementById('clover-total');

const inventory = JSON.parse(localStorage.getItem('inventory')) || {
  "🍀": 0,
  "🍃": 0,
  "🌟": 0,
  "✨": 0,
  "💎": 0,
  "☀️": 0,
  "👑🔮": 0
};

function tap() {
  clickCount++;
  countText.textContent = `${clickCount}/5`;
  bar.style.width = (clickCount / 5) * 100 + "%";

  if (clickCount === 5) {
    clickCount = 0;
    countText.textContent = `0/5`;
    bar.style.width = "0%";
    const clover = getClover();

    // Use parseInt to prevent string concat bugs:
    inventory[clover] = (parseInt(inventory[clover]) || 0) + 1;

    totalClovers++;
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('totalClovers', totalClovers);
    
    showCloverResult(clover);
    
    totalDisplay.textContent = totalClovers;
  }
}

function showCloverResult(clover) {
  result.textContent = "";
  result.classList.remove("legendary", "divine", "stellar");
  
  if (clover === "💎") {
    result.classList.add("legendary");
  } else if (clover === "☀️") {
    result.classList.add("divine");
  } else if (clover === "👑🔮") {
    result.classList.add("stellar");
  }

  void result.offsetWidth; // Trigger reflow for animation
  result.textContent = `${clover} ${cloverName(clover)}`;
  result.classList.add("fade-in");

  setTimeout(() => {
    result.classList.remove("fade-in");
  }, 1500);
}

function cloverName(emoji) {
  const map = {
    "🍀": "Common Clover",
    "🍃": "Uncommon Clover",
    "🌟": "Rare Clover",
    "✨": "Epic Clover",
    "💎": "Legendary Clover",
    "☀️": "Divine Clover",
    "👑🔮": "Stellar Clover"
  };
  return map[emoji] || "";
}

function getClover() {
  const rand = Math.random() * 100;
  if (rand < 0.007) return "👑🔮";       // Secret Stellar Clover 0.007%
  if (rand < 0.207) return "☀️";         // Divine 0.2%
  if (rand < 1.007) return "💎";         // Legendary 0.8%
  if (rand < 5.007) return "✨";          // Epic 4%
  if (rand < 15.007) return "🌟";         // Rare 10%
  if (rand < 40.007) return "🍃";         // Uncommon 25%
  return "🍀";                          // Common 60%
}

document.getElementById("tap-button").addEventListener("click", tap);
totalDisplay.textContent = totalClovers;
