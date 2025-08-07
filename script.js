let clicks = 0;
let clovers = localStorage.getItem("clovers") ? parseInt(localStorage.getItem("clovers")) : 0;

const clickButton = document.getElementById("click-button");
const cloverCountDisplay = document.getElementById("clover-count");
const progressBar = document.getElementById("progress-bar");

clickButton.addEventListener("click", () => {
  clicks++;
  updateProgressBar();

  if (clicks >= 10) {
    clicks = 0;
    clovers++;
    localStorage.setItem("clovers", clovers);
    cloverCountDisplay.textContent = clovers;
    updateProgressBar();
  }
});

function updateProgressBar() {
  const percent = (clicks / 10) * 100;
  progressBar.style.width = percent + "%";
}

// Initialize clover count on page load
cloverCountDisplay.textContent = clovers;
