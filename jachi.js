
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const nodeInfo = document.getElementById("nodeInfo");
const nodes = document.querySelectorAll(".network-node");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

nodes.forEach((node) => {
  node.addEventListener("click", () => {
    nodes.forEach((item) => item.classList.remove("selected"));
    node.classList.add("selected");

    const message = node.dataset.info || "Explore this technical focus area.";
    nodeInfo.innerHTML = "";

    const text = document.createElement("span");
    text.textContent = message;
    nodeInfo.appendChild(text);

    const arrow = document.createElement("span");
    arrow.textContent = " ↗";
    nodeInfo.appendChild(arrow);
  });
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Subtle pointer-responsive movement on larger screens.
const networkStage = document.getElementById("networkStage");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (networkStage && !reducedMotion.matches) {
  networkStage.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 900) return;

    const rect = networkStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    networkStage.style.setProperty("--pointer-x", `${x * 8}px`);
    networkStage.style.setProperty("--pointer-y", `${y * 8}px`);

    const visual = networkStage.querySelector(".orbit-one");
    if (visual) {
      visual.style.marginLeft = `${x * 5}px`;
      visual.style.marginTop = `${y * 5}px`;
    }
  });

  networkStage.addEventListener("pointerleave", () => {
    const visual = networkStage.querySelector(".orbit-one");
    if (visual) {
      visual.style.marginLeft = "0";
      visual.style.marginTop = "0";
    }
  });
}