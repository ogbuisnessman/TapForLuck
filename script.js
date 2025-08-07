let clickCount = 0;
let totalClovers = parseInt(localStorage.getItem('totalClovers')) || 0;
const bar = document.getElementById('bar');
const countText = document.getElementById('tap-count');
const result = document.getElementById('result');
const totalDisplay = document.getElementById('clover-total');

const inventory = JSON.parse(localStorage.getItem('inventory')) || {
  "🍀 Common Clover": 0, "🍃  Uncommon Clover": 0, "🌟 Rare Clover": 0, "✨ Epic Clover": 0, "💎 Legendary Clover": 0, "☀️ Divine Clover": 0, "👑🔮 Stellar Clover": 0
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
    inventory[clover] = (inventory[clover] || 0) + 1;
    totalClovers++;
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('totalClovers', totalClovers);
    result.textContent = clover;
    totalDisplay.textContent = totalClovers;
  }
}

function getClover() {
  const rand = Math.random() * 100;
  if (rand < 0.007) return "👑🔮 Stellar Clover";      // Secret Clover 0.007%
  if (rand < 0.207) return "☀️ Divine Clover";      // Divine 0.2%
  if (rand < 1.007) return "💎 Legendary Clover ";      // Legendary 0.8%
  if (rand < 5.007) return "✨ Epic Clover ";      // Epic 4%
  if (rand < 15.007) return "🌟 Rare Clover";     // Rare 10%
  if (rand < 40.007) return "🍃  Uncommon Clover";     // Uncommon 25%
  return "🍀 Common Clover";                        // Common 60%
}

document.getElementById("tap-button").addEventListener("click", tap);
totalDisplay.textContent = totalClovers;
