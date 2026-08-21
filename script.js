// ===============================
// Mouse Glow Effect
// ===============================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ===============================
// Scroll Reveal Animation
// ===============================

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===============================
// 3D Tilt Effect (Hover)
// ===============================

document.querySelectorAll(".project-card").forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = -(y - rect.height / 2) / 12;
    const ry = (x - rect.width / 2) / 12;

    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "rotateX(0deg) rotateY(0deg)";

  });

});

// ===============================
// Mouse Drag 3D Rotation
// ===============================

document.querySelectorAll(".model-card").forEach((card) => {

  const img = card.querySelector("img");

  let isDragging = false;
  let rotateX = 0;
  let rotateY = 0;

  card.addEventListener("mousedown", () => {
    isDragging = true;
    card.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    card.style.cursor = "grab";
  });

  card.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    rotateY += e.movementX * 0.8;
    rotateX -= e.movementY * 0.8;

    rotateX = Math.max(-35, Math.min(35, rotateX));

    img.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;

  });

  card.addEventListener("mouseleave", () => {

    isDragging = false;
    card.style.cursor = "grab";

    img.style.transition = "transform .6s ease";
    img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

    setTimeout(() => {
      img.style.transition = "transform .1s linear";
    }, 600);

  });

});

// ===============================
// Floating Glass Cards
// ===============================

document.querySelectorAll(".glass").forEach((card, index) => {

  card.animate([
    { transform: "translateY(0px)" },
    { transform: "translateY(-8px)" },
    { transform: "translateY(0px)" }
  ], {
    duration: 3000 + index * 300,
    iterations: Infinity,
    easing: "ease-in-out"
  });

});