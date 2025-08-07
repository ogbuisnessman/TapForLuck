const clovers = [
  { name: "Common Clover", chance: 0.6 },
  { name: "Uncommon Clover", chance: 0.25 },
  { name: "Rare Clover", chance: 0.1 },
  { name: "Epic Clover", chance: 0.04 },
  { name: "Legendary Clover", chance: 0.009 },
  { name: "Divine Clover", chance: 0.001 }
];

let inventory = JSON.parse(localStorage.getItem("inventory")) || {};
let clicks = 0;

document.getElementById("tapBtn").addEventListener("click", () => {
  clicks++;
  updateProgress();

  if (clicks >= 5) {
    clicks = 0;
    updateProgress();
    let clover = getRandomClover();
    addToInventory(clover);
    showMessage(clover);
  }
});

function updateProgress() {
  document.getElementById("progress").style.width = `${(clicks / 5) * 100}%`;
}

function getRandomClover() {
  let rand = Math.random();
  let cumulative = 0;
  for (let c of clovers) {
    cumulative += c.chance;
    if (rand < cumulative) return c.name;
  }
  return clovers[0].name; // fallback
}

function addToInventory(cloverName) {
  inventory[cloverName] = (inventory[cloverName] || 0) + 1;
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function showMessage(clover) {
  const msg = document.getElementById("message");
  msg.className = "";

  if (clover === "Legendary Clover") msg.classList.add("legendary");
  if (clover === "Divine Clover") msg.classList.add("divine");

  msg.textContent = `You found a ${clover}!`;
}
