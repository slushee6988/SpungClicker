let spungus = 0;

// separate costs
const upgradeCost1 = 50;
const upgradeCost2 = 150;

// bought flags
let upgrade1Bought = false;
let upgrade2Bought = false;

// total passive income per second
let passiveRate = 0;

const spungusImg = document.getElementById('spungus-img');
const clickCounter = document.getElementById('click-counter');
const upgradeButton = document.getElementById('upgrade-button');    // upgrade 1
const upgrade2Button = document.getElementById('upgrade-button2');  // upgrade 2
const spungusContainer = document.getElementById('spungus-container');

// update BOTH upgrades' visual state
function updateUpgradeStates() {
  // --- Upgrade 1 ---
  if (upgrade1Bought) {
    upgradeButton.classList.remove('locked', 'unlocked');
    upgradeButton.textContent = 'Purchased';
    upgradeButton.style.opacity = 0.5;
    upgradeButton.style.cursor = 'default';
  } else if (spungus >= upgradeCost1) {
    upgradeButton.classList.add('unlocked');
    upgradeButton.classList.remove('locked');
  } else {
    upgradeButton.classList.add('locked');
    upgradeButton.classList.remove('unlocked');
  }

  // --- Upgrade 2 ---
  if (upgrade2Bought) {
    upgrade2Button.classList.remove('locked', 'unlocked');
    upgrade2Button.textContent = 'Purchased';
    upgrade2Button.style.opacity = 0.5;
    upgrade2Button.style.cursor = 'default';
  } else if (spungus >= upgradeCost2) {
    upgrade2Button.classList.add('unlocked');
    upgrade2Button.classList.remove('locked');
  } else {
    upgrade2Button.classList.add('locked');
    upgrade2Button.classList.remove('unlocked');
  }
}

// create mini Spung particle
function createSping(event) {
  const rect = spungusContainer.getBoundingClientRect();

  const sping = document.createElement('div');
  sping.classList.add('sping');

  // spawn at click location
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  sping.style.left = x + 'px';
  sping.style.top = y + 'px';

  // random direction
  const angle = Math.random() * Math.PI * 2;
  const distance = 60 + Math.random() * 40;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  sping.style.setProperty('--dx', dx + 'px');
  sping.style.setProperty('--dy', dy + 'px');

  spungusContainer.appendChild(sping);

  // remove after animation
  sping.addEventListener('animationend', () => sping.remove());
}

// click adds 1 and launches mini spungs
spungusImg.addEventListener('click', (event) => {
  spungus += 1;
  clickCounter.textContent = spungus;
  updateUpgradeStates();
  createSping(event);
});

// buy upgrade 1  (+1 per second)
upgradeButton.addEventListener('click', () => {
  if (!upgrade1Bought && spungus >= upgradeCost1) {
    spungus -= upgradeCost1;
    upgrade1Bought = true;
    passiveRate += 1;  // add +1/sec
    clickCounter.textContent = spungus;
    updateUpgradeStates();
  }
});

// buy upgrade 2  (+5 per second)
upgrade2Button.addEventListener('click', () => {
  if (!upgrade2Bought && spungus >= upgradeCost2) {
    spungus -= upgradeCost2;
    upgrade2Bought = true;
    passiveRate += 5;  // add +5/sec (you can change this)
    clickCounter.textContent = spungus;
    updateUpgradeStates();
  }
});

// passive income
setInterval(() => {
  if (passiveRate > 0) {
    spungus += passiveRate;
    clickCounter.textContent = spungus;
    updateUpgradeStates();
  }
}, 1000);

// initial state
updateUpgradeStates();
