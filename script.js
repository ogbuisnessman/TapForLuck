let clicks = 0;
let clovers = localStorage.getItem("clovers") ? parseInt(localStorage.getItem("clovers")) : 0;

const clickButton = document.getElementById("click-button");
const cloverCountDisplay = document.getElementById("clover-count");
const progressBar = document.getElementById("progress-bar");

const tapsNeeded = 5;

clickButton.addEventListener("click", () => {
  clicks++;
  updateProgressBar();
  updateButtonText();

  if (clicks >= tapsNeeded) {
    clicks = 0;
    clovers++;
    localStorage.setItem("clovers", clovers);
    cloverCountDisplay.textContent = clovers;
    updateProgressBar();
    updateButtonText();
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

// Initialize on load
cloverCountDisplay.textContent = clovers;
updateButtonText();
updateProgressBar();
