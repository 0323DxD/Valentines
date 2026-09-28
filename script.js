const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const notification = document.getElementById("notification");
const question = document.getElementById("question");
const headerImage = document.getElementById("headerImage");
const bgMusic = document.getElementById("bgMusic");

const noTexts = [
  "No",
  "Are you sure?",
  "What if I asked really nicely?",
  "Pretty please",
  "With a chocolate rice cake on top",
  "What about a matcha frostie",
  "PLEASE POOKIE",
  "But :*(",
  "I am going to die",
  "Yep I'm dead",
  "ok ur talking to nathan's ghost",
  "please babe",
  ":(((",
  "PRETTY PLEASE",
  "No :(",
  "Crushie, don't ignore me",
  "BFF, you gotta help me out",
  "If you were my crush, you'd say yes",
  "Bestie, I'm begging you",
  "Crushie vibes activated",
  "BFF pact means you can't say no",
  "Pretty please uwu",
  "Bestie us ahh kaya sasamahan mo ako",
];

const floatElements = ["\u2764\ufe0f", "\ud83c\udf38", "\ud83c\udf39", "\ud83e\udd8b", "\ud83d\udc90", "\ud83e\udef0"];
const burstElements = ["\u2764\ufe0f", "\ud83d\udc96", "\ud83d\udc97", "\ud83d\udc98", "\u2728"];

let noClickCount = 0;
let yesScale = 1;

function playMusic() {
  if (!bgMusic || !bgMusic.paused) return;

  bgMusic.volume = 0.75;
  bgMusic.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function popHearts(originElement, amount = 9) {
  const rect = originElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let index = 0; index < amount; index++) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = burstElements[Math.floor(Math.random() * burstElements.length)];
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.setProperty("--x", `${randomBetween(-95, 95)}px`);
    heart.style.setProperty("--y", `${randomBetween(-125, -35)}px`);
    heart.style.animationDelay = `${index * 22}ms`;
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

function teaseNoButton() {
  noBtn.classList.remove("is-teasing");
  void noBtn.offsetWidth;
  noBtn.classList.add("is-teasing");
}

noBtn.addEventListener("click", () => {
  playMusic();
  noClickCount += 1;

  noBtn.textContent = noTexts[Math.min(noClickCount, noTexts.length - 1)];

  yesScale = Math.min(2.25, 1 + noClickCount * 0.11);
  yesBtn.style.setProperty("--btn-scale", yesScale.toFixed(2));

  teaseNoButton();
  popHearts(noBtn, 4);
});

yesBtn.addEventListener("click", () => {
  playMusic();

  question.textContent = "YAY! See you on the 14th! \ud83d\udc96";
  headerImage.innerHTML = '<span style="font-size: 100px;">\ud83d\udc3b\ud83e\udd70</span>';
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  notification.textContent = "";

  popHearts(yesBtn, 24);
  triggerConfetti();
  saveProposalResponse();
});

function createFloatingElement() {
  const container = document.getElementById("heart-container");
  const element = document.createElement("div");

  element.className = "floating-element";
  element.textContent = floatElements[Math.floor(Math.random() * floatElements.length)];
  element.style.setProperty("--left", `${randomBetween(-3, 100)}vw`);
  element.style.setProperty("--size", `${randomBetween(20, 43)}px`);
  element.style.setProperty("--drift", `${randomBetween(-95, 95)}px`);
  element.style.setProperty("--spin", `${randomBetween(-1.2, 1.2)}turn`);
  element.style.setProperty("--duration", `${randomBetween(10, 17)}s`);
  element.style.setProperty("--delay", `${randomBetween(0, 0.9)}s`);

  container.appendChild(element);
  element.addEventListener("animationend", () => element.remove(), { once: true });
}

function createFloatingElements() {
  for (let index = 0; index < 14; index++) {
    window.setTimeout(createFloatingElement, index * 135);
  }

  window.setInterval(createFloatingElement, 430);
}

function triggerConfetti() {
  if (typeof confetti !== "function") return;

  const duration = 8000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 28,
    spread: 360,
    ticks: 74,
    scalar: 0.92,
    zIndex: 100,
  };

  confetti({
    ...defaults,
    particleCount: 140,
    spread: 80,
    origin: { x: 0.5, y: 0.62 },
  });

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    const particleCount = Math.max(12, Math.floor(42 * (timeLeft / duration)));

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomBetween(0.08, 0.28), y: randomBetween(-0.12, 0.22) },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomBetween(0.72, 0.92), y: randomBetween(-0.12, 0.22) },
    });
  }, 280);
}

function saveProposalResponse() {
  console.log("Response recorded!");
}

createFloatingElements();
