

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ROLES = [
  "serverless ML platforms on AWS",
  "document AI with segmentation + OCR",
  "research papers, reimplemented in PyTorch",
  "reactive backends in Java & Spring",
  "RL environments for LLM agents",
];
const ROTATE_MS = 2800;

function startRotator() {
  const el = document.querySelector(".rot-word");
  if (!el || reducedMotion) return;
  let i = 0;
  setInterval(() => {
    el.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % ROLES.length;
      el.textContent = ROLES[i];
      el.classList.remove("out");
    }, 300);
  }, ROTATE_MS);
}

function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function startReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
}

startRotator();
startReveal();
