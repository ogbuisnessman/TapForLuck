const cloverTypes = [
  { name: "Common Clover", emoji: "🍀" },
  { name: "Lucky Clover", emoji: "🌟🍀" },
  { name: "Golden Clover", emoji: "✨🍀" },
  { name: "Radiant Clover", emoji: "🌈🍀" },
  { name: "Mystic Clover", emoji: "🔮🍀" }
];

let inventory = [];

function generateClover() {
  const randomIndex = Math.floor(Math.random() * cloverTypes.length);
  const clover = cloverTypes[randomIndex];

  // Show the result
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = `You got a ${clover.name}! ${clover.emoji}`;

  // Add to inventory
  inventory.push(clover);
  updateInventory();
}

function updateInventory() {
  const inventoryList = document.getElementById("inventory");
  inventoryList.innerHTML = "";

  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} ${item.emoji}`;
    inventoryList.appendChild(li);
  });
}

document.getElementById("generateBtn").addEventListener("click", generateClover);

